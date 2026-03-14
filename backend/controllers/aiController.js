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
    const { sintomas, especie } = req.body;
    if (!sintomas || !especie) {
      return res.status(400).json({ error: 'Se requieren los campos: sintomas, especie' });
    }

    const clinicas = await businessesStorage.getAll({ type: 'clinic' });

    const client = getClient();
    if (!client) {
      return res.status(500).json({ error: 'GEMINI_API_KEY no configurada' });
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

    const prompt = `Eres un asistente veterinario experto en Medellín, Colombia.

Un dueño de mascota describe esta situación:
- Especie: ${especie}
- Síntomas: ${sintomas}

Clínicas veterinarias disponibles (en JSON):
${JSON.stringify(clinicasResumen, null, 2)}

Analiza los síntomas y selecciona las 3 clínicas MÁS ADECUADAS considerando:
1. Que sus especialidades coincidan con los síntomas descritos
2. Disponibilidad 24h si la urgencia lo requiere
3. Calificación (rating)

Responde ÚNICAMENTE con JSON válido, sin texto adicional, con esta estructura exacta:
{
  "recomendadas": [
    { "business_id": <número>, "razon": "<explicación breve>" }
  ]
}`;

    const model    = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result   = await model.generateContent(prompt);
    const rawText  = result.response.text().trim()
      .replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();

    const parsed = JSON.parse(rawText);

    const clinicasMap  = new Map(clinicas.map(c => [c.business_id, c]));
    const recomendadas = (parsed.recomendadas || []).map(r => {
      const c = clinicasMap.get(r.business_id) || {};
      return {
        business_id: r.business_id,
        name:        c.name     || 'N/A',
        address:     c.address  || 'N/A',
        zone:        c.zone     || 'N/A',
        whatsapp:    c.whatsapp || null,
        razon:       r.razon
      };
    });

    res.json({
      recomendadas,
      advertencia: 'Esta sugerencia no reemplaza al veterinario'
    });

  } catch (err) {
    next(err);
  }
};

exports.petSymptomTriage = async (req, res, next) => {
  try {
    res.json({ mensaje: 'proximamente' });
  } catch (err) {
    next(err);
  }
};

exports.careTips = async (req, res, next) => {
  try {
    res.json({ mensaje: 'proximamente' });
  } catch (err) {
    next(err);
  }
};