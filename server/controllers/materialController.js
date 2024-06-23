const Material = require('../models/Material');
const Roles = require('../models/Role');
const User = require('../models/User');

const materialController = {
    getAllMaterials: async (_req, res) => {
        try {
            const materials = await Material.find().populate('utilisePar', 'name');
            res.json(materials);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getMaterialById: async (req, res) => {
        try {
            const material = await Material.findById(req.params.id);
            if (!material) return res.status(404).json({ message: 'Material not found' });
            res.json(material);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createMaterial: async (req, res) => {
        const { intitule, type, salle, organisation } = req.body;
        const material = new Material({ intitule, type, salle, organisation });
        try {
            const newMaterial = await material.save();
            res.status(201).json(newMaterial);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateMaterial: async (req, res) => {
        try {
            const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedMaterial) return res.status(404).json({ message: 'Material not found' });
            res.json(updatedMaterial);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteMaterial: async (req, res) => {
        try {
            const deletedMaterial = await Material.findByIdAndDelete(req.params.id);
            if (!deletedMaterial) return res.status(404).json({ message: 'Material not found' });
            res.json({ message: 'Material deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUnassignedMaterials: async (req, res) => {
        try {
            const userId = req.user._id;
            const user = await User.findById(userId);

            var materials;
            if (user.role === Roles.ADMIN || user.role === Roles.ORGANISATION) {
                materials = await Material.find({ utilisePar: { $exists: false } });
            } else {
                materials = await Material.find({ utilisePar: { $exists: false }, organisation: false });
            }
            res.json(materials);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = materialController;
