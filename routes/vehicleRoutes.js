const express = require('express');
const { decodeVinEndpoint, addVehicle, getVehicle } = require('../controllers/vehicleController');
const router = express.Router(); // instance of the class

router.get('/decode/:vin', decodeVinEndpoint);
router.post('/', addVehicle);
router.get('/:vin', getVehicle);

module.exports = router;