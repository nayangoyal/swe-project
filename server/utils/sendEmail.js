const nodemailer = require("nodemailer");

const { AUTH_EMAIL, AUTH_PASS } = process.env;
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,  // Use the appropriate port for Outlook (587 for STARTTLS)
    secure: false, // true for 465, false for other ports (STARTTLS)
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
    },
});

// test transporter
transporter.verify((error, success) => {
    if(error)
    {
        console.log(error);
        console.log(AUTH_EMAIL);
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
});

const sendEmail = async (mailOptions) => {
    try{
        await transporter.sendMail(mailOptions);
        console.log("success 3");
    } catch(error)
    {
        throw error;
        console.log(AUTH_EMAIL);
    }
};

module.exports = sendEmail;
