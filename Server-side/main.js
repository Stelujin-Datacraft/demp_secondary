const express = require("express");
const app = express();
const cors = require("cors");
const fireadmin = require("firebase-admin");
const credentials = require("./key.json");

const firebaseApp = fireadmin.initializeApp({
  credential: fireadmin.credential.cert(credentials),
  databaseURL: "https://election-project-15206.firebaseio.com",
});

module.exports.firebaseApp = firebaseApp;
app.use(cors());
app.use(express.json());

const adminlogin = require("./Login/AdminLogin");
const admindata = require("./Assembly/AdminData");
const boothdata = require("./Booth/BoothData");
const districtdata = require("./District/DistrictData");
const inputform = require("./Form/InputForm");
const issueform = require("./Issue/IssueForm");
const prepoll = require("./Prepoll/PrePollStatus");
const logout = require("./Token/LogOut");
const otp = require("./Token/otpfile");

app.use("/", adminlogin);
app.use("/", admindata);
app.use("/", boothdata);
app.use("/", districtdata);
app.use("/", inputform);
app.use("/", issueform);
app.use("/", prepoll);
app.use("/", logout);
app.use("/", otp);

app.listen("5000", () => {
  console.log("server started");
});
