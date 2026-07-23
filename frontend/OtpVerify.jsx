import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import {motion} from "framer-motion";

function OtpVerify() {
      const navigate = useNavigate();
    const [data , setData] = useState({
           email : "",
           otp : ""
    });
    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        setData((prev) => ({...prev , email : savedEmail}))
        
        
        
    }, []);

    const handleOtpChange = (e) => {
        const {name , value} = e.target;
        setData((prev) => ({
            ...prev , [name] : value
        }))
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-otp` , data );
            console.log(response);
            toast.success("otp verified")
            setData({
                email : "",
                otp : ""
            });
            if(response.status === 200){
                localStorage.removeItem("email");
                navigate("/Login")
            }
        } catch (error) {
             toast.error(error.response?.data?.message || "Failed to Submit data");
        }
    }

    const handleResendOtp = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/resend-otp` , {email : data.email});
            console.log(response.data);
            toast.success(response.data.message);
        } catch (error) {
           toast.error(error.response?.data?.message || "Failed to resend OTP");
        }
    } 

  return (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 flex justify-center items-center px-4 py-8">
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
        Verify OTP 🔐
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-5">
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
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="email"
            placeholder="Enter Email"
            autoComplete="off"
            value={data.email}
            onChange={handleOtpChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </motion.div>

        {/* OTP */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            OTP
          </label>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            inputMode="numeric"
            maxLength={6}
            name="otp"
            placeholder="Enter 6-digit OTP"
            autoComplete="off"
            value={data.otp}
            onChange={handleOtpChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 tracking-[0.4em] text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </motion.div>

        {/* Verify Button */}
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
          Verify OTP
        </motion.button>

        {/* Resend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition"
          >
            Resend OTP
          </button>
        </motion.div>
      </form>
    </motion.div>
  </div>
);
}

export default OtpVerify;