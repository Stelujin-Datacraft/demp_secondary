const bigqueryService = require("../services/bigqueryService");
const crypto = require("crypto");
const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

// Initialize BigQuery client
//const bigquery = new BigQuery();

// Function to check if mobile number exists in the database
async function checkMobileNumberExists(mobileNumber) {
  try {
    console.log(mobileNumber);
    const query = `SELECT blo_mob, blo_name, sector FROM \`modified-glyph-416314.demp_dev_master.demp_auth_level_data\` WHERE blo_mob = '${mobileNumber}'`;
    const [rows] = await bigqueryService.executeQuery(query);
    console.log(rows.length);
    return rows != null; // Return true if mobile number exists, false otherwise
  } catch (error) {
    console.error("Mobiile Number Does not Exist", error);
    return false; // Return false in case of any error
  }
}

//For generating token
function generateToken(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
//saving token in other table
async function saveTokenInCache() {
  try {
    const token = generateToken(10);
    const query = `INSERT INTO \`modified-glyph-416314.demp_dev_master.demp_user_token\` (token) VALUES ('${token}')`;
    await bigqueryService.executeQuery(query);
  } catch (error) {
    console.error("Error saving token in cache:", error);
  }
}
//saving otp and token in table
async function saveOtpInCache(mobileNumber, otp) {
  try {
    const query = `INSERT INTO \`modified-glyph-416314.demp_dev_master.demp_user_cache\` (mob, otp) VALUES ('${mobileNumber}', '${otp}')`;
    await bigqueryService.executeQuery(query);
  } catch (error) {
    console.error("Error saving OTP in cache:", error);
  }
}

// Function to generate a random 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendSMS(destinationNumber) {
  try {
    // Check if mobile number exists in the database
    const mobileNumberExists = await checkMobileNumberExists(destinationNumber);
    if (mobileNumberExists) {
      const concatinatedNumber = "+91" + destinationNumber;
      const otp = generateOTP();
      await saveOtpInCache(destinationNumber, otp);
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const message = await client.messages.create({
        body: `This is your otp -${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: concatinatedNumber,
      });

      res.send({ message, message: "Message sent" });
    } else {
      console.log("Mobile number does not exist in the database.");
      return {
        status: "failed",
        message: "Mobile number does not exist in the database",
      };
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return { status: "failed", message: "Error sending WhatsApp message" };
  }
}

async function verifyOtp(mobileNumber, otp) {
  try {
    // Query to check if the mobile number and OTP match in the cache table
    //const query = `SELECT mob, token FROM \`modified-glyph-416314.demp_dev_master.demp_user_cache\` WHERE mob = '${mobileNumber}' AND otp = '${otp}'`;
    console.log(mobileNumber, otp);
    //has to remove token from this
    const query = `
            SELECT main.mob, main.otp, sub.sector, sub.level 
            FROM (
                SELECT mob, otp 
                FROM \`modified-glyph-416314.demp_dev_master.demp_user_cache\` 
                WHERE mob = '${mobileNumber}' AND otp = '${otp}'
            ) AS main
            JOIN (
                SELECT sector, level, blo_mob 
                FROM \`modified-glyph-416314.demp_dev_master.demp_auth_level_data\` 
                WHERE blo_mob = '${mobileNumber}'
            ) AS sub
            ON main.mob = sub.blo_mob`;
    // Execute the query
    /* const query = `
           
                SELECT sector, level, blo_mob 
                FROM \`modified-glyph-416314.demp_dev_master.demp_auth_level_data\` 
                WHERE blo_mob = '${mobileNumber}'`;*/

    const [rows] = await bigqueryService.executeQuery(query);
    console.log(rows);
    // Check if a matching record was found
    if (rows != null) {
      return {
        status: "success",
        data: {
          mobileNumber: mobileNumber,
          assembly: rows.sector,
          level: rows.level,
        },
      };
    } else {
      return { status: "failed", message: "Incorrect mobile number or OTP" };
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { status: "error", message: "Internal server error" };
  }
}

async function checkToken(token) {
  const query = `
      SELECT token
      FROM \`modified-glyph-416314.demp_dev_master.demp_user_token\` WHERE true
  `;
  const [rows] = await bigqueryService.executeQuery(query);
  console.log(rows.token);
  console.log(token);
  if (rows.token == token) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  //   sendWhatsAppMessage,
  verifyOtp,
  sendSMS,
  saveTokenInCache,
  checkToken,
};
