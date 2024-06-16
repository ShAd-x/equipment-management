const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, userController.getAllUsers);
router.post('/', protect, userController.createUser);

module.exports = router;
