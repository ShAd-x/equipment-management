const express = require('express');
const router = express.Router();
const assignmentRequestController = require('../controllers/assignmentRequestController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, assignmentRequestController.getAllRequests)
    .post(protect, assignmentRequestController.createRequest);

router.route('/:id')
    .put(protect, admin, assignmentRequestController.updateRequestStatus)
    .delete(protect, admin, assignmentRequestController.deleteRequest);

module.exports = router;
