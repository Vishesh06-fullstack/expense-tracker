import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    resetToken: "",
  });

  const [step, setStep] = useState("email"); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        { email: data.email }
      );
      toast.success(response.data.message);
      setStep("otp");
    } catch (error) {
      console.log("error");
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify-reset-otp`,
        { email: data.email, otp: data.otp }
      );
      toast.success("OTP verified");
      setData((prev) => ({ ...prev, resetToken: response.data.resetToken })); 
      setStep("password");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        { resetToken: data.resetToken, newPassword: data.newPassword }
      );
      toast.success(response.data.message);
      navigate("/Login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen pt-6 bg-[#FAF9F6]">
      <div className="bg-white p-5 rounded border-2 w-90 h-90 hover:bg-gray-100">
        <h2 className="text-center text-2xl mb-2">Reset Password</h2>

        {step === "email" && (
          <form onSubmit={handleSendOtp}>
            <div className="mb-4 flex flex-col">
              <label htmlFor="email"><strong className="font-medium">Email</strong></label>
              <input
                type="text"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-none px-3 py-2 text-sm w-full"
              />
            </div>
            <button type="submit" className="text-center text-[15px] py-1 px-3 w-full mt-2 bg-[#10B981] text-white rounded-xl hover:bg-blue-800">
              Send OTP
            </button>
          </form>
        )}

       {/* step of otp */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4 flex flex-col">
              <label><strong className="font-medium">Email</strong></label>
              <input type="text" value={data.email} disabled className="border border-gray-300 rounded-none px-3 py-2 text-sm w-full bg-gray-100" />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="otp"><strong className="font-medium">Enter OTP</strong></label>
              <input
                type="text"
                id="otp"
                inputMode="numeric"
                placeholder="Enter 6-digit otp"
                autoComplete="off"
                maxLength={6}
                name="otp"
                value={data.otp}
                onChange={handleChange}
                className="border border-gray-300 rounded-none px-3 py-2 text-sm w-full"
              />
            </div>
            <button type="submit" className="text-center text-[15px] py-1 px-3 w-full mt-2 bg-[#10B981] text-white rounded-xl hover:bg-blue-800">
              Verify OTP
            </button>
          </form>
        )}


        {step === "password" && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4 flex flex-col">
              <label><strong className="font-medium">New Password</strong></label>
              <input
                type="password"
                placeholder="Enter New Password"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                className="border border-gray-300 rounded-none px-3 py-2 text-sm w-full"
              />
            </div>
            <button type="submit" className="text-center text-[15px] py-1 px-3 w-full mt-2 bg-[#10B981] text-white rounded-xl hover:bg-blue-800">
              Save Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;