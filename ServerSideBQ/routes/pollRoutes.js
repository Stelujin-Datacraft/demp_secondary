const express = require('express');
const pollController = require('../controllers/pollController');

const router = express.Router();

router.get('/pre-poll-status-booth', async (req, res) => {
    try {
        const data = await pollController.getPrePollStatusBooth();
        res.json({ status: 'success', data });
    } catch (error) {
        console.error('Error fetching pre-poll status for booth:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch pre-poll status for booth' });
    }
});

router.post('/pre-poll', async (req, res) => {
    try {
        await pollController.postPrePoll(req.body);
        res.json({ status: 'success', message: 'Pre-poll data inserted successfully' });
    } catch (error) {
        console.error('Error inserting pre-poll data:', error);
        res.status(500).json({ status: 'error', message: 'Failed to insert pre-poll data' });
    }
});

router.post('/poll-closed', async (req, res) => {
    try {
        await pollController.postPollClosed(req.body);
        res.json({ status: 'success', message: 'Poll closed data inserted successfully' });
    } catch (error) {
        console.error('Error inserting poll closed data:', error);
        res.status(500).json({ status: 'error', message: 'Failed to insert poll closed data' });
    }
});

module.exports = router;
