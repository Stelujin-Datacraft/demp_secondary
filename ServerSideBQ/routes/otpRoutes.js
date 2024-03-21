const express = require("express");
const otpService = require("../services/otpService");
const bigqueryService = require("../services/bigqueryService");

const router = express.Router();

router.post("/send_otp_sms", (req, res) => {
  // const mobileNumber = req.body.mobileNumber;
  const mobileNumber = req.query.mobileNumber;
  if (!mobileNumber) {
    return res.status(400).json({ error: "Mobile number is required" });
  }
  // Assuming mobile number format is 10-digit Indian number
  if (!/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ error: "Invalid mobile number format" });
  }
  otpService.sendSMS(mobileNumber);
  res.json({ status: "success", message: "OTP sent successfully" });
});
// Your route or controller file

// Your route or controller function
// router.post("/send_otp", async (req, res) => {
//   try {
//     // Your OTP sending logic here
//     const destinationNumber = req.body.mobileNumber; // Assuming the mobile number is provided in the request body
//     const result = await otpService.sendWhatsAppMessage(destinationNumber);

//     if (result.status === "success") {
//       res.status(200).json({
//         status: "success",
//         message: "WhatsApp message sent successfully",
//       });
//     } else {
//       res.status(400).json({
//         status: "failed",
//         message: "Failed to send WhatsApp message: " + result.message,
//       });
//     }

//     //if (ret == 200) { res.json({ status: 'success', message: 'WhatsApp message sent successfully' }); }
//     //else if (ret == 400) { res.json({ status: 'failed', message: 'No Such User' });}
//     // Respond with success message
//   } catch (error) {
//     console.error("Error sending WhatsApp message:", error);
//     res
//       .status(500)
//       .json({ status: "error", message: "Failed to send WhatsApp message" });
//   }
// });

// Endpoint to verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    // const { mobileNumber, otp } = req.body;
    const mobileNumber = req.query.mobileNumber;
    const otp = req.query.otp;

    // Call the service function to verify OTP
    const verificationResult = await otpService.verifyOtp(mobileNumber, otp);

    if (verificationResult.status === "success") {
      //saving token
      await otpService.saveTokenInCache();
      const query = `SELECT token FROM \`modified-glyph-416314.demp_dev_master.demp_user_token\``;
      const [row] = await bigqueryService.executeQuery(query);

      // OTP verification successful
      const { mobileNumber, assembly, level } = verificationResult.data;
      res.status(200).json({
        status: "success",
        message: "OTP verification successful",
        mobileNumber: mobileNumber,
        token: row.token,
        assembly: assembly,
        level: level,
      });
    } else {
      // OTP verification failed
      res
        .status(400)
        .json({ status: "failed", message: "Incorrect mobile number or OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const query = `DELETE FROM \`modified-glyph-416314.demp_dev_master.demp_user_cache\` WHERE true;`;
    await bigqueryService.executeQuery(query);
    const query1 = `DELETE FROM \`modified-glyph-416314.demp_dev_master.demp_user_token\` WHERE true;`;
    await bigqueryService.executeQuery(query1);
    return res.send({ message: "Logged out Successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error While Logout" });
  }
});
module.exports = router;
