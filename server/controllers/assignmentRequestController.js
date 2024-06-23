const AssignmentRequest = require('../models/AssignmentRequest');
const Material = require('../models/Material');
const Roles = require('../models/Role');
const User = require('../models/User');

const assignmentRequestController = {
    getAllRequests: async (_req, res) => {
        try {
            const requests = await AssignmentRequest.find().populate('material user');
            res.json(requests);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createRequest: async (req, res) => {
        const { materialId } = req.body;
        const userId = req.user._id;

        try {
            const material = await Material.findById(materialId);
            if (!material) {
                return res.status(404).json({ message: 'Material not found' });
            }

            if (material.organisation) {
                const user = await User.findById(userId);
                if (user.role !== Roles.ADMIN && user.role !== Roles.ORGANISATION) {
                    return res.status(403).json({ message: 'Only organizations or admins can request this material' });
                }
            }

            const request = new AssignmentRequest({ material: materialId, user: userId });
            const newRequest = await request.save();
            res.status(201).json(newRequest);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    approveRequest: async (req, res) => {
        const requestId = req.params.id;

        try {
            const request = await AssignmentRequest.findById(requestId).populate('material user');
            if (!request) {
                return res.status(404).json({ message: 'Request not found' });
            }

            const material = await Material.findById(request.material._id);
            material.utilisePar = request.user._id;
            await material.save();

            request.status = 'approuve';
            await request.save();

            // Supprimer les autres demandes pour le même matériel
            await AssignmentRequest.deleteMany({ material: material._id, status: 'en attente' });

            res.json({ message: 'Request approved and material updated' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    denyRequest: async (req, res) => {
        const requestId = req.params.id;

        try {
            const request = await AssignmentRequest.findById(requestId);
            if (!request) {
                return res.status(404).json({ message: 'Request not found' });
            }

            request.status = 'refuse';
            await request.save();

            res.json({ message: 'Request denied and deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteRequest: async (req, res) => {
        try {
            const deletedRequest = await AssignmentRequest.findByIdAndDelete(req.params.id);
            if (!deletedRequest) return res.status(404).json({ message: 'Request not found' });
            res.json({ message: 'Request deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getPendingRequests: async (_req, res) => {
        try {
            const requests = await AssignmentRequest.find({ status: 'en attente' }).populate('material user');
            res.json(requests);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = assignmentRequestController;
