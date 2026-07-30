import React from 'react'
import { FaExclamation } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
const NoFound = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-white '>
        <div>

            <div className='rounded-full bg-red-500 w-12 h-12 flex items-center justify-center mx-auto '>
                <span className='text-3xl text-gray-400'><FaExclamation/></span>
            </div>
         <h1 className='text-4xl font-bold text-center md:text-2xl text-[16px] text-gray-700 mb-4 '>404 Page Not Found</h1>
         <p className='text-[#780000] md:text-[20px] text-center text-[16px]'>Sorry, the page you are looking for does not exist.</p>


        <div className='mt-20 '>
        <Link to={'/Dashboard'} >
            <p><span className='text-gray-400 cursor-pointer'><FaArrowLeft/></span><span className='text-blue-600  hover:text-blue-800'>DashBoard</span></p>
         </Link>
        </div>
        </div>
    </div>
  )
}
export default NoFound
