import { useState } from "react";
import { Link } from 'react-router-dom';
import Login from "./src/Login";
// import { useNavigate } from "react-router-dom";

function OtpVerify() {
    // const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const handleOtpChange = (e) => {
        const value = e.target.value;

        // Sirf numbers allow karo, aur max 6 digits
        if (/^\d{0,6}$/.test(value)) {
            setOtp(value);
        }


        //value true 
        // navigate("/Login")
    };

    return (
        <div className="flex justify-center items-center h-screen pt-6 bg-[#FAF9F6]">
            <div className="bg-white p-5 rounded border-2 w-90 h-80 hover:bg-gray-100">
                <h2 className="text-center text-2xl mb-2">Otp Verify</h2>

                <form>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={otp}
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
                        <a href="#">Resend Otp</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OtpVerify;