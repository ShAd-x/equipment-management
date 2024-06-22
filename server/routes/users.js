const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, userController.getAllUsers);
router.post('/', protect, userController.createUser);
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);

module.exports = router;
