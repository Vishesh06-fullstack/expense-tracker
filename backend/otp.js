require('dotenv').config();
let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    family: 4,
    auth: {
        user: process.env.mail_user,
        pass: process.env.mail_password,
    },
});

const sendEmail = async (otp, email) => {
    try {
        const mailOptions = {
            from: `"Expense Tracker" <${process.env.mail_user}>`,
            to: email,
            subject: "Your OTP Verification code",
            html: `<div><h1>${otp}</h1></div>`,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        return true;
    } catch (error) {
        console.log("Email sending failed:", error.message);
        return false;
    }
};

module.exports = sendEmail;