const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', materialController.getAllMaterials);
router.get('/:id', materialController.getMaterialById);
router.post('/', protect, materialController.createMaterial);
router.put('/:id', protect, materialController.updateMaterial);
router.delete('/:id', protect, materialController.deleteMaterial);

module.exports = router;