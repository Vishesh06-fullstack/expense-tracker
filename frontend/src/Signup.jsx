import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import OtpVerify from "../OtpVerify";
import axios from "axios";
import {motion} from "framer-motion";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // backend submission logic
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData
      );
      console.log(response.data);

      localStorage.setItem("email", response.data.email);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      toast.success("SignUp successfully");
      if (response.status == 201) {
        navigate("/OtpVerify");
      }
    } catch (error) {
      toast.error(error);
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
      transition={{ duration: 0.7, ease: "easeOut" }}
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
        Create Account 🚀
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Name
          </label>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Email
          </label>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </motion.div>

        {/* Signup Button */}
        <motion.button
          whileHover={{
            scale: 1.04,
            boxShadow: "0px 12px 30px rgba(16,185,129,0.35)",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
          type="submit"
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
        >
          Create Account
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="border-t pt-5 text-center"
        >
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </form>
    </motion.div>
  </div>
</>
  );
}

export default Signup;