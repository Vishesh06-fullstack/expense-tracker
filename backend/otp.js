require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = async (otp, email) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM}>`,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <div>
          <h2>Expense Tracker</h2>
          <h1>${otp}</h1>
          <p>Your OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.log("Email sending failed:", error);
    return false;
  }
};

module.exports = sendEmail;