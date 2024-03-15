const express = require("express");
const router = express.Router();
const { firebaseApp } = require("../main");

const db1 = firebaseApp.firestore();

router.post("/input", async (req, res) => {
  const user_id = req.query.user_id;
  const token = req.query.token;
  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    const assembly = response[0]["assembly"];
    const contact = response[0]["mob_no"];
    const sector_officer = response[0]["sector_officer"];
    const pollbooth = response[0]["pollbooth"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];

    if (!querySnapshot.empty && token === tokenvalue) {
      const userjson = {
        ElectId: req.body.ElectId,
        Gender: req.body.Gender,
        assembly: assembly,
        pollbooth: pollbooth,
        contact: contact,
        sector_officer: sector_officer,
      };
      const response = db1.collection("inputform").add(userjson);
      return res.send(response);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get("/input", async (req, res) => {
  try {
    const user = db1.collection("inputform");
    const getUser = await user.get();
    const response = getUser.docs.map((value) => value.data());
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
