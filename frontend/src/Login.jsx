import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import OtpVerify from "../OtpVerify";
import ResetPassword from "../ResetPassword";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const Navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");

  const onhandleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );
      console.log(response);

      toast.success(response.data.message);

      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);

      if (response.status == 200) {
        Navigate("/Dashboard");
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

      {/* Main Container - Fully responsive padding & min-height */}
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4 py-8 bg-[#FAF9F6]">
        
        {/* Card Component - Smooth scaling, flex growth, hover shadows */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-md">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition duration-200"
                value={formData.email}
                onChange={onhandleChange}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                value={formData.password}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition duration-200"
                onChange={onhandleChange}
              />
            </div>

            {/* Submit Button with Hover & Active States */}
            <button
              type="submit"
              className="w-full py-2.5 mt-2 text-sm md:text-base font-medium bg-[#10B981] hover:bg-[#059669] text-white rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99] cursor-pointer"
            >
              Login
            </button>

            {/* Forget Password */}
            <div className="text-sm font-medium text-center pt-1">
              <a
                href="/ResetPassword"
                className="text-blue-600 hover:text-blue-800 hover:underline transition duration-150"
              >
                Forgot Password?
              </a>
            </div>

            {/* Redirect Option */}
            <div className="pt-2 text-center border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/Signup"
                  className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition duration-150"
                >
                  Signup
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;