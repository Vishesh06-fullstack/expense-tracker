require('dotenv').config();

const {Resend} = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     family: 4,
//     auth: {
//         user: process.env.mail_user,
//         pass: process.env.mail_password,
//     },
// });

const sendEmail = async (otp, email) => {
    try {
        const {data , error } = await resend.emails.send({
            from: 'Expense Tracker <onboarding@resend.dev>',
            to: email,
            subject: "Your OTP Verification code",
            html: `<div><h1>${otp}</h1></div>`,
        });

        if(error){
            console.log("Email sending failed" , error);
            return false;
        }
        console.log("Email sent: " , data.id);
       return true;
    } catch (error) {
        console.log("Email sending failed:", error.message);
        return false;
    }
};

module.exports = sendEmail;