const sheltersStorage = require('../storage/sheltersStorage');

exports.getAll = async (req, res, next) => {
    try {
        const shelters = await sheltersStorage.getAll();
        res.json(shelters);
    } catch (err) { next(err); }
};

exports.getPets = async (req, res, next) => {
    try {
        const pets = await sheltersStorage.getPets(req.params.id);
        res.json(pets);
    } catch (err) { next(err); }
};

exports.createAdoption = async (req, res, next) => {
    try {
        const { shelter_id, shelter_pet_id, user_id, pet_id, notes } = req.body;
        if (!shelter_id || !shelter_pet_id || !user_id || !pet_id)
            return res.status(400).json({ error: 'shelter_id, shelter_pet_id, user_id y pet_id son requeridos' });
        const adoption = await sheltersStorage.createAdoption({ shelter_id, shelter_pet_id, user_id, pet_id, notes });
        res.status(201).json(adoption);
    } catch (err) { next(err); }
};