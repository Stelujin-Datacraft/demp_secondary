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




router.get('/get_assembly_data', async (req, res) => {
    try {
        // Get the assembly parameter from the request query
        const assembly = req.query.assembly;

        // Construct the base query to get assembly data
        let baseQuery = `
            SELECT
                sector,
                SUM(total_votes) AS total_votes,
                SUM(male_votes) AS male_votes,
                SUM(female_votes) AS female_votes,
                SUM(trans_votes) AS transgender_votes,
                SUM(SAFE_CAST(voters AS INT64)) AS total_voters_actuals,
                COALESCE(COUNT(CASE WHEN issues = 'yes' THEN 1 END), 0) AS issues,
                ROUND((SUM(total_votes) / SUM(SAFE_CAST(voters AS INT64)) * 100), 2) AS poll_total_per,
                ROUND((SUM(male_votes) / SUM(SAFE_CAST(voters AS INT64)) * 100), 2) AS poll_male_per,
                ROUND((SUM(female_votes) / SUM(SAFE_CAST(voters AS INT64)) * 100), 2) AS poll_female_per,
                ROUND((SUM(trans_votes) / SUM(SAFE_CAST(voters AS INT64)) * 100), 2) AS poll_transgender_per
            FROM
                \`modified-glyph-416314.demp_dev_master.demp_core\`
            WHERE
                SAFE_CAST(voters AS INT64) IS NOT NULL`;

        // If assembly parameter is provided and not 'all', add condition for specific sector
        if (assembly && assembly !== 'all') {
            baseQuery += ` AND sector = '${assembly}'`;
        }

        // Add GROUP BY clause to the query
        baseQuery += ' GROUP BY sector';
        console.log(baseQuery)
        // Execute the query
        const rows = await bigqueryService.executeQuery(baseQuery);
        console.log(rows)
        // Return the result
        res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
        console.error('Error fetching assembly data:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});



module.exports = router;
