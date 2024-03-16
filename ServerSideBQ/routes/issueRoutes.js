const express = require('express');
const issueController = require('../controllers/issueController');
const bigqueryService = require('../services/bigqueryService');

const router = express.Router();

router.get('/details', async (req, res) => {
    try {
        const issuesDetail = await issueController.getIssuesDetail();
        res.json({ status: 'success', data: issuesDetail });
    } catch (error) {
        console.error('Error fetching issues detail:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch issues detail' });
    }
});

router.get('/detail', async (req, res) => {
    try {
        const issueDetail = await issueController.getIssueDetail();
        res.json({ status: 'success', data: issueDetail });
    } catch (error) {
        console.error('Error fetching issue detail:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch issue detail' });
    }
});

router.post('/form', async (req, res) => {
    try {
        await issueController.postIssueForm(req.body);
        res.json({ status: 'success', message: 'Issue form data inserted successfully' });
    } catch (error) {
        console.error('Error inserting issue form data:', error);
        res.status(500).json({ status: 'error', message: 'Failed to insert issue form data' });
    }
});


router.get('/get_issues_details', async (req, res) => {
    try {
        // Construct the query to get issues details
        const query = `
            SELECT 
                COALESCE(COUNT(CASE WHEN issues <> 'NA' THEN 1 END), 0) as total_issues,
                COALESCE(COUNT(CASE WHEN issues = 'YES' THEN 1 END), 0) AS open_issues,
                COALESCE(COUNT(CASE WHEN issues = 'NO' THEN 1 END), 0) AS closed_issues,
                COALESCE(COUNT(CASE WHEN issue_type = 'evm' THEN 1 END), 0) AS evm_issues,
                COALESCE(COUNT(CASE WHEN issue_type = 'law' THEN 1 END), 0) AS law_issues
            FROM 
                \`modified-glyph-416314.demp_dev_master.demp_core\``;

        // Execute the query
        console.log(query)
        const rows = await bigqueryService.executeQuery(query);
        console.log(rows)
        // Return the result
        if (rows != null ) {
            const result = rows[0];
            res.status(200).json({ status: 'success', data: result });
        } else {
            res.status(404).json({ status: 'failed', message: 'No data found' });
        }
    } catch (error) {
        console.error('Error fetching issues details:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


module.exports = router;
