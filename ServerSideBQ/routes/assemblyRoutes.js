const express = require('express');
const assemblyController = require('../controllers/assemblyController');

const bigqueryService = require('../services/bigqueryService');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    try {
        const assemblyData = await assemblyController.getAssemblyDashboard();
        res.json({ status: 'success', data: assemblyData });
    } catch (error) {
        console.error('Error fetching assembly dashboard data:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch assembly dashboard data' });
    }
});

router.get('/get_location_data', async (req, res) => {
    try {
        const query = `
            SELECT PART_NAME, PART_NUMBER, PART_NAME_L1, PART_LAT, PART_LAT_LONG, PART_CATEGORY, PART_NAME_L2
            FROM \`modified-glyph-416314.demp_dev_master.demp_location\`
        `;
        const locationData = await bigqueryService.executeQuery(query);
        res.json({ status: 'success', data: locationData });
    } catch (error) {
        console.error('Error fetching location data:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch location data' });
    }
});


module.exports = router;
