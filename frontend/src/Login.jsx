import { useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../Navbar";
import OtpVerify from "../OtpVerify";
import ResetPassword from "../ResetPassword";


// import {useNavigate} from "react-router-dom"

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    // const navigate=useNavigate()

    const handleSubmit = (e) => {
        console.log(e);
        //   e.preventDefault()  
    }

    return (
        <>
        <div>
                <Navbar heading={"Expense Tracker"} a1={"Signup"} a2={"Login"} width={"w-22"} l1={'/Signup'} l2={'/Login'} />
            </div>
            <div className="flex justify-center items-center h-screen pt-6 bg-[#FAF9F6] ">
                
                    <div className="bg-white p-5 rounded border-2 w-90 h-80 hover:bg-gray-100">
                        <h2 className="text-center text-2xl mb-2">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 flex flex-col">
                                <label htmlFor="email">
                                    <strong className="font-medium">Email </strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    autoComplete="off"
                                    name="email"
                                    className="form-control rounded-none"
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                            </div>
                            <div className="mb-4 flex flex-col">
                                <label htmlFor="email">
                                    <strong className="font-medium">Password</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Password"
                                    autoComplete="off"
                                    name="Password"
                                    className="form-control rounded-none"
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                            </div>
                            <button type="submit" className="text-center text-[15px] py-1 px-3 w-full mt-3 mr-1 bg-[#10B981] text-white rounded-xl hover:bg-blue-800">
                                Login
                            </button>
                            <div className="text-[14px] font-normal flex justify-center p-2 text-blue-800 items-center">
                                <a href="/ResetPassword">Forget Password</a>
                            </div>

                            <div className="p-1">
                                <p className="text-[15px]">Already Have an Account ? <a href="/Signup" className="text-blue-800">Signup</a></p>
                            </div>



                        </form>
                    </div>

                    

            </div>
        </>
    )
}

export default Login