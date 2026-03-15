const path = require('path');
const fs = require('fs');
const medicalRecordsStorage = require('../storage/medicalRecordsStorage');
const { extractMedicalRecord } = require('../services/groqService');

// ─── POST /api/medical-records/extract ───────────────────────────────────────
// Receives a PDF or image via multipart/form-data (field: "file"),
// sends it to Groq vision, and returns extracted form fields.
// The file is NOT saved here — saving happens on the normal POST / create.
exports.extract = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded. Send a PNG, JPG or PDF.' });
        }

        const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
        if (!allowed.includes(req.file.mimetype)) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Only PNG, JPG and PDF files are accepted.' });
        }

        // Read the temp file as base64
        const fileBuffer = fs.readFileSync(req.file.path);
        const fileBase64 = fileBuffer.toString('base64');

        // Clean up the temp file immediately — we only needed it for extraction
        fs.unlinkSync(req.file.path);

        const extracted = await extractMedicalRecord(fileBase64, req.file.mimetype);

        res.json({
            success: true,
            fields: extracted
        });
    } catch (err) {
        // Clean up temp file if it exists and something went wrong
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const records = await medicalRecordsStorage.getAll();
        res.json(records);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const record = await medicalRecordsStorage.getById(req.params.id);
        if (!record) return res.status(404).json({ error: 'Registro médico no encontrado' });
        res.json(record);
    } catch (err) {
        next(err);
    }
};

exports.getByPet = async (req, res, next) => {
    try {
        const records = await medicalRecordsStorage.getByPet(req.params.pet_id);
        res.json(records);
    } catch (err) {
        next(err);
    }
};

exports.getByUser = async (req, res, next) => {
    try {
        const records = await medicalRecordsStorage.getByUser(req.params.user_id);
        res.json(records);
    } catch (err) {
        next(err);
    }
};

// ─── POST /api/medical-records ───────────────────────────────────────────────
// Creates a medical record. Optionally accepts a file via multipart/form-data.
// When a file is present, it is moved to uploads/medical-records/ and its
// metadata is stored in the record.
exports.create = async (req, res, next) => {
    try {
        const { pet_id, user_id, visit_type } = req.body;

        if (!pet_id || !user_id || !visit_type) {
            if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'pet_id, user_id and visit_type are required' });
        }

        let fileData = {};

        if (req.file) {
            // Move from temp to permanent uploads folder
            const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'medical-records');
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

            const filename = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
            const destPath = path.join(uploadDir, filename);
            fs.renameSync(req.file.path, destPath);

            fileData = {
                file_url: `/uploads/medical-records/${filename}`,
                file_original_name: req.file.originalname,
                file_mime_type: req.file.mimetype,
                file_size_bytes: req.file.size
            };
        }

        const record = await medicalRecordsStorage.create({ ...req.body, ...fileData });
        res.status(201).json(record);
    } catch (err) {
        if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const record = await medicalRecordsStorage.update(req.params.id, req.body);
        res.json(record);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await medicalRecordsStorage.remove(req.params.id);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};