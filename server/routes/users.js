const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const verifyAdmin = require('../middleware/adminMiddleware');

router.get('/', verifyAdmin, userController.getAllUsers);
router.post('/', verifyAdmin, userController.createUser);

module.exports = router;
