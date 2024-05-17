const AssignmentRequest = require('../models/AssignmentRequest');
const Material = require('../models/Material');
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
        const request = new AssignmentRequest(req.body);
        try {
            const newRequest = await request.save();
            res.status(201).json(newRequest);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateRequestStatus: async (req, res) => {
        try {
            const updatedRequest = await AssignmentRequest.findByIdAndUpdate(req.params.id, { statut: req.body.statut }, { new: true });
            if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
            res.json(updatedRequest);
        } catch (error) {
            res.status(400).json({ message: error.message });
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
    }
};

module.exports = assignmentRequestController;