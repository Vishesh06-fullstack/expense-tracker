require('dotenv').config();
let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mail_user,
    pass: process.env.mail_password,
  },
});

const sendEmail = async (otp, email) => {
  try {
    const mailOptions = {
      from: `Email expenses : ${process.env.mail_user}`,
      to: email,
      subject: "Your otp Verification code",
      html: `<div>
                <h1>${otp}</h1>
            </div>
        `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    console.log("Email sent :", info.messageId);
    return true;
  } catch (error) {
    console.log("Email sending failed :", error.message);
    return false;
  }
};

module.exports = sendEmail;
