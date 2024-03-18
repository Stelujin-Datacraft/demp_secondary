// countDataRoutes.js

const express = require('express');
const router = express.Router();
const bigqueryService = require('../services/bigqueryService');

// Initialize BigQuery client

// Endpoint to get count data
router.get('/get_count_data', async (req, res) => {
    try {
        // Construct the query to get count data
        const query = `
            SELECT
                SUM(total_votes) AS total_count,
                SUM(male_votes) AS male_count,
                SUM(female_votes) AS female_count,
                SUM(trans_votes) AS trans_count,
                SUM(SAFE_CAST(voters AS INT64)) AS total_voters_actuals,
                COALESCE(COUNT(CASE WHEN issues = 'YES' THEN 1 END), 0) AS issues,
                ROUND((SUM(total_votes) / SUM(SAFE_CAST(voters AS INT64)) * 100), 2) AS total_count_per,
                ROUND((SUM(male_votes) / SUM(SAFE_CAST(voters AS INT64)) * 100), 2) AS male_count_per,
                ROUND((SUM(female_votes) / SUM(SAFE_CAST(voters AS INT64)) * 100), 2) AS female_count_per,
                ROUND((SUM(trans_votes) / SUM(SAFE_CAST(voters AS INT64)) * 100), 2) AS trans_count_per
            FROM
                \`modified-glyph-416314.demp_dev_master.demp_core\``;

        // Execute the query
        const [rows] = await bigqueryService.executeQuery(query);
        console.log(rows)
        // Return the result
        if (rows != null) {
            const result = rows[0];
            res.status(200).json({ status: 'success', data: rows });
        } else {
            res.status(404).json({ status: 'failed', message: 'No data found' });
        }
    } catch (error) {
        console.error('Error fetching count data:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});



router.get('/location', async (req, res) => {
    try {
        // Get parameters from request query
        const { sector, slno } = req.query;

        // Construct the query
        const query = `
            SELECT
                part_lat_long,
                part_lat,
                part_long,
                sector,
                part_name
            FROM
                \`modified-glyph-416314.demp_dev_master.demp_location\`
            WHERE
                sector = ${sector} AND
                slno = ${slno}`;

        // Execute the query
        const rows = await bigqueryService.executeQuery(query);

        // Return the result
        res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
        console.error('Error fetching location details:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});
module.exports = router;
