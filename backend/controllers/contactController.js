// controllers/contactController.js
const { sendContactNotification } = require('../services/emailService');

const VALID_TOPICS = ['General Question', 'Clinic Support', 'Bug Report', 'Partnership', 'Other'];

exports.sendMessage = async (req, res, next) => {
    try {
        const { name, email, topic, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'name, email and message are required' });
        }
        if (!email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const safeTopic = VALID_TOPICS.includes(topic) ? topic : 'General Question';

        await sendContactNotification({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            topic: safeTopic,
            message: message.trim()
        });

        res.json({ success: true, message: 'Message sent successfully' });

    } catch (err) {
        // Don't expose internal errors to the client
        console.error('Contact email error:', err.message);
        if (err.message.includes('not configured')) {
            return res.status(503).json({ error: 'Email service temporarily unavailable' });
        }
        next(err);
    }
};