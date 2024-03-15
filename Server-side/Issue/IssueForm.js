const express = require("express");
const router = express.Router();
const { firebaseApp } = require("../main");

const db1 = firebaseApp.firestore();

router.post("/issue", async (req, res) => {
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
    const contact = response[0]["mob_no"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];

    if (!querySnapshot.empty && token === tokenvalue) {
      const userjson = {
        IssueId: Math.floor(Math.random() * 100),
        // user_id: user_id,
        assembly: assembly,
        pollbooth: pollbooth,
        sector_officer: sector_officer,
        issue_type: req.body.issue_type,
        issue_status: req.body.issue_status,
        contact: contact,
        Time: new Date(),
      };
      const response = db1.collection("issueform").add(userjson);
      res.send(response);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get("/get_all_issue", async (req, res) => {
  const user_id = req.query.user_id;
  const issue_status = req.query.issue_status;
  const issue_type = req.query.issue_type;
  const all_issue = req.query.all_issue;
  const token = req.query.token;
  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    const level = response[0]["level"];
    const pollbooth = response[0]["pollbooth"];
    const assembly = response[0]["assembly"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];

    if (!querySnapshot.empty && token === tokenvalue) {
      if (issue_status === "open") {
        let arr = [];
        let newObject = {};
        const user = db1.collection("issueform");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => value.data());
        response.map((obj) => {
          if (obj.issue_status === "open") {
            if (issue_type === "all") {
              response.forEach((originalObject, index) => {
                if (originalObject.issue_status === "open") {
                  arr.push({
                    issue_type: originalObject.issue_type,
                    sector_officer: originalObject.sector_officer,
                    assembly: originalObject.assembly,
                    pollbooth: originalObject.pollbooth,
                    contact: originalObject.contact,
                    time: originalObject.Time,
                  });
                }
              });
            } else if (issue_type === "evm") {
              if (obj.issue_type === "evm") {
                if (all_issue === "all") {
                  response.forEach((originalObject, index) => {
                    if (
                      originalObject.issue_type === "evm" &&
                      originalObject.issue_status === "open"
                    ) {
                      arr.push({
                        issue_type: originalObject.issue_type,
                        sector_officer: originalObject.sector_officer,
                        assembly: originalObject.assembly,
                        pollbooth: originalObject.pollbooth,
                        contact: originalObject.contact,
                        time: originalObject.Time,
                      });
                    }
                  });
                } else if (all_issue === "assembly") {
                  if (assembly === "sillod") {
                    response.forEach((originalObject, index) => {
                      if (
                        originalObject.assembly === "sillod" &&
                        originalObject.issue_status === "open"
                      ) {
                        arr.push({
                          issue_type: originalObject.issue_type,
                          sector_officer: originalObject.sector_officer,
                          assembly: originalObject.assembly,
                          pollbooth: originalObject.pollbooth,
                          contact: originalObject.contact,
                          time: originalObject.Time,
                        });
                      }
                    });
                  }
                  if (assembly === "phulambri") {
                    response.forEach((originalObject, index) => {
                      if (
                        originalObject.assembly === "phulambri" &&
                        originalObject.issue_status === "open"
                      ) {
                        arr.push({
                          issue_type: originalObject.issue_type,
                          sector_officer: originalObject.sector_officer,
                          assembly: originalObject.assembly,
                          pollbooth: originalObject.pollbooth,
                          contact: originalObject.contact,
                          time: originalObject.Time,
                        });
                      }
                    });
                  }
                }
              }
            } else if (issue_type === "law") {
              if (obj.issue_type === "law") {
                if (all_issue === "all") {
                  response.forEach((originalObject, index) => {
                    if (
                      originalObject.issue_type === "law" &&
                      originalObject.issue_status === "open"
                    ) {
                      arr.push({
                        issue_type: originalObject.issue_type,
                        sector_officer: originalObject.sector_officer,
                        assembly: originalObject.assembly,
                        pollbooth: originalObject.pollbooth,
                        contact: originalObject.contact,
                        time: originalObject.Time,
                      });
                    }
                  });
                } else if (all_issue === "assembly") {
                  if (assembly === "sillod") {
                    response.forEach((originalObject, index) => {
                      if (
                        originalObject.assembly === "sillod" &&
                        originalObject.issue_status === "open" &&
                        originalObject.issue_type === "law"
                      ) {
                        arr.push({
                          issue_type: originalObject.issue_type,
                          sector_officer: originalObject.sector_officer,
                          assembly: originalObject.assembly,
                          pollbooth: originalObject.pollbooth,
                          contact: originalObject.contact,
                          time: originalObject.Time,
                        });
                      }
                    });
                  }
                  if (assembly === "phulambri") {
                    response.forEach((originalObject, index) => {
                      if (
                        originalObject.assembly === "phulambri" &&
                        originalObject.issue_status === "open" &&
                        originalObject.issue_type === "law"
                      ) {
                        arr.push({
                          issue_type: originalObject.issue_type,
                          sector_officer: originalObject.sector_officer,
                          assembly: originalObject.assembly,
                          pollbooth: originalObject.pollbooth,
                          contact: originalObject.contact,
                          time: originalObject.Time,
                        });
                      }
                    });
                  }
                }
              }
            }
          }
        });
        return res.send(arr);
        //
      } else if (issue_status === "closed") {
        let arr = [];
        let newObject = {};
        let newObject1 = {};
        const user = db1.collection("issueform");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => value.data());
        response.map((obj) => {
          if (obj.issue_status === "closed") {
            if (issue_type === "all") {
              response.forEach((originalObject, index) => {
                if (originalObject.issue_status === "closed") {
                  arr.push({
                    issue_type: originalObject.issue_type,
                    sector_officer: originalObject.sector_officer,
                    assembly: originalObject.assembly,
                    pollbooth: originalObject.pollbooth,
                    contact: originalObject.contact,
                    time: originalObject.Time,
                  });
                }
              });
            } else if (issue_type === "evm") {
              if (obj.issue_type === "evm") {
                if (all_issue === "all") {
                  response.forEach((originalObject, index) => {
                    if (
                      originalObject.issue_type === "evm" &&
                      originalObject.issue_status === "closed"
                    ) {
                      arr.push({
                        issue_type: originalObject.issue_type,
                        sector_officer: originalObject.sector_officer,
                        assembly: originalObject.assembly,
                        pollbooth: originalObject.pollbooth,
                        contact: originalObject.contact,
                        time: originalObject.Time,
                      });
                    }
                  });
                } else if (all_issue === "assembly") {
                  if (assembly === "sillod") {
                    response.forEach((originalObject, index) => {
                      if (
                        originalObject.assembly === "sillod" &&
                        originalObject.issue_status === "closed"
                      ) {
                        arr.push({
                          issue_type: originalObject.issue_type,
                          sector_officer: originalObject.sector_officer,
                          assembly: originalObject.assembly,
                          pollbooth: originalObject.pollbooth,
                          contact: originalObject.contact,
                          time: originalObject.Time,
                        });
                      }
                    });
                  }
                  if (assembly === "phulambri") {
                    response.forEach((originalObject, index) => {
                      if (
                        originalObject.assembly === "phulambri" &&
                        originalObject.issue_status === "closed"
                      ) {
                        arr.push({
                          issue_type: originalObject.issue_type,
                          sector_officer: originalObject.sector_officer,
                          assembly: originalObject.assembly,
                          pollbooth: originalObject.pollbooth,
                          contact: originalObject.contact,
                          time: originalObject.Time,
                        });
                      }
                    });
                  }
                }
              }
            } else if (issue_type === "law") {
              if (obj.issue_type === "law") {
                if (all_issue === "all") {
                  response.forEach((originalObject, index) => {
                    if (
                      originalObject.issue_type === "law" &&
                      originalObject.issue_status === "closed"
                    ) {
                      arr.push({
                        issue_type: originalObject.issue_type,
                        sector_officer: originalObject.sector_officer,
                        assembly: originalObject.assembly,
                        pollbooth: originalObject.pollbooth,
                        contact: originalObject.contact,
                        time: originalObject.Time,
                      });
                    }
                  });
                } else if (all_issue === "assembly") {
                  if (assembly === "sillod") {
                    response.forEach((originalObject, index) => {
                      if (
                        originalObject.assembly === "sillod" &&
                        originalObject.issue_status === "closed" &&
                        originalObject.issue_type === "law"
                      ) {
                        arr.push({
                          issue_type: originalObject.issue_type,
                          sector_officer: originalObject.sector_officer,
                          assembly: originalObject.assembly,
                          pollbooth: originalObject.pollbooth,
                          contact: originalObject.contact,
                          time: originalObject.Time,
                        });
                      }
                    });
                  }
                  if (assembly === "phulambri") {
                    response.forEach((originalObject, index) => {
                      if (
                        originalObject.assembly === "phulambri" &&
                        originalObject.issue_status === "closed" &&
                        originalObject.issue_type === "law"
                      ) {
                        arr.push({
                          issue_type: originalObject.issue_type,
                          sector_officer: originalObject.sector_officer,
                          assembly: originalObject.assembly,
                          pollbooth: originalObject.pollbooth,
                          contact: originalObject.contact,
                          time: originalObject.Time,
                        });
                      }
                    });
                  }
                }
              }
            }
          }
        });
        return res.send(arr);
      }
    } else {
      return res.send("Sorry, User Not Authorized!");
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get("/get_issues_details", async (req, res) => {
  const user_id = req.query.user_id;
  const level = req.query.level;
  const assembly = req.query.assembly;
  const token = req.query.token;

  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    // const level = response[0]["level"];
    // const assembly = response[0]["assembly"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];

    if (!querySnapshot.empty && token === tokenvalue) {
      if (level === "al" || level === "dl") {
        let newObject = {};
        let opencount = 0;
        let closedcount = 0;
        let evmcounts = 0;
        let lawcounts = 0;
        let totalcount = 0;
        //evm and laws counted for both open and closed
        if (assembly === "sillod") {
          const user = db1.collection("issueform");
          const getUser = await user.get();
          const response = getUser.docs.map((value) => value.data());
          response.map((obj) => {
            if (obj.issue_status === "open" && obj.assembly === "sillod") {
              opencount++;
              newObject["open_issues"] = opencount;
              if (obj.issue_type === "evm") {
                evmcounts++;
                newObject["evm_issues"] = evmcounts;
              } else if (obj.issue_type === "law") {
                lawcounts++;
                newObject["law_issues"] = lawcounts;
              }
            }
            if (obj.issue_status === "closed" && obj.assembly === "sillod") {
              closedcount++;
              newObject["closed_issues"] = closedcount;
              if (obj.issue_type === "evm") {
                evmcounts++;
                newObject["evm_issues"] = evmcounts;
              } else if (obj.issue_type === "law") {
                lawcounts++;
                newObject["law_issues"] = lawcounts;
              }
            }
            newObject["open_issues"] = opencount;
            newObject["closed_issues"] = closedcount;
            newObject["total_issues"] = opencount + closedcount;
            newObject["evm_issues"] = evmcounts;
            newObject["law_issues"] = lawcounts;
          });
          return res.send([newObject]);
        } else if (assembly === "phulambri") {
          const user = db1.collection("issueform");
          const getUser = await user.get();
          const response = getUser.docs.map((value) => value.data());
          response.map((obj) => {
            if (obj.issue_status === "open" && obj.assembly === "phulambri") {
              opencount++;
              newObject["open_issues"] = opencount;
              if (obj.issue_type === "evm") {
                evmcounts++;
                newObject["evm_issues"] = evmcounts;
              } else if (obj.issue_type === "law") {
                lawcounts++;
                newObject["law_issues"] = lawcounts;
              }
            }
            if (obj.issue_status === "closed" && obj.assembly === "phulambri") {
              closedcount++;
              newObject["closed_issues"] = closedcount;
              if (obj.issue_type === "evm") {
                evmcounts++;
                newObject["evm_issues"] = evmcounts;
              } else if (obj.issue_type === "law") {
                lawcounts++;
                newObject["law_issues"] = lawcounts;
              }
            }
            newObject["open_issues"] = opencount;
            newObject["closed_issues"] = closedcount;
            newObject["total_issues"] = opencount + closedcount;
            newObject["evm_issues"] = evmcounts;
            newObject["law_issues"] = lawcounts;
          });
          return res.send([newObject]);
        }
      } //displaying all assembly counts
      else if (level === "dl" && assembly === "all") {
        const user = db1.collection("issueform");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => value.data());
        response.map((obj) => {
          if (obj.issue_status === "open") {
            opencount++;
            newObject["open_issues"] = opencount;
            if (obj.issue_type === "evm") {
              evmcounts++;
              newObject["evm_issues"] = evmcounts;
            } else if (obj.issue_type === "law") {
              lawcounts++;
              newObject["law_issues"] = lawcounts;
            }
          }
          if (obj.issue_status === "closed") {
            closedcount++;
            newObject["closed_issues"] = closedcount;
            if (obj.issue_type === "evm") {
              evmcounts++;
              newObject["evm_issues"] = evmcounts;
            } else if (obj.issue_type === "law") {
              lawcounts++;
              newObject["law_issues"] = lawcounts;
            }
          }
          newObject["open_issues"] = opencount;
          newObject["closed_issues"] = closedcount;
          newObject["total_issues"] = opencount + closedcount;
        });
        return res.send([newObject]);
      }
    }
  } catch (err) {
    return res.send({ error: err });
  }
});

router.get("/get_issues_dash", async (req, res) => {
  const user_id = req.query.user_id;
  const level = req.query.level;
  const key = req.query.key;
  const assembly = req.query.assembly;
  const token = req.query.token;
  try {
    const user1 = db1.collection("Assembly2");
    const query = user1.where("user_id", "==", user_id);

    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((value) => value.data());
    // const level = response[0]["level"];
    // const assembly = response[0]["assembly"];

    const user = db1.collection("token");
    const getUser = await user.get();
    const response1 = getUser.docs.map((value) => value.data());
    const tokenvalue = response1[0]["tokenvalue"];
    if (!querySnapshot.empty && token === tokenvalue) {
      if (level === "al" || level === "dl") {
        let newObject = {};
        let arr = [];
        if (assembly === "sillod") {
          const user = db1.collection("issueform");
          const getUser = await user.get();
          const response = getUser.docs.map((value) => value.data());
          response.map((obj) => {
            //displaying only open evm and law issues not closed
            if (obj.issue_status === "open") {
              response.forEach((originalObject, index) => {
                if (
                  originalObject.issue_status === "open" &&
                  originalObject.issue_type === key &&
                  originalObject.assembly === "sillod"
                ) {
                  arr.push({
                    issue_type: originalObject.issue_type,
                    sector_officer: originalObject.sector_officer,
                    assembly: originalObject.assembly,
                    pollbooth: originalObject.pollbooth,
                    contact: originalObject.contact,
                    time: originalObject.Time,
                  });
                }
              });
            }
          });
          return res.send(arr);
        } else if (assembly === "phulambri") {
          const user = db1.collection("issueform");
          const getUser = await user.get();
          const response = getUser.docs.map((value) => value.data());
          response.map((obj) => {
            if (obj.issue_status === "open") {
              response.forEach((originalObject, index) => {
                if (
                  originalObject.issue_status === "open" &&
                  originalObject.issue_type === key &&
                  originalObject.assembly === "phulambri"
                ) {
                  arr.push({
                    issue_type: originalObject.issue_type,
                    sector_officer: originalObject.sector_officer,
                    assembly: originalObject.assembly,
                    pollbooth: originalObject.pollbooth,
                    contact: originalObject.contact,
                    time: originalObject.Time,
                  });
                }
              });
            }
          });
          return res.send(arr);
        }
      } else if (level === "dl" && assembly === "all") {
        let newObject = {};
        const user = db1.collection("issueform");
        const getUser = await user.get();
        const response = getUser.docs.map((value) => value.data());
        response.map((obj) => {
          if (obj.issue_status === "open") {
            response.forEach((originalObject, index) => {
              if (
                originalObject.issue_status === "open" &&
                originalObject.issue_type === key
              ) {
                arr.push({
                  issue_type: originalObject.issue_type,
                  sector_officer: originalObject.sector_officer,
                  assembly: originalObject.assembly,
                  pollbooth: originalObject.pollbooth,
                  contact: originalObject.contact,
                  time: originalObject.Time,
                });
              }
            });
          }
        });
        return res.send(arr);
      }
    }
  } catch (err) {
    return res.send({ error: err });
  }
});

module.exports = router;
