const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/User.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../otp.js");

const generateOTP = () => crypto.randomInt(100000, 999999);

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      lastOtpSent: new Date(),
    });

    const emailSent = await sendEmail(otp, email);
    if (!emailSent) {
      return res.status(500).json({ message: "user registered , email failed to send"});
    }
    await newUser.save();
    console.log(otp);
    
    return res.status(201).json({ message: "OTP sent successfully", email , otp});
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error while registration" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Pls Register first..." });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Please verify your account first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(400).json({ message: "Login failed check Credentials" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isActive) {
      return res.status(400).json({ message: "User already verified" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid otp" });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Otp expired, resend it" });
    }

    user.isActive = true;
    user.emailVerifiedAt = new Date();
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "failing in otp verification" });
  }
});

router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isActive) {
      return res.status(400).json({ message: "User already verified" });
    }
    if (user.lastOtpSent && Date.now() - user.lastOtpSent.getTime() < 60000) {
      return res.status(429).json({ message: "Please wait before requesting new otp" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.lastOtpSent = new Date();
    await user.save(); // field updated
    await sendEmail(user.email, otp);
    res.json({ message: "OTP reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message  , otp});
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }


    if (user.lastOtpSent && Date.now() - user.lastOtpSent.getTime() < 60000) {
      return res.status(429).json({ message: "Please wait before requesting new otp" });
    }

    const otp = generateOTP();
    user.resetOtp = otp;
    user.resetOtpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.lastOtpSent = new Date();

    const emailSent = await sendEmail(otp, email);
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" , otp});
    }

    await user.save(); // existing user update, naya document nahi
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in forgot password" });
  }
});

router.post("/verify-reset-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid otp" });
    }
    if (user.resetOtpExpiry < new Date()) {
      return res.status(400).json({ message: "Otp expired, resend it" });
    }

    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    
    const resetToken = jwt.sign(
      { id: user._id, purpose: "reset" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" }
    );

    res.json({ message: "OTP verified", resetToken });
  } catch (error) {
    return res.status(500).json({ message: "Error verifying reset otp" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET_KEY);

    if (decoded.purpose !== "reset") {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }
});

module.exports = router;