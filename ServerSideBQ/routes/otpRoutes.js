const express = require('express');
const otpService = require('../services/otpService');

const router = express.Router();

router.post('/send_otp_sms', (req, res) => {
    const mobileNumber = req.body.mobileNumber;
    if (!mobileNumber) {
        return res.status(400).json({ error: 'Mobile number is required' });
    }
    // Assuming mobile number format is 10-digit Indian number
    if (!/^\d{10}$/.test(mobileNumber)) {
        return res.status(400).json({ error: 'Invalid mobile number format' });
    }
    otpService.sendOTP(mobileNumber);
    res.json({ status: 'success', message: 'OTP sent successfully' });
});
// Your route or controller file


// Your route or controller function
router.post('/send_otp', async (req, res) => {
    try {
        // Your OTP sending logic here
        console.log(req.body.number)
        otpService.sendWhatsAppMessage(req.body.number);
        
        //if (ret == 200) { res.json({ status: 'success', message: 'WhatsApp message sent successfully' }); }
        //else if (ret == 400) { res.json({ status: 'failed', message: 'No Such User' });}
        // Respond with success message
        
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send WhatsApp message' });
    }
});


module.exports = router;
