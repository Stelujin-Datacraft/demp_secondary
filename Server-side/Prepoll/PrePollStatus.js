const express = require("express");
const router = express.Router();
const { firebaseApp } = require("../main");

const db1 = firebaseApp.firestore();

///prepoll/:user_id/:assembly/:pollbooth/:sector_officer
router.post("/prepoll", async (req, res) => {
  const user_id = req.query.user_id;
  const assembly = req.query.assembly;
  const pollbooth = req.query.pollbooth;
  const sector_officer = req.query.sector_officer;
  const token = req.query.token;
  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    const level = response[0]["level"];
    const pollbooth = response[0]["pollbooth"];
    const assembly = response[0]["assembly"];
    const sector_officer = response[0]["sector_officer"];
    const contact = response[0]["mob_no"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];

    if (!querySnapshot.empty && level === "bl" && token === tokenvalue) {
      const userjson = {
        assembly: assembly,
        pollbooth: pollbooth,
        sector_officer: sector_officer,
        mockpoll: req.body.mockpoll,
        evm_clear: req.body.evm_clear,
        poll_started: req.body.poll_started,
        contact: contact,
      };

      const response = db1.collection("prepoll").add(userjson);
      return res.send(response);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get("/get_pre_poll_status", async (req, res) => {
  const user_id = req.query.user_id;
  const level = req.query.level;
  const assembly = req.query.assembly;
  const token = req.query.token;
  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    const level1 = response[0]["level"];
    const pollbooth = response[0]["pollbooth"];
    // const assembly = response[0]["assembly"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];
    //also return contact no
    if (!querySnapshot.empty && token === tokenvalue) {
      let evm_clear = "Yes";
      let mockpoll = "Yes";
      let poll_started = "Yes";
      let evm_clear1 = "Yes";
      let mockpoll1 = "Yes";
      let poll_started1 = "Yes";
      let newObject = {};
      let newObject1 = {};
      if (level === "al" || level === "dl") {
        if (
          (level === "al" && assembly === "sillod") ||
          (level === "dl" && assembly === "sillod")
        ) {
          const user = db1.collection("prepoll");
          const getUser = await user.get();
          const response = getUser.docs.map((value) => value.data());

          response.map((obj) => {
            if (obj.assembly === "sillod") {
              if (obj.pollbooth === "booth1") {
                if (obj.evm_clear === "No") {
                  evm_clear = "No";
                } else if (obj.mockpoll === "No") {
                  mockpoll = "No";
                } else if (obj.poll_started === "No") {
                  poll_started = "No";
                }
              } else if (obj.pollbooth === "booth2") {
                if (obj.evm_clear === "No") {
                  evm_clear = "No";
                } else if (obj.mockpoll === "No") {
                  mockpoll = "No";
                } else if (obj.poll_started === "No") {
                  poll_started = "No";
                }
              }
              newObject["assembly"] = obj.assembly;
              newObject["evm_clear"] = evm_clear;
              newObject["mockpoll"] = mockpoll;
              newObject["poll_started"] = poll_started;
              newObject["contact"] = obj.contact;
            }
          });
          return res.send([newObject]);
        } else if (
          (level === "al" && assembly === "phulambri") ||
          (level === "dl" && assembly === "phulambri")
        ) {
          const user = db1.collection("prepoll");
          const getUser = await user.get();
          const response = getUser.docs.map((value) => value.data());

          response.map((obj) => {
            if (obj.assembly === "phulambri") {
              if (obj.pollbooth === "booth1") {
                if (obj.evm_clear === "No") {
                  evm_clear = "No";
                } else if (obj.mockpoll === "No") {
                  mockpoll = "No";
                } else if (obj.poll_started === "No") {
                  poll_started = "No";
                }
              } else if (obj.pollbooth === "booth2") {
                if (obj.evm_clear === "No") {
                  evm_clear = "No";
                } else if (obj.mockpoll === "No") {
                  mockpoll = "No";
                } else if (obj.poll_started === "No") {
                  poll_started = "No";
                }
              }
              newObject["assembly"] = obj.assembly;
              newObject["evm_clear"] = evm_clear;
              newObject["mockpoll"] = mockpoll;
              newObject["poll_started"] = poll_started;
              newObject["contact"] = obj.contact;
            }
          });
          return res.send([newObject]);
        }
      }
      if (level === "dl" && assembly === "all" && level1 === "dl") {
        const user = db1.collection("prepoll");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => value.data());

        response.map((obj) => {
          if (obj.assembly === "sillod") {
            if (obj.pollbooth === "booth1") {
              if (obj.evm_clear === "No") {
                evm_clear = "No";
              } else if (obj.mockpoll === "No") {
                mockpoll = "No";
              } else if (obj.poll_started === "No") {
                poll_started = "No";
              }
            } else if (obj.pollbooth === "booth2") {
              if (obj.evm_clear === "No") {
                evm_clear = "No";
              } else if (obj.mockpoll === "No") {
                mockpoll = "No";
              } else if (obj.poll_started === "No") {
                poll_started = "No";
              }
            }
            newObject["assembly"] = obj.assembly;
            newObject["evm_clear"] = evm_clear;
            newObject["mockpoll"] = mockpoll;
            newObject["poll_started"] = poll_started;
            newObject["contact"] = obj.contact;
          } else if (obj.assembly === "phulambri") {
            if (obj.pollbooth === "booth1") {
              if (obj.evm_clear === "No") {
                evm_clear1 = "No";
              } else if (obj.mockpoll === "No") {
                mockpoll1 = "No";
              } else if (obj.poll_started === "No") {
                poll_started1 = "No";
              }
            } else if (obj.pollbooth === "booth2") {
              if (obj.evm_clear === "No") {
                evm_clear1 = "No";
              } else if (obj.mockpoll === "No") {
                mockpoll1 = "No";
              } else if (obj.poll_started === "No") {
                poll_started1 = "No";
              }
            }
            newObject1["assembly"] = obj.assembly;
            newObject1["evm_clear"] = evm_clear1;
            newObject1["mockpoll"] = mockpoll1;
            newObject1["poll_started"] = poll_started1;
            newObject1["contact"] = obj.contact;
          }
        });
        return res.send([newObject, newObject1]);
      }
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get("/get_all_pre_poll_status", async (req, res) => {
  const user_id = req.query.user_id;
  const level = req.query.level;
  const token = req.query.token;
  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    // const level = response[0]["level"];
    const pollbooth = response[0]["pollbooth"];
    const assembly = response[0]["assembly"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];
    if (!querySnapshot.empty && token === tokenvalue) {
      if (assembly === "sillod") {
        let newObject = {};
        let newObject1 = {};
        if (level === "al") {
          if (assembly === "sillod") {
            const user = db1.collection("prepoll");
            const getUser = await user.get();
            const response = getUser.docs.map((value) => value.data());
            response.map((obj) => {
              if (obj.assembly === "sillod") {
                //use .foreach here also
                if (obj.booth === "booth1") {
                  newObject["mockpoll"] = obj.mockpoll;
                  newObject["evm_clear"] = obj.evm_clear;
                  newObject["pollstarted"] = obj.poll_started;
                  newObject["assembly"] = obj.assembly;
                  newObject["pollbooth"] = obj.pollbooth;
                  newObject["contact"] = obj.contact;
                  newObject["sector-officer"] = obj.sector_officer;
                }
                if (obj.booth === "booth2") {
                  newObject1["mockpoll"] = obj.mockpoll;
                  newObject1["evm_clear"] = obj.evm_clear;
                  newObject1["pollstarted"] = obj.poll_started;
                  newObject1["assembly"] = obj.assembly;
                  newObject1["pollbooth"] = obj.pollbooth;
                  newObject1["contact"] = obj.contact;
                  newObject1["sector-officer"] = obj.sector_officer;
                }
              }
            });
            return res.send([newObject, newObject1]);
          }
        }
        if (level === "bl") {
          const newObject = {};
          if (pollbooth === "booth1") {
            const user = db1.collection("prepoll");
            const getUser = await user.get();
            const response = getUser.docs.map((value) => value.data());
            response.map((obj) => {
              if (obj.assembly === "sillod") {
                if (obj.booth === "booth1") {
                  newObject["mockpoll"] = obj.mockpoll;
                  newObject["evm_clear"] = obj.evm_clear;
                  newObject["pollstarted"] = obj.poll_started;
                  newObject["assembly"] = obj.assembly;
                  newObject["pollbooth"] = obj.pollbooth;
                  newObject["contact"] = obj.contact;
                  newObject["sector-officer"] = obj.sector_officer;
                }
              }
            });
            return res.send(newObject);
          }
          if (pollbooth === "booth2") {
            const user = db1.collection("prepoll");
            const getUser = await user.get();
            const response = getUser.docs.map((value) => value.data());
            response.map((obj) => {
              if (obj.assembly === "sillod") {
                if (obj.booth === "booth2") {
                  newObject["mockpoll"] = obj.mockpoll;
                  newObject["evm_clear"] = obj.evm_clear;
                  newObject["pollstarted"] = obj.poll_started;
                  newObject["assembly"] = obj.assembly;
                  newObject["pollbooth"] = obj.pollbooth;
                  newObject["contact"] = obj.contact;
                  newObject["sector-officer"] = obj.sector_officer;
                }
              }
            });
            return res.send(newObject);
          }
        }
      }
      ///
      if (assembly === "phulambri") {
        let newObject = {};
        let newObject1 = {};
        if (level === "al") {
          if (assembly === "phulambri") {
            const user = db1.collection("prepoll");
            const getUser = await user.get();
            const response = getUser.docs.map((value) => value.data());
            response.map((obj) => {
              if (obj.assembly === "phulambri") {
                if (obj.booth === "booth1") {
                  newObject["mockpoll"] = obj.mockpoll;
                  newObject["evm_clear"] = obj.evm_clear;
                  newObject["pollstarted"] = obj.poll_started;
                  newObject["assembly"] = obj.assembly;
                  newObject["pollbooth"] = obj.pollbooth;
                  newObject["contact"] = obj.contact;
                  newObject["sector-officer"] = obj.sector_officer;
                }
                if (obj.booth === "booth2") {
                  newObject1["mockpoll"] = obj.mockpoll;
                  newObject1["evm_clear"] = obj.evm_clear;
                  newObject1["pollstarted"] = obj.poll_started;
                  newObject1["assembly"] = obj.assembly;
                  newObject1["pollbooth"] = obj.pollbooth;
                  newObject1["contact"] = obj.contact;
                  newObject1["sector-officer"] = obj.sector_officer;
                }
              }
            });
            return res.send({ newObject, newObject1 });
          }
        }
        if (level === "bl") {
          const newObject = {};
          if (pollbooth === "booth1") {
            const user = db1.collection("prepoll");
            const getUser = await user.get();
            const response = getUser.docs.map((value) => value.data());
            response.map((obj) => {
              if (obj.assembly === "phulambri") {
                if (obj.booth === "booth1") {
                  newObject["mockpoll"] = obj.mockpoll;
                  newObject["evm_clear"] = obj.evm_clear;
                  newObject["pollstarted"] = obj.poll_started;
                  newObject["assembly"] = obj.assembly;
                  newObject["pollbooth"] = obj.pollbooth;
                  newObject["contact"] = obj.contact;
                  newObject["sector-officer"] = obj.sector_officer;
                }
              }
            });
            return res.send(newObject);
          }
          if (pollbooth === "booth2") {
            const user = db1.collection("prepoll");
            const getUser = await user.get();
            const response = getUser.docs.map((value) => value.data());
            response.map((obj) => {
              if (obj.assembly === "phulambri") {
                if (obj.booth === "booth2") {
                  newObject["mockpoll"] = obj.mockpoll;
                  newObject["evm_clear"] = obj.evm_clear;
                  newObject["pollstarted"] = obj.poll_started;
                  newObject["assembly"] = obj.assembly;
                  newObject["pollbooth"] = obj.pollbooth;
                  newObject["contact"] = obj.contact;
                  newObject["sector-officer"] = obj.sector_officer;
                }
              }
            });
            return res.send(newObject);
          }
        }
      }
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
