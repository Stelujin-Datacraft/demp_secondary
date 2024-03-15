const express = require("express");
const router = express.Router();
const https = require("follow-redirects").https;
const { firebaseApp } = require("../main");

const db1 = firebaseApp.firestore();
const options = {
  method: "POST",
  hostname: "1vz58k.api.infobip.com",
  path: "/whatsapp/1/message/template",
  headers: {
    Authorization:
      "App f831035fc81ac0f6e2e55125d9cc6c5b-3c6ff058-3625-417d-8671-dd82f3a32708",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  maxRedirects: 20,
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendOTP = (postData) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (infobipRes) => {
      let chunks = [];

      infobipRes.on("data", (chunk) => {
        chunks.push(chunk);
      });

      infobipRes.on("end", () => {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
        resolve("OTP sent successfully");
      });

      infobipRes.on("error", (error) => {
        console.error(error);
        reject("Error occurred while sending OTP");
      });
    });

    req.on("error", (error) => {
      console.error(error);
      reject("Error occurred while sending OTP");
    });

    req.write(postData);
    req.end();
  });
};

router.get("/send-otp", async (req, res) => {
  try {
    const destinationNumber = req.query.number; //without 91
    const concatenatedNumber = "91" + destinationNumber;
    const user = db1.collection("Assembly2");
    const query = user.where("mob_no", "==", destinationNumber);

    const querySnapshot = await query.get();
    if (!destinationNumber || querySnapshot.empty) {
      return res
        .status(400)
        .send({ error: "Incorrect Phone Number", status: 400 });
    }

    const otp = String(generateOTP());
    await db1.collection("OTP").add({ otp });
    const messageContent = ` Your OTP is: ${otp}`;

    const postData = JSON.stringify({
      messages: [
        {
          from: "447860099299",
          to: concatenatedNumber,
          messageId: "532b0903-3ad8-473b-bf2b-c626a41d24c8",
          content: {
            templateName: "message_test",
            templateData: {
              body: {
                placeholders: [messageContent],
              },
            },
            language: "en",
          },
        },
      ],
    });

    const result = await sendOTP(postData);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
