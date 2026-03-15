// services/groqService.js
// Reads a clinical history file (PDF or image) and extracts structured
// medical record data to pre-fill the frontend form.

const Groq = require('groq-sdk');

function getClient() {
    if (!process.env.GROQ_API_KEY) return null;
    return new Groq({ apiKey: process.env.GROQ_API_KEY });
}

// Valid values that map to the DB CHECK constraint 
const VALID_VISIT_TYPES = [
    'Checkup', 'Vaccination', 'Surgery', 'Deworming',
    'Dental', 'Emergency', 'Follow-up', 'Grooming', 'Other'
];

// Main extraction function 
//
//  fileBase64 : base64-encoded string of the file
//  mimeType   : 'image/png' | 'image/jpeg' | 'application/pdf'
//
//  Returns an object with the fields that match the medical_records table.
//  Any field the document doesn't contain is returned as null.

async function extractMedicalRecord(fileBase64, mimeType) {
    const client = getClient();
    if (!client) throw new Error('GROQ_API_KEY is not configured');

    // Groq vision models only support image types directly.
    // PDFs must be sent as base64 data URI inside the prompt.
    const isPdf = mimeType === 'application/pdf';

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

    let completion;

    if (isPdf) {
        // For PDFs: embed the base64 as a data URI in the text prompt.
        // Groq's llama-3.2 vision models can process data URIs in text.
        completion = await client.chat.completions.create({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `${extractionPrompt}\n\nDocument (base64 PDF):\ndata:application/pdf;base64,${fileBase64}`
                        }
                    ]
                }
            ],
            temperature: 0.1,
            max_tokens: 600
        });
    } else {
        // For images: use the vision content format
        completion = await client.chat.completions.create({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image_url',
                            image_url: {
                                url: `data:${mimeType};base64,${fileBase64}`
                            }
                        },
                        {
                            type: 'text',
                            text: extractionPrompt
                        }
                    ]
                }
            ],
            temperature: 0.1,
            max_tokens: 600
        });
    }

    const raw = completion.choices[0]?.message?.content?.trim() || '';

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