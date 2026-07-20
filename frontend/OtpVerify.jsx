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
            const response = await axios.post("http://localhost:5000/api/v1/auth/verify-otp" , data );
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
            const response = await axios.post('http://localhost:5000/api/v1/auth/resend-otp' , {email : data.email});
            console.log(response.data);
            toast.success(response.data.message);
        } catch (error) {
           toast.error(error.response?.data?.message || "Failed to resend OTP");
        }
    } 

    return (
        <div className="flex justify-center items-center h-screen pt-6 bg-[#FAF9F6]">
            <div className="bg-white p-5 rounded border-2 w-90 h-80 hover:bg-gray-100">
                <h2 className="text-center text-2xl mb-2">Otp Verify</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="email">
                            <strong className="font-medium">Email</strong>
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            value={data.email}
                            onChange={handleOtpChange}
                            className="border border-gray-300 rounded-none px-3 py-2 text-sm w-full"
                        />
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label htmlFor="otp">
                            <strong className="font-medium">Otp Verify</strong>
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
                            className="border border-gray-300 rounded-none px-3 py-2 text-sm w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-center text-[15px] py-1 px-3 w-full mt-3 mr-1 bg-[#10B981] text-white rounded-xl hover:bg-blue-800"
                    >
                        Verify
                    </button>

                    <div className="text-[14px] font-normal flex justify-center p-2 text-blue-800 items-center">
                        <button className="cursor" type="button" onClick={handleResendOtp}>Resend Otp</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OtpVerify;