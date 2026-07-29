import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import OtpVerify from "../OtpVerify";
import ResetPassword from "../ResetPassword";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Login() {
  const Navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");

  // har field ka error alag se store hoga
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
    // type karte hi us field ka error hata do
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // submit se pehle client-side check
  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // koi field invalid hai toh yahin ruk jao, API call mat bhejo
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);

      if (response.status == 200) {
        Navigate("/Dashboard");
      }
    } catch (error) {
      const backendField = error.response?.data?.field;
      const backendMessage = error.response?.data?.message;

      if (backendField && errors.hasOwnProperty(backendField)) {
        setErrors((prev) => ({ ...prev, [backendField]: backendMessage }));
      } else {
        toast.error(backendMessage || "Something went wrong");
      }
    }
  };

  return (
    <>
      <div>
        <Navbar
          heading={"Expense Tracker"}
          a1={"Signup"}
          a2={"Login"}
          width={"w-22"}
          l1={"/Signup"}
          l2={"/Login"}
        />
      </div>

      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-emerald-50 via-white to-green-100 flex justify-center items-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          whileHover={{
            y: -8,
            boxShadow: "0px 20px 40px rgba(16,185,129,0.18)",
          }}
          className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-200 shadow-xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-gray-800 mb-8"
          >
            Welcome Back 👋
          </motion.h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
              </label>

              <motion.input
                whileFocus={{
                  scale: 1.02,
                }}
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                value={formData.email}
                onChange={onhandleChange}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-emerald-500"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <motion.input
                whileFocus={{
                  scale: 1.02,
                }}
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                value={formData.password}
                onChange={onhandleChange}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-emerald-500"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </motion.div>

            {/* Button */}
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0px 12px 30px rgba(16,185,129,0.35)",
              }}
              whileTap={{
                scale: 0.96,
              }}
              transition={{
                duration: 0.2,
              }}
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              Login
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <Link
                to="/ResetPassword"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot Password?
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="border-t pt-5 text-center"
            >
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/Signup"
                  className="font-semibold text-emerald-600 hover:underline"
                >
                  Signup
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
