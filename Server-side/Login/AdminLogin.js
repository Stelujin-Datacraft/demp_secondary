const express = require("express");
const router = express.Router();
const token = require("../Token/Token");

const { firebaseApp } = require("../main");

const db1 = firebaseApp.firestore();

router.get("/get_user", async (req, res) => {
  const number = req.query.number;
  const pass = req.query.pass;
  try {
    const user = db1.collection("Assembly2");
    const query = user.where("mob_no", "==", number);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    const id = response[0]["user_id"];
    const contact = response[0]["mob_no"];
    const level = response[0]["level"];
    const assembly = response[0]["assembly"];
    const pollbooth = response[0]["pollbooth"];

    if (!querySnapshot.empty) {
      const user = db1.collection("OTP");
      const getUser = await user.get();
      const response = getUser.docs.map((value) => value.data());
      const otp1 = response[0]["otpvalue"];

      if (pass === otp1) {
        const tokenvalue = token(10);
        await db1.collection("token").add({ tokenvalue });
        const user = db1.collection("token");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => ({
          id: value.id,
          ...value.data(),
        }));
        const tokenid = response[0]["id"];

        return res.send({
          message: "Authentication Successful",
          id,
          contact,
          level,
          assembly,
          pollbooth,
          tokenvalue,
          tokenid,
        });
      } else {
        return res.send("Sorry, Wrong Password!");
      }
    } else {
      return res.send("Sorry, User Not Found!");
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.post("/table", async (req, res) => {
  try {
    const userjson = {
      user_id: req.body.user_id,
      mob_no: req.body.mob_no,
      level: req.body.level,
      assembly: req.body.assembly,
      pollbooth: req.body.pollbooth,
      sector_officer: req.body.sector_officer,
    };
    const response = db1.collection("Assembly2").add(userjson);
    res.send(response);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
module.exports = router;
