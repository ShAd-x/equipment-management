const express = require('express');
const router = express.Router();
const assignmentRequestController = require('../controllers/assignmentRequestController');
const verifyAdmin = require('../middleware/adminMiddleware');

router.get('/', verifyAdmin, assignmentRequestController.getAllRequests);
router.post('/', assignmentRequestController.createRequest);
router.put('/:id', verifyAdmin, assignmentRequestController.updateRequestStatus);
router.delete('/:id', verifyAdmin, assignmentRequestController.deleteRequest);

module.exports = router;