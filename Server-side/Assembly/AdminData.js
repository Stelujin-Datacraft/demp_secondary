const express = require("express");
const router = express.Router();
const { firebaseApp } = require("../main");

const db1 = firebaseApp.firestore();

//all for district level // nothing for bl // and particular for al
// calculate percentage and pre_poll_status for particular assembly
//output should be
// { 'assembly': 'Sillod',  'pre_pol_status': 'Done', 'poll_male': '1204', 'poll_female': '1112', 'poll_transgender': '122', 'poll_total': '2921', 'issues': '7', 'poll_male_per': '47', 'poll_female_per': '83', 'poll_transgender_per': '68', 'poll_total_per': '61' },
router.get("/get_assembly_data", async (req, res) => {
  const user_id = req.query.user_id;
  const level = req.query.level;
  const assembly = req.query.assembly;
  const token = req.query.token;

  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    //const assembly = response[0]["assembly"];
    // const contact = response[0]["mob_no"];
    const level1 = response[0]["level"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];

    if (!querySnapshot.empty && token === tokenvalue) {
      const user = db1.collection("inputform");
      const getUser = await user.get();
      const response = getUser.docs.map((value) => value.data());
      let malecount = 0;
      let femalecount = 0;
      let transcount = 0;
      let malecount1 = 0;
      let femalecount1 = 0;
      let transcount1 = 0;
      let newObject = {};
      let newObject1 = {};

      const user1 = db1.collection("issueform");
      const getUser1 = await user1.get();
      const response1 = getUser1.docs.map((value) => value.data());
      //change everything to all
      if (assembly === "all" && level === "dl" && level1 === "dl") {
        response.map((obj) => {
          if (obj.assembly === "sillod") {
            response1.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "sillod" &&
                originalObject.issue_status === "open"
              ) {
                newObject["issue"] = "Yes";
              }
            });

            if (obj.assembly === "sillod" && obj.Gender === "male") {
              malecount++;
            } else if (obj.assembly === "sillod" && obj.Gender === "female") {
              femalecount++;
            } else if (obj.assembly === "sillod" && obj.Gender === "trans") {
              transcount++;
            }
            newObject["assembly"] = obj.assembly;
            newObject["male_votes"] = malecount;
            newObject["female_votes"] = femalecount;
            newObject["trans_votes"] = transcount;
            newObject["total_votes"] = malecount + femalecount + transcount;
          } else if (obj.assembly === "phulambri") {
            response1.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "sillod" &&
                originalObject.issue_status === "open"
              ) {
                newObject1["issue"] = "Yes";
              }
            });
            if (obj.assembly === "phulambri" && obj.Gender === "male") {
              malecount1++;
            } else if (
              obj.assembly === "phulambri" &&
              obj.Gender === "female"
            ) {
              femalecount1++;
            } else if (obj.assembly === "phulambri" && obj.Gender === "trans") {
              transcount1++;
            }
            newObject1["assembly"] = obj.assembly;
            newObject1["male_votes"] = malecount1;
            newObject1["female_votes"] = femalecount1;
            newObject1["trans_votes"] = transcount1;
            newObject1["total_votes"] = malecount1 + femalecount1 + transcount1;
          }
        });
        return res.send([newObject, newObject1]);
      }
      if (
        (assembly === "sillod" && level === "dl") ||
        (assembly === "sillod" && level === "al")
      ) {
        response.map((obj) => {
          if (obj.assembly === "sillod") {
            response1.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "sillod" &&
                originalObject.issue_status === "open"
              ) {
                newObject["issue"] = "Yes";
              }
            });
            if (obj.assembly === "sillod" && obj.Gender === "male") {
              malecount++;
            } else if (obj.assembly === "sillod" && obj.Gender === "female") {
              femalecount++;
            } else if (obj.assembly === "sillod" && obj.Gender === "trans") {
              transcount++;
            }
            newObject["assembly"] = obj.assembly;
            newObject["male_votes"] = malecount;
            newObject["female_votes"] = femalecount;
            newObject["trans_votes"] = transcount;
            newObject["total_votes"] = malecount + femalecount + transcount;
          }
        });
        return res.send([newObject]);
      }
      if (
        (assembly === "phulambri" && level === "dl") ||
        (assembly === "phulambri" && level === "al")
      ) {
        response.map((obj) => {
          if (obj.assembly === "phulambri") {
            response1.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "sillod" &&
                originalObject.issue_status === "open"
              ) {
                newObject["issue"] = "Yes";
              }
            });
            if (obj.assembly === "phulambri" && obj.Gender === "male") {
              malecount++;
            } else if (
              obj.assembly === "phulambri" &&
              obj.Gender === "female"
            ) {
              femalecount++;
            } else if (obj.assembly === "phulambri" && obj.Gender === "trans") {
              transcount++;
            }
            newObject["assembly"] = obj.assembly;
            newObject["male_votes"] = malecount;
            newObject["female_votes"] = femalecount;
            newObject["trans_votes"] = transcount;
            newObject["total_votes"] = malecount + femalecount + transcount;
          }
        });
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
