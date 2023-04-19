const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    sendGridEmailService(mailOptions) {
        return new Promise((resolve, reject) => {
            sgMail.send(mailOptions)
                .then((response) => { console.log(response); resolve() })
                .catch((error) => { console.log(error); resolve() })
        })
    },
}