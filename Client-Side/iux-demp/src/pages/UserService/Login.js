// Login.js

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../assets/loginstyle.css";
import {
  saveUser,
  LoginType,
  saveUserLogin,
  loadUserLogin,
  loadUser,
  saveNavTypes,
  loadNavTypes,
  getUserFunction,
  setUserFunction,
} from "../../components/actions";
import Form from "../Forms/Form";
import Input from "../../components/Input";

import {
  postData,
  getData,
  putData,
  deleteData,
  handleApiError,
} from "../../components/apiActions";
import {
  get_body,
  urlPre,
  get_login_mobile,
  post_login_mobile,
} from "../../components/globalApiConfig";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  /*    async function sendSMS(toNumber) {
        try {
            console.log('Code Started')
            // Hardcoded Credentials (for development/testing only!)
            const accountSid = 'AC6723613c6856d3a4fda6750f125c1f65';
            const authToken = 'c1b01a694b1de97d1ae2b0be7ebaa73f';

            const client = require('twilio')(accountSid, authToken);
            const otp = '655789';

            // Construct the SMS body
            const body = `Your one-time password (OTP) is ${otp}.`;
            await client.messages.create({
                body,
                to: toNumber,
                from: '+13314447544', // Replace with your Twilio phone number
            });

            console.log('SMS sent successfully!');
        } catch (error) {
            console.error('Error sending SMS:', error);
        }
    }
*/

  async function handleLogin(e) {
    e.preventDefault();

    try {
      console.log("Login Initiated");
      //const userData = await getData(`${urlPre}/get_user/`, { 'number': email, 'otp': pass });
      const userData = {
        id: "201",
        assembly: "sillod",
        pollbooth: "123",
      };

      if (userData) {
        console.log(userData); // Handle successful login
        const level = "dl";
        /* {
                        level: "",
                        token: "",
                        user_id: "",
                        assembly_code: "",
                        booth_code:""
                    }*/

        //user_id, level, base-> d/sec/b, token,
        if (level == "bl") {
          saveUserLogin(LoginType.BLO);
        } else if (level == "dl") {
          saveUserLogin(LoginType.ADMIN);
        } else if (level == "ddl") {
          saveUserLogin(LoginType.DADMIN);
        } else if (level == "al") {
          saveUserLogin(LoginType.SO);
        } else if (level == "asl") {
          saveUserLogin(LoginType.SO);
        } else {
          saveUserLogin(LoginType.PUBLIC);
        }

        //remove
        //saveUserLogin(LoginType.SO)
        //saveUser('9049807255', 'sillod', '12345', '123', level)
        //console.log(loadUser().payload)
        //console.log(loadUser().pay_level)

        //login, level, assembly_code, token, booth_code
        saveUser(
          userData.id,
          "token",
          userData.assembly,
          userData.pollbooth,
          level
        );
        //saveUser('9049807255', 'dl', 'sillod', '12345', '123')
        console.log(
          userData.id,
          "token",
          userData.assembly,
          userData.pollbooth,
          level
        );
        console.log(loadUser().payload);
        console.log(loadUser().pay_assembly_code);
        //window.location.href = `/canvas`;
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", userData);
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  const handleMobile = () => {
    console.log(email);
    try {
      let body = {
        number: email,
      };
      const response = getData(`${urlPre}/${post_login_mobile}`, body);
      if (response) {
        console.log(response);
      }
      setShowVerify(true);
    } catch {
      window.alert("USER NOT FOUND!");
      console.log("API FAILED ");
    }
  };

  return (
    <div className="Login-Page">
      {error && <p>{error}</p>}
      <div>
        <div className="background">
          {/*                    <div className="shape"></div>
                    <div className="shape"></div>*/}
        </div>
        <form onSubmit={handleLogin}>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="logo"
              src={require("../../assets/ICON/icon_logo.png")}
            />
            DEMP
          </h3>

          <label>Please enter your mobile number :</label>
          <input
            key="user_id"
            onChange={(e) => setEmail(e.target.value)}
            type="number"
            placeholder="phone"
            id="username"
          />
          {!showVerify && (
            <a
              className="button-47"
              onClick={() => handleMobile()}
              style={{
                color: "yellow !important",
                backgroundColor: "#cc9842",
                marginTop: "5px",
                width: "100%",
              }}
            >
              Get OTP
            </a>
          )}
          {showVerify && (
            <div>
              <label>Verify OTP</label>
              <input
                key="user_pass"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                id="password"
              />
              <a onClick={() => handleMobile()} style={{ color: "darkblue" }}>
                {" "}
                Resend OTP
              </a>
              <button
                type="submit"
                style={{ color: "yellow !important" }}
                className="login-button"
              >
                Log In
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
