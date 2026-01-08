const express = require('express');
const router = express.Router();
const vehicleLogController = require('../controllers/vehicleLogController');
const protect = require('../middlewares/authMiddleware');

router.get('/', protect, vehicleLogController.getVehicleLogs);
router.post('/', protect, vehicleLogController.createVehicleLog);
router.put('/:id', protect, vehicleLogController.updateVehicleLog);
router.delete('/:id', protect, vehicleLogController.deleteVehicleLog);

module.exports = router;
