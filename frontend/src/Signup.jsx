import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import OtpVerify from "../OtpVerify";
import axios from "axios";
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
        "http://localhost:5000/api/v1/auth/register",
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

      {/* Main Container - Responsive layout & min-height */}
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4 py-8 bg-[#FAF9F6]">
        
        {/* Card Container - Dynamic width, modern borders, shadow on hover */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-md">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Signup
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                value={formData.name}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition duration-200"
                onChange={handleChange}
              />
            </div>

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
                onChange={handleChange}
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
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition duration-200"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 mt-2 text-sm md:text-base font-medium bg-[#10B981] hover:bg-[#059669] text-white rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99] cursor-pointer"
            >
              Signup
            </button>

            {/* Footer Redirect Link */}
            <div className="pt-3 text-center border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/Login"
                  className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition duration-150"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;