const express = require('express');
const router = express.Router();
const assignmentRequestController = require('../controllers/assignmentRequestController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/pending', protect, admin, assignmentRequestController.getPendingRequests);

router.route('/')
    .get(protect, admin, assignmentRequestController.getAllRequests)
    .post(protect, assignmentRequestController.createRequest);

router.route('/:id')
    .delete(protect, admin, assignmentRequestController.deleteRequest);

router.put('/:id/approve', protect, admin, assignmentRequestController.approveRequest);
router.put('/:id/deny', protect, admin, assignmentRequestController.denyRequest);

module.exports = router;
