import { useState } from "react";
import {Link} from 'react-router-dom';
import Navbar from "../Navbar";


function Signup(){
    const [name, setName]=useState()
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()

    const handleSubmit = (e) =>{
        console.log(e);
    //   e.preventDefault()  
    }

    return(
        <>
        <div>
                <Navbar heading={"Expense Tracker"} a1={"Signup"} a2={"Login"} width={"w-22"} l1={'/Signup'} l2={'/Login'} />
            </div>
        <div className="flex justify-center items-center h-screen pt-6 bg-[#FAF9F6]">
            <div className="grid grid-cols-2">
            <div className="bg-white p-5 rounded border-2 max-w-2/3 hover:bg-gray-100">
                <h2 className="text-center mb-2">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email">
                            <strong className="font-normal">Name</strong>
                        </label>
                        <input 
                        type="text"
                        placeholder="Enter Name"
                        autoComplete="off"
                        name="name "
                        className="form-control rounded-none"
                        onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">
                            <strong className="font-normal">Email</strong>
                        </label>
                        <input 
                        type="text"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-none"
                        onChange={(e)=> setEmail(e.target.value)}

                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">
                            <strong className="font-normal">Password</strong>
                        </label>
                        <input 
                        type="text"
                        placeholder="Enter Password"
                        autoComplete="off"
                        name="Password"
                        className="form-control rounded-none"
                        onChange={(e)=> setPassword(e.target.value)}

                        />
                    </div>
                    <button type="submit" className="btn bg-emerald-500 w-full rounded-none">
                        Signup
                    </button>
                    <p className="text-[12px] mt-2">Already Have an Account ? <a href="/Login" className="text-blue-800">Login</a></p>
                    
                    
                </form>
            </div>
            <div>
                <img src="https://moneypatrol.com/moneytalk/wp-content/uploads/2023/07/budget684.png"></img>
            </div>
            </div>
        </div>
        </>
    )
}

export default Signup