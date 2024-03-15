const express = require("express");
const router = express.Router();
const { firebaseApp } = require("../main");

const db1 = firebaseApp.firestore();

router.get("/get_booth", async (req, res) => {
  const user_id = req.query.user_id;
  const assembly = req.query.assembly;
  const level = req.query.level;
  const token = req.query.token;
  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    // const assembly = response[0]["assembly"];
    const level1 = response[0]["level"];
    const pollbooth = response[0]["pollbooth"];

    const user2 = db1.collection("issueform");
    const getUser1 = await user2.get();
    const response1 = getUser1.docs.map((value) => value.data());

    const user3 = db1.collection("prepoll");
    const getUser2 = await user3.get();
    const response2 = getUser2.docs.map((value) => value.data());

    const user4 = db1.collection("token");
    const getUser3 = await user4.get();
    const response3 = getUser3.docs.map((value) => value.data());
    const tokenvalue = response3[0]["tokenvalue"];

    if (!querySnapshot.empty && token === tokenvalue) {
      let malecount = 0;
      let femalecount = 0;
      let transcount = 0;
      let malecount1 = 0;
      let femalecount1 = 0;
      let transcount1 = 0;
      const newObject = {};
      const newObject1 = {};
      let malecount2 = 0;
      let femalecount2 = 0;
      let transcount2 = 0;
      let malecount3 = 0;
      let femalecount3 = 0;
      let transcount3 = 0;
      const newObject2 = {};
      const newObject3 = {};
      if (
        (assembly === "sillod" && level === "al") ||
        (assembly === "sillod" && level === "dl")
      ) {
        const user = db1.collection("inputform");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => value.data());

        response.map((obj) => {
          if (obj.assembly === "sillod") {
            response1.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "sillod" &&
                originalObject.issue_status === "open" &&
                originalObject.pollbooth === "booth1"
              ) {
                newObject["issue"] = "Yes";
              } else {
                newObject["issue"] = "No";
              }
            });
            response2.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "sillod" &&
                originalObject.pollbooth === "booth1"
              ) {
                newObject["evm_clear"] = originalObject.evm_clear;
                newObject["mockpoll"] = originalObject.mockpoll;
                newObject["poll_started"] = originalObject.poll_started;
              }
            });
            if (obj.pollbooth === "booth1") {
              if (obj.assembly === "sillod" && obj.Gender === "male") {
                malecount++;
              } else if (obj.assembly === "sillod" && obj.Gender === "female") {
                femalecount++;
              } else if (obj.assembly === "sillod" && obj.Gender === "trans") {
                transcount++;
              }
              newObject["assembly"] = obj.assembly;
              newObject["pollbooth"] = obj.pollbooth;
              newObject["male_votes"] = malecount;
              newObject["female_votes"] = femalecount;
              newObject["trans_votes"] = transcount;
              newObject["total_votes"] = malecount + femalecount;
              newObject["sector_officer"] = obj.sector_officer;
            } else if (obj.pollbooth === "booth2") {
              response1.forEach((originalObject, index) => {
                if (
                  originalObject.assembly === "sillod" &&
                  originalObject.issue_status === "open" &&
                  originalObject.pollbooth === "booth2"
                ) {
                  newObject1["issue"] = "Yes";
                } else {
                  newObject1["issue"] = "No";
                }
              });
              response2.forEach((originalObject, index) => {
                if (
                  originalObject.assembly === "sillod" &&
                  originalObject.pollbooth === "booth2"
                ) {
                  newObject1["evm_clear"] = originalObject.evm_clear;
                  newObject1["mockpoll"] = originalObject.mockpoll;
                  newObject1["poll_started"] = originalObject.poll_started;
                }
              });
              if (obj.pollbooth === "booth2") {
                if (obj.assembly === "sillod" && obj.Gender === "male") {
                  malecount1++;
                } else if (
                  obj.assembly === "sillod" &&
                  obj.Gender === "female"
                ) {
                  femalecount1++;
                } else if (
                  obj.assembly === "sillod" &&
                  obj.Gender === "trans"
                ) {
                  transcount1++;
                }
                newObject1["assembly"] = obj.assembly;
                newObject1["pollbooth"] = obj.pollbooth;
                newObject1["male_votes"] = malecount1;
                newObject1["female_votes"] = femalecount1;
                newObject1["trans_votes"] = transcount1;
                newObject1["total_votes"] = malecount1 + femalecount1;
                newObject1["sector_officer"] = obj.sector_officer;
              }
            }
          }
        });
        return res.send([newObject, newObject1]);
      } else if (
        (assembly === "phulambri" && level === "al") ||
        (assembly === "phulambri" && level === "dl")
      ) {
        const user = db1.collection("inputform");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => value.data());

        response.map((obj) => {
          if (obj.assembly === "phulambri") {
            response1.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "phulambri" &&
                originalObject.issue_status === "open" &&
                originalObject.pollbooth === "booth1"
              ) {
                newObject["issue"] = "Yes";
              } else {
                newObject["issue"] = "No";
              }
            });
            response2.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "phulambri" &&
                originalObject.pollbooth === "booth1"
              ) {
                newObject["evm_clear"] = originalObject.evm_clear;
                newObject["mockpoll"] = originalObject.mockpoll;
                newObject["poll_started"] = originalObject.poll_started;
              }
            });
            if (obj.pollbooth === "booth1") {
              if (obj.assembly === "phulambri" && obj.Gender === "male") {
                malecount++;
              } else if (
                obj.assembly === "phulambri" &&
                obj.Gender === "female"
              ) {
                femalecount++;
              } else if (
                obj.assembly === "phulambri" &&
                obj.Gender === "trans"
              ) {
                transcount++;
              }
              newObject["assembly"] = obj.assembly;
              newObject["pollbooth"] = obj.pollbooth;
              newObject["male_votes"] = malecount;
              newObject["female_votes"] = femalecount;
              newObject["trans_votes"] = transcount;
              newObject["total_votes"] = malecount + femalecount;
              newObject["sector_officer"] = obj.sector_officer;
            } else if (obj.pollbooth === "booth2") {
              response1.forEach((originalObject, index) => {
                if (
                  originalObject.assembly === "phulambri" &&
                  originalObject.issue_status === "open" &&
                  originalObject.pollbooth === "booth2"
                ) {
                  newObject1["issue"] = "Yes";
                } else {
                  newObject1["issue"] = "No";
                }
              });
              response2.forEach((originalObject, index) => {
                if (
                  originalObject.assembly === "phulambri" &&
                  originalObject.pollbooth === "booth2"
                ) {
                  1;
                  newObject1["evm_clear"] = originalObject.evm_clear;
                  newObject1["mockpoll"] = originalObject.mockpoll;
                  newObject1["poll_started"] = originalObject.poll_started;
                }
              });
              if (obj.pollbooth === "booth1") {
                if (obj.assembly === "phulambri" && obj.Gender === "male") {
                  malecount1++;
                } else if (
                  obj.assembly === "phulambri" &&
                  obj.Gender === "female"
                ) {
                  femalecount1++;
                } else if (
                  obj.assembly === "phulambri" &&
                  obj.Gender === "trans"
                ) {
                  transcount1++;
                }
                newObject1["assembly"] = obj.assembly;
                newObject1["pollbooth"] = obj.pollbooth;
                newObject1["male_votes"] = malecount;
                newObject1["female_votes"] = femalecount;
                newObject1["trans_votes"] = transcount;
                newObject1["total_votes"] = malecount + femalecount;
                newObject1["sector_officer"] = obj.sector_officer;
              }
            }
          }
        });
        return res.send([newObject, newObject1]);
      } else if (assembly === "all" && level === "dl" && level1 === "dl") {
        const user = db1.collection("inputform");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => value.data());

        response.map((obj) => {
          if (obj.assembly === "sillod") {
            response1.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "sillod" &&
                originalObject.issue_status === "open" &&
                originalObject.pollbooth === "booth1"
              ) {
                newObject["issue"] = "Yes";
              } else {
                newObject["issue"] = "No";
              }
            });
            response2.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "sillod" &&
                originalObject.pollbooth === "booth1"
              ) {
                newObject["evm_clear"] = originalObject.evm_clear;
                newObject["mockpoll"] = originalObject.mockpoll;
                newObject["poll_started"] = originalObject.poll_started;
              }
            });
            if (obj.pollbooth === "booth1") {
              if (obj.assembly === "sillod" && obj.Gender === "male") {
                malecount++;
              } else if (obj.assembly === "sillod" && obj.Gender === "female") {
                femalecount++;
              } else if (obj.assembly === "sillod" && obj.Gender === "trans") {
                transcount++;
              }
              newObject["assembly"] = obj.assembly;
              newObject["pollbooth"] = obj.pollbooth;
              newObject["male_votes"] = malecount;
              newObject["female_votes"] = femalecount;
              newObject["trans_votes"] = transcount;
              newObject["total_votes"] = malecount + femalecount;
              newObject["sector_officer"] = obj.sector_officer;
            } else if (obj.pollbooth === "booth2") {
              response1.forEach((originalObject, index) => {
                if (
                  originalObject.assembly === "sillod" &&
                  originalObject.issue_status === "open" &&
                  originalObject.pollbooth === "booth2"
                ) {
                  newObject1["issue"] = "Yes";
                } else {
                  newObject1["issue"] = "No";
                }
              });
              response2.forEach((originalObject, index) => {
                if (
                  originalObject.assembly === "sillod" &&
                  originalObject.pollbooth === "booth2"
                ) {
                  newObject1["evm_clear"] = originalObject.evm_clear;
                  newObject1["mockpoll"] = originalObject.mockpoll;
                  newObject1["poll_started"] = originalObject.poll_started;
                }
              });
              if (obj.pollbooth === "booth2") {
                if (obj.assembly === "sillod" && obj.Gender === "male") {
                  malecount1++;
                } else if (
                  obj.assembly === "sillod" &&
                  obj.Gender === "female"
                ) {
                  femalecount1++;
                } else if (
                  obj.assembly === "sillod" &&
                  obj.Gender === "trans"
                ) {
                  transcount1++;
                }
                newObject1["assembly"] = obj.assembly;
                newObject1["pollbooth"] = obj.pollbooth;
                newObject1["male_votes"] = malecount1;
                newObject1["female_votes"] = femalecount1;
                newObject1["trans_votes"] = transcount1;
                newObject1["total_votes"] = malecount1 + femalecount1;
                newObject1["sector_officer"] = obj.sector_officer;
              }
            }
          } else if (obj.assembly === "phulambri") {
            response1.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "phulambri" &&
                originalObject.issue_status === "open" &&
                originalObject.pollbooth === "booth1"
              ) {
                newObject2["issue"] = "Yes";
              } else {
                newObject2["issue"] = "No";
              }
            });
            response2.forEach((originalObject, index) => {
              if (
                originalObject.assembly === "phulambri" &&
                originalObject.pollbooth === "booth1"
              ) {
                newObject2["evm_clear"] = originalObject.evm_clear;
                newObject2["mockpoll"] = originalObject.mockpoll;
                newObject2["poll_started"] = originalObject.poll_started;
              }
            });
            if (obj.pollbooth === "booth1") {
              if (obj.assembly === "phulambri" && obj.Gender === "male") {
                malecount2++;
              } else if (
                obj.assembly === "phulambri" &&
                obj.Gender === "female"
              ) {
                femalecount2++;
              } else if (
                obj.assembly === "phulambri" &&
                obj.Gender === "trans"
              ) {
                transcount2++;
              }
              newObject2["assembly"] = obj.assembly;
              newObject2["pollbooth"] = obj.pollbooth;
              newObject2["male_votes"] = malecount2;
              newObject2["female_votes"] = femalecount2;
              newObject2["trans_votes"] = transcount2;
              newObject2["total_votes"] = malecount2 + femalecount2;
              newObject2["sector_officer"] = obj.sector_officer;
            } else if (obj.pollbooth === "booth2") {
              response1.forEach((originalObject, index) => {
                if (
                  originalObject.assembly === "phulambri" &&
                  originalObject.issue_status === "open" &&
                  originalObject.pollbooth === "booth2"
                ) {
                  newObject3["issue"] = "Yes";
                } else {
                  newObject3["issue"] = "No";
                }
              });
              response2.forEach((originalObject, index) => {
                if (
                  originalObject.assembly === "phulambri" &&
                  originalObject.pollbooth === "booth2"
                ) {
                  newObject3["evm_clear"] = originalObject.evm_clear;
                  newObject3["mockpoll"] = originalObject.mockpoll;
                  newObject3["poll_started"] = originalObject.poll_started;
                }
              });
              if (obj.pollbooth === "booth2") {
                if (obj.assembly === "phulambri" && obj.Gender === "male") {
                  malecount3++;
                } else if (
                  obj.assembly === "phulambri" &&
                  obj.Gender === "female"
                ) {
                  femalecount3++;
                } else if (
                  obj.assembly === "phulambri" &&
                  obj.Gender === "trans"
                ) {
                  transcount3++;
                }
                newObject3["assembly"] = obj.assembly;
                newObject3["pollbooth"] = obj.pollbooth;
                newObject3["male_votes"] = malecount3;
                newObject3["female_votes"] = femalecount3;
                newObject3["trans_votes"] = transcount3;
                newObject3["total_votes"] = malecount3 + femalecount3;
                newObject3["sector_officer"] = obj.sector_officer;
              }
            }
          }
        });
        return res.send([newObject, newObject1, newObject2, newObject3]);
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
