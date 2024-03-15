const express = require('express');
const issueController = require('../controllers/issueController');

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

module.exports = router;
