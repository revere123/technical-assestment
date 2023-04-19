const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
    twilioSendMessage(to, body) {
        return new Promise((resolve, reject) => {
            client.messages.create({
                to: process.env.TWILIO_COUNTRY_CODE + to,
                from: process.env.TWILIO_SMS_SENDING_MOBILE_NUMBER,
                body: body
            }).then((success) => {
                resolve(success)
            }).catch((error) => {
                resolve(error)
            })
        })
    },
    twilioVoiceCall(options) {
        return new Promise((resolve, reject) => {
            client.calls.create(options).then((success) => {
                resolve(success)
            }).catch((error) => {
                resolve(error)
            })
        })
    },
}