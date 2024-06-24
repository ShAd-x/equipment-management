const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/unassigned', protect, materialController.getUnassignedMaterials);
router.get('/assigned', protect, materialController.getAssignedMaterials);

router.put('/return/:id', protect, materialController.returnMaterial);
router.put('/update-room/:id', protect, materialController.updateMaterialRoom);

router.route('/')
    .get(protect, admin, materialController.getAllMaterials)
    .post(protect, admin, materialController.createMaterial);

router.route('/:id')
    .get(protect, admin, materialController.getMaterialById)
    .put(protect, admin, materialController.updateMaterial)
    .delete(protect, admin, materialController.deleteMaterial);

module.exports = router;
