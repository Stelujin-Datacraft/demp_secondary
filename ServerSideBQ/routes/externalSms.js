const express = require("express");
const otpService = require("../services/otpService");
const bigqueryService = require("../services/bigqueryService");

const router = express.Router();

router.post("/externalsms", async (req, res) => {
  const token = req.query.token;
  const assembly = req.query.assembly;
  const level = req.query.level;
  const mobileNumber = req.query.mobileNumber;
  try {
    const valid = await otpService.checkToken(token);
    //addition of particular booth remaining
    if (valid) {
      if (level === "al") {
        const query = `
            SELECT blo_mob
            FROM \`modified-glyph-416314.demp_dev_master.demp_external\` WHERE level = 'blo' AND sector = '${assembly}'
        `;
        const rows = await bigqueryService.executeQuery(query);
        const bloMobs = rows.map((row) => row.blo_mob);
        console.log("mobs", bloMobs);
        const bodymsg = req.body.body;
        const modified = `This msg is from AL level officer ${mobileNumber} - ${bodymsg}`;

        await otpService.sendExternalSMS(mobileNumber, modified, bloMobs);
        res.json({ status: "success", message: "message sent successfully" });
      } else if (level === "dl") {
        const query = `
            SELECT blo_mob
            FROM \`modified-glyph-416314.demp_dev_master.demp_auth_level-data\` WHERE level = 'al'
        `;
        const rows = await bigqueryService.executeQuery(query);
        const bloMobs = rows.map((row) => row.blo_mob);
        console.log("mobs", bloMobs);
        const bodymsg = req.body.body;
        const modified = `This msg is from DL level officer ${mobileNumber} - ${bodymsg}`;

        await otpService.sendExternalSMS(mobileNumber, modified, bloMobs);
        res.json({ status: "success", message: "message sent successfully" });
      }
    } else {
      res.json({ status: "failed" });
    }
  } catch (err) {
    res.send({ error: err });
  }
});

module.exports = router;
