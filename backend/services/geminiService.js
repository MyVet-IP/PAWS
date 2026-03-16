// Reads a clinical history file (PDF or image) and extracts structured
// medical record data to pre-fill the frontend form.
// Uses Gemini 2.5 Flash — native PDF support, no workarounds needed.

const { GoogleGenerativeAI } = require('@google/generative-ai');

function getClient() {
    if (!process.env.GEMINI_API_KEY) return null;
    return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// ─── Valid values — must match the DB CHECK constraint ───────────────────────
const VALID_VISIT_TYPES = [
    'Checkup', 'Vaccination', 'Surgery', 'Deworming',
    'Dental', 'Emergency', 'Follow-up', 'Grooming', 'Other'
];

// ─── Main extraction function ─────────────────────────────────────────────────
//
//  fileBase64 : base64-encoded string of the file
//  mimeType   : 'image/png' | 'image/jpeg' | 'application/pdf'
//
//  Returns an object with the fields that match the medical_records table.
//  Any field the document doesn't contain is returned as null.

async function extractMedicalRecord(fileBase64, mimeType) {
    const client = getClient();
    if (!client) throw new Error('GEMINI_API_KEY is not configured');

    const model = client.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const extractionPrompt = `You are a veterinary medical records assistant.
Analyze the attached clinical history document and extract the following fields.
Return ONLY a valid JSON object — no explanation, no markdown, no extra text.

Fields to extract:
- visit_type     : one of [${VALID_VISIT_TYPES.join(', ')}] — pick the closest match
- visit_date     : ISO date string YYYY-MM-DD, or null if not found
- veterinarian   : full name of the veterinarian, or null
- reason         : reason for the visit, brief phrase, or null
- diagnosis      : diagnosis text, or null
- treatment      : treatment or medications prescribed, or null
- notes          : any additional relevant notes, or null
- next_visit_date: ISO date string YYYY-MM-DD for the next scheduled visit, or null

JSON structure (use exactly these keys):
{
  "visit_type": "...",
  "visit_date": "...",
  "veterinarian": "...",
  "reason": "...",
  "diagnosis": "...",
  "treatment": "...",
  "notes": "...",
  "next_visit_date": "..."
}`;

    // Gemini accepts both PDFs and images the same way — inline_data with base64.
    // No workarounds needed: PDFs are read as documents, images as images.
    const result = await model.generateContent([
        extractionPrompt,
        {
            inlineData: {
                mimeType,
                data: fileBase64
            }
        }
    ]);

    const raw = result.response.text().trim();

    // Strip markdown fences if the model wraps the JSON
    const cleaned = raw
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

    const parsed = JSON.parse(cleaned);

    // Validate visit_type against allowed values — fall back to 'Other'
    if (!VALID_VISIT_TYPES.includes(parsed.visit_type)) {
        parsed.visit_type = 'Other';
    }

    // Sanitize dates — if they don't look like YYYY-MM-DD, null them
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (parsed.visit_date && !dateRegex.test(parsed.visit_date)) parsed.visit_date = null;
    if (parsed.next_visit_date && !dateRegex.test(parsed.next_visit_date)) parsed.next_visit_date = null;

    return parsed;
}

module.exports = { extractMedicalRecord };