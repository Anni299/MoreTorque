const express = require('express');
const vehicleRoutes = require('./routes/vehicleRoutes');
const orgRoutes = require('./routes/orgRoutes');

const app = express(); // instance of the object
app.use(express.json()); // to parse JSON request bodies (data from the clients)

// register routes
app.use('/vehicles', vehicleRoutes);
app.use('/orgs', orgRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






// Example vin: 1234567890AVSFACF