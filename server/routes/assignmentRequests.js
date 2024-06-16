const express = require('express');
const router = express.Router();
const assignmentRequestController = require('../controllers/assignmentRequestController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, assignmentRequestController.getAllRequests);
router.post('/', protect, assignmentRequestController.createRequest);
router.put('/:id', protect, assignmentRequestController.updateRequestStatus);
router.delete('/:id', protect, assignmentRequestController.deleteRequest);

module.exports = router;