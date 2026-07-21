import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

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
        <div className="flex justify-center items-center min-h-screen px-4 py-6 bg-[#FAF9F6]">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm w-full max-w-md h-auto transition-shadow duration-300 hover:shadow-md">
                <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Otp Verify</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="email">
                            <strong className="font-medium text-gray-700">Email</strong>
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            value={data.email}
                            onChange={handleOtpChange}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full transition-colors duration-200 hover:border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label htmlFor="otp">
                            <strong className="font-medium text-gray-700">Otp Verify</strong>
                        </label>
                        <input
                            type="text"
                            id="otp"
                            inputMode="numeric"
                            placeholder="Enter 6-digit otp"
                            autoComplete="off"
                            maxLength={6}
                            value={data.otp}
                            name="otp"
                            onChange={handleOtpChange}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full transition-colors duration-200 hover:border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-center text-[15px] font-medium py-2 px-3 w-full mt-3 bg-[#10B981] text-white rounded-xl transition-all duration-200 hover:bg-emerald-600 active:scale-[0.99] shadow-sm hover:shadow"
                    >
                        Verify
                    </button>

                    <div className="text-[14px] font-normal flex justify-center p-2 text-blue-800 items-center mt-2">
                        <button className="cursor-pointer transition-colors duration-200 hover:text-blue-600 hover:underline" type="button" onClick={handleResendOtp}>Resend Otp</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OtpVerify;