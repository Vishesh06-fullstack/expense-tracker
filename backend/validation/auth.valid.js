const { z } = require("zod");

const emailField = z
  .string({ required_error: "Email is required" })
  .trim()
  .toLowerCase()
  .email("Enter a valid email address");
const passwordField = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be atleast 8 characters")
  .regex(/[A-Z]/, "Password must contain atleast one upper character")
  .regex(/[a-z]/, "Password must contain atleast one lower character")
  .regex(/[0-9]/, "Password must contain atleast one number");

const otpField = z
  .union([z.string(), z.number()])
  .transform((val) => string(val).trim())
  .refine((val) => /^\d{6}$/.test(val), "OTP must be a 6-digit number");

const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name should be more than 2 words")
    .max(50, "Name should be not more than 50 words"),
  email: emailField,
  password: passwordField,
});

const loginSchema = z.object({
  email: emailField,
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

const verifyOtpSchema = z.object({
  email: emailField,
  otp: otpField,
});

const resendSchema = z.object({
  email: emailField,
});

const forgotPasswordSchema = z.object({
  email: emailField,
});

const verifyResetSchema = z.object({
  email: emailField,
  otp: otpField,
});

const resetPasswordschema = z.object({
  resetToken: z.string({ required_error: "Reset token is required" }).min(1),
  newPassword: passwordField,
});

module.exports = {
  registerSchema,
  loginSchema,
  resendSchema,
  resetPasswordschema,
  verifyOtpSchema,
  verifyResetSchema,
  forgotPasswordSchema
};
