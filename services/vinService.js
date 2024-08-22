const axios = require('axios'); // for making requests to external API
const NodeCache = require('node-cache');
const vinCache = new NodeCache({ stdTTL: 600 }); // cache VINs for 10 minutes

const decodeVin = async (vin) => {
    // if vin already in cache, return directly without making an extra call
    const cachedData = vinCache.get(vin);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`;
    try {
        const response = await axios.get(url);
        // const Results = response.data.Results;
        const { Results } = response.data;

        const manufacturer = Results.find(item => item.Variable === 'Manufacturer Name').Value;
        const model = Results.find(item => item.Variable === 'Model').Value;
        const year = Results.find(item => item.Variable === 'Model Year').Value;

        const vehicleData = { vin, manufacturer, model, year };
        vinCache.set(vin, vehicleData); // cache the result
        return vehicleData;
    } catch (error) {
        console.error('Error decoding VIN:', error.message);
        throw new Error('Could not decode VIN');
    }
};

// Exporting the function
module.exports = {
    decodeVin
};