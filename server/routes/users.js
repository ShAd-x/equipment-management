const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, userController.getAllUsers);
router.post('/', protect, userController.createUser);
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.route('/:id').delete(protect, admin, userController.deleteUser);

module.exports = router;
