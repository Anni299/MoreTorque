const Vehicle = require('../models/vehicle');
const { decodeVin } = require('../services/vinService');
const vehicles = []; // In-memory storage for vehicles

const decodeVinEndpoint = async (req, res) => {
    const { vin } = req.params;
    if (!/^[a-zA-Z0-9]{17}$/.test(vin)) {
        return res.status(400).json({ error: 'Invalid VIN format' });
    }

    try {
        const vehicleData = await decodeVin(vin);
        res.json(vehicleData);
    } catch (error) {
        res.status(500).json({ error: 'Error decoding VIN' });
    }
};

const addVehicle = async (req, res) => {
    const { vin, org } = req.body;

    if (!/^[a-zA-Z0-9]{17}$/.test(vin)) {
        return res.status(400).json({ error: 'Invalid VIN format' });
    }

    if (!org) {
        return res.status(400).json({ error: 'Org is required' });
    }

    try {
        const vehicleData = await decodeVin(vin);
        const newVehicle = new Vehicle(vin, vehicleData.manufacturer, vehicleData.model, vehicleData.year, org);
        vehicles.push(newVehicle);
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ error: 'Error adding vehicle' });
    }
};

const getVehicle = (req, res) => {
    const { vin } = req.params;
    if (!/^[a-zA-Z0-9]{17}$/.test(vin)) {
        return res.status(400).json({ error: 'Invalid VIN format' });
    }

    const vehicle = vehicles.find(v => v.vin === vin);
    if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json(vehicle);
};

module.exports = {
    decodeVinEndpoint,
    addVehicle,
    getVehicle
};
