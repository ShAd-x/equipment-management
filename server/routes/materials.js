const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const verifyAdmin = require('../middleware/adminMiddleware');

router.get('/', materialController.getAllMaterials);
router.get('/:id', materialController.getMaterialById);
router.post('/', verifyAdmin, materialController.createMaterial);
router.put('/:id', verifyAdmin, materialController.updateMaterial);
router.delete('/:id', verifyAdmin, materialController.deleteMaterial);

module.exports = router;