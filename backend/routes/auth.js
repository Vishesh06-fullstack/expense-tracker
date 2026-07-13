const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/User.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../otp.js");
//user registration
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

    //sendEmail(otp , email)
    const emailSent = await sendEmail(otp, email);
    if (!emailSent) {
      return res
        .status(500)
        .json({ message: "User created but email failed to send" });
    }

    // console.log(otp);

    await newUser.save();
    console.log(otp);
    return res
      .status(201)
      .json({ message: "OTP sent successfully", userId: newUser._id });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error while registration" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    if (user.isActive) {
      return res.status(500).json({ message: "User already verified" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid otp" });
    }

    if (user.otp < new Date()) {
      return res.status(400).json({ message: "Otp expired , resend it" });
    }

    user.isActive = true;
    user.emailVerifiedAt = new Date();
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    return res.status(400).json({ message: "failing in otp verification" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" },
    );

    res.json({
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: "Login failed check Credentials" });
  }
});

router.post("/resend-otp", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isActive) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.lastOtpSent && Date.now() - user.lastOtpSent.getTime() < 60000) {
      return res
        .status(429)
        .json({ message: "Please wait before requesting new otp" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.lastOtpSent = new Date();
    await user.save();

    await sendEmail(user.email, otp);
    res.json({ message: "OTP reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post()
module.exports = router;
