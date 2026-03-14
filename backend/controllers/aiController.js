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

// ─── Endpoints (vacíos por ahora) ─────────────────────────────────────────────
exports.recommendClinic = async (req, res, next) => {
  try {
    res.json({ mensaje: 'proximamente' });
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