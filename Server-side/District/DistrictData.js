const express = require("express");
const router = express.Router();
const { firebaseApp } = require("../main");

const db1 = firebaseApp.firestore();

router.get("/get_district", async (req, res) => {
  const user_id = req.query.user_id;
  const assembly = req.query.assembly;
  const level = req.query.level;
  const token = req.query.token;
  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    // const level = response[0]["level"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];

    if (!querySnapshot.empty && token === tokenvalue) {
      if (level === "dl") {
        let malecount = 0;
        let femalecount = 0;
        let transcount = 0;
        let newObject = {};
        const user = db1.collection("inputform");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => value.data());
        response.map((obj) => {
          if (
            (obj.assembly === "sillod" && obj.Gender === "male") ||
            (obj.assembly === "phulambri" && obj.Gender === "male")
          ) {
            malecount++;
          } else if (
            (obj.assembly === "sillod" && obj.Gender === "female") ||
            (obj.assembly === "phulambri" && obj.Gender === "female")
          ) {
            femalecount++;
          } else if (
            (obj.assembly === "sillod" && obj.Gender === "trans") ||
            (obj.assembly === "phulambri" && obj.Gender === "trans")
          ) {
            transcount++;
          }
        });
        newObject["male_votes"] = malecount;
        newObject["female_votes"] = femalecount;
        newObject["trans_votes"] = transcount;
        newObject["total_votes"] = malecount + femalecount + transcount;
        return res.send([newObject]);
      }
    } else {
      return res.send("Sorry, User Not Authorized!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
