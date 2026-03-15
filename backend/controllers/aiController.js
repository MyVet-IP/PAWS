const { GoogleGenerativeAI } = require('@google/generative-ai');
const businessesStorage = require('../storage/businessesStorage');

// ─── Cliente Gemini ───────────────────────────────────────────────────────────
function getClient() {
  if (!process.env.GEMINI_API_KEY) return null;
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// ─── Caché en memoria para care-tips ─────────────────────────────────────────
const tipsCache = new Map();
const CACHE_TTL = 86400000; // 24 horas en ms

function getCached(key) {
  const entry = tipsCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    tipsCache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  tipsCache.set(key, { data, timestamp: Date.now() });
}

// ─── Endpoints ─────────────────────────────────────────────
exports.recommendClinic = async (req, res, next) => {
  try {
    const { symptoms, species } = req.body;
    if (!symptoms || !species) {
      return res.status(400).json({ error: 'Fields required: symptoms, species' });
    }

    const clinicas = await businessesStorage.getAll({ type: 'clinic' });

    const client = getClient();
    if (!client) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    const clinicasResumen = clinicas.map(c => ({
      business_id: c.business_id,
      name:        c.name,
      address:     c.address,
      zone:        c.zone,
      whatsapp:    c.whatsapp,
      is_24h:      c.is_24h,
      rating:      c.rating,
      specialties: (c.specialties || []).map(s => s.name)
    }));

    const prompt = `You are an expert veterinary assistant in Medellin, Colombia.

A pet owner describes this situation:
- Species: ${species}
- Symptoms: ${symptoms}

Available veterinary clinics (JSON):
${JSON.stringify(clinicasResumen, null, 2)}

Analyze the symptoms and select the 3 MOST SUITABLE clinics considering:
1. Their specialties match the described symptoms
2. 24h availability if urgency requires it
3. Rating

Respond ONLY with valid JSON, no additional text, with this exact structure:
{
  "recommended": [
    { "business_id": <number>, "reason": "<brief explanation of why this clinic>" }
  ]
}`;

    const model   = client.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result  = await model.generateContent(prompt);
    const rawText = result.response.text().trim()
      .replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();

    const parsed = JSON.parse(rawText);

    const clinicasMap   = new Map(clinicas.map(c => [c.business_id, c]));
    const recommended   = (parsed.recommended || []).map(r => {
      const c = clinicasMap.get(r.business_id) || {};
      return {
        business_id: r.business_id,
        name:        c.name     || 'N/A',
        address:     c.address  || 'N/A',
        zone:        c.zone     || 'N/A',
        whatsapp:    c.whatsapp || null,
        reason:      r.reason
      };
    });

    res.json({
      recommended,
      warning: 'This suggestion does not replace a veterinarian'
    });

  } catch (err) {
    next(err);
  }
};

exports.petSymptomTriage = async (req, res, next) => {
  try {
    const { symptoms, species } = req.body;
    if (!symptoms || !species) {
      return res.status(400).json({ error: 'Fields required: symptoms, species' });
    }

    const client = getClient();
    if (!client) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    const prompt = `You are an expert veterinarian in animal emergency triage.

A pet owner describes this situation:
- Species: ${species}
- Symptoms: ${symptoms}

Classify the urgency according to these STRICT rules:
- HIGH   → imminent risk of life (breathing difficulty, seizures, trauma, heavy bleeding, very high fever, unconsciousness)
- MEDIUM → requires veterinary attention within the next 24-48 hours
- LOW    → monitor at home, routine visit if symptoms persist

Respond ONLY with valid JSON, no additional text, with this exact structure:
{
  "urgency": "HIGH" | "MEDIUM" | "LOW",
  "explanation": "<brief clinical reasoning>",
  "recommended_action": "<what the owner should do right now>"
}`;

    const model   = client.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result  = await model.generateContent(prompt);
    const rawText = result.response.text().trim()
      .replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();

    const parsed = JSON.parse(rawText);

    res.json({
      urgency:            parsed.urgency,
      explanation:        parsed.explanation,
      recommended_action: parsed.recommended_action,
      disclaimer:         'This classification is indicative and does not replace a veterinarian'
    });

  } catch (err) {
    next(err);
  }
};

exports.careTips = async (req, res, next) => {
  try {
    const { species, breed, age_years, topic } = req.body;
    if (!species || !topic) {
      return res.status(400).json({ error: 'Fields required: species, topic' });
    }

    // 1. Check cache
    const cacheKey = `${species}-${breed || 'no-breed'}-${topic}`;
    const cached   = getCached(cacheKey);
    if (cached) {
      return res.json({ ...cached, from_cache: true });
    }

    const client = getClient();
    if (!client) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    // 2. Call Gemini
    const ageText   = age_years != null ? `${age_years} year(s)` : 'unknown age';
    const breedText = breed || 'unspecified breed';

    const prompt = `You are an expert veterinarian in animal welfare and care.

Generate practical care tips for:
- Species: ${species}
- Breed:   ${breedText}
- Age:     ${ageText}
- Topic:   ${topic}

Provide exactly 5 concrete, useful and specific tips for this pet.

Respond ONLY with valid JSON, no additional text, with this exact structure:
{
  "tips": ["tip 1", "tip 2", "tip 3", "tip 4", "tip 5"]
}`;

    const model   = client.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result  = await model.generateContent(prompt);
    const rawText = result.response.text().trim()
      .replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();

    const parsed = JSON.parse(rawText);

    const responseData = {
      tips:   parsed.tips,
      source: 'AI generated — always consult your veterinarian'
    };

    // 3. Save to cache
    setCache(cacheKey, responseData);

    res.json({ ...responseData, from_cache: false });

  } catch (err) {
    next(err);
  }
};