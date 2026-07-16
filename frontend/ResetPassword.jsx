import { useState } from "react";
import { Link } from 'react-router-dom';
// import Login from "./src/Login";
// import { useNavigate } from "react-router-dom";

function ResetPassword() {
    // const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState("");

    const handleOtpChange = (e) => {
        const value = e.target.value;

        // Sirf numbers allow karo, aur max 6 digits
        if (/^\d{0,6}$/.test(value)) {
            setOtp(value);
            setOtpError("");
        }


        //value true 
        // navigate("/Login")
    };

    const handleVerifyOtp = () => {
        //  Yahan backend API call honi chahiye (abhi ke liye dummy check)
        // Real project mein: axios.post("/api/verify-otp", { email, otp })
        const correctOtp = "123456"; // dummy - backend se aayega real mein

        if (otp === correctOtp) {
            setOtpVerified(true);
            setOtpError("");
        } else {
            setOtpVerified(false);
            setOtpError("Invalid OTP, try again");
        }
    };

    // Ye function Save (password set) karta hai
    const handleSave = () => {
        if (!password) {
            alert("Password enter karo");
            return;
        }
        console.log("Password saved:", password);
        //  Yahan backend API call hogi password save karne ke liye
    };

    // Button click hone pe decide karo - Verify karna hai ya Save
    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!otpVerified) {
            handleVerifyOtp();
        } else {
            handleSave();
        }
    };


    return (
        <div className="flex justify-center items-center h-screen pt-6 bg-[#FAF9F6]">
            <div className="bg-white p-5 rounded border-2 w-90 h-90 hover:bg-gray-100">
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
                            disabled={otpVerified}
                            className="border border-gray-300 rounded-none px-3 py-2 text-sm w-full"
                        />
                    </div>
                    {/* Error ya Success message */}
                    {otpError && (
                        <p className="text-red-500 text-xs mb-3">{otpError}</p>
                    )}
                    {otpVerified && (
                        <p className="text-green-600 text-xs mb-3">✓ OTP Verified</p>
                    )}


                    <div className="mb-4 flex flex-col">
                        <label htmlFor="email">
                            <strong className="font-medium">Password</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="Password"
                            className="border border-gray-300 rounded-none px-3 py-2 text-sm w-full"
                            disabled={!otpVerified}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>

                    <button
                        type="submit"
                        className="text-center text-[15px] py-1 px-3 w-full mt-2 mr-1 bg-[#10B981] text-white rounded-xl hover:bg-blue-800"
                    >
                        {otpVerified ? "Save" : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;