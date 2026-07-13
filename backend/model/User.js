const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
    },
    mobileVerifyAt: {
      type: Date,
      default: null,
    },

    // otp verify
    Otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    otpAttempts: {
      type: Number,
      default: 0,
    },
    lastOtpSent: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Usermodel = mongoose.model("User", UserSchema);
module.exports = Usermodel;
