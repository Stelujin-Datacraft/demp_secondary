const https = require('follow-redirects').https;
const bigqueryService = require('../services/bigqueryService');

// Initialize BigQuery client
//const bigquery = new BigQuery();

// Function to check if mobile number exists in the database
async function checkMobileNumberExists(mobileNumber) {
    try {
        console.log(mobileNumber)
        const query = `SELECT blo_mob, blo_name, sector FROM \`modified-glyph-416314.demp_dev_master.demp_auth_level_data\` WHERE blo_mob = '${mobileNumber}'`;
        const [rows] = await bigqueryService.executeQuery(query);
        console.log(rows.length)
        return rows != null; // Return true if mobile number exists, false otherwise
    } catch (error) {
        console.error('Error checking mobile number:', error);
        return false; // Return false in case of any error
    }
}
// Function to check if mobile number exists in the database

// Function to generate a random 4-digit OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Function to send WhatsApp message with OTP
async function sendWhatsAppMessage(destinationNumber) {
    try {
        // Check if mobile number exists in the database
        const mobileNumberExists = await checkMobileNumberExists(destinationNumber);

        if (mobileNumberExists) {
            const otp = generateOTP();

            const options = {
                'method': 'POST',
                'hostname': '1vz58k.api.infobip.com',
                'path': '/whatsapp/1/message/template',
                'headers': {
                    'Authorization': 'App f831035fc81ac0f6e2e55125d9cc6c5b-3c6ff058-3625-417d-8671-dd82f3a32708',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                'maxRedirects': 20
            };

            const req = https.request(options, function (res) {
                const chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function (chunk) {
                    const body = Buffer.concat(chunks);
                    console.log(body.toString());
                });

                res.on("error", function (error) {
                    console.error(error);
                });
            });

            const messageContent = `Your OTP is: ${otp}`;

            const postData = JSON.stringify({
                "messages": [
                    {
                        "from": "447860099299",
                        "to": '91'+destinationNumber,
                        "messageId": "532b0903-3ad8-473b-bf2b-c626a41d24c8",
                        "content": {
                            "templateName": "message_test",
                            "templateData": {
                                "body": {
                                    "placeholders": [messageContent]
                                }
                            },
                            "language": "en"
                        }
                    }
                ]
            });

            req.write(postData);
            req.end();

            return { status: 'success', message: 'WhatsApp message sent successfully' };
        } else {
            console.log('Mobile number does not exist in the database.');
            return { status: 'failed', message: 'Mobile number does not exist in the database' };
        }
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return { status: 'failed', message: 'Error sending WhatsApp message' };
    }
}

module.exports = {
    sendWhatsAppMessage
};