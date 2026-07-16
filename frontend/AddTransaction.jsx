import React, { useState } from "react";
import { Link } from 'react-router-dom';


function AddTransaction() {
    const [date, setDate] = useState()
    const [category, setCategory] = useState()
    const [payment, setPayment] = useState()
    const [description, setDescription] = useState()
    const [amount, setAmount] = useState()

    const handleSubmit = (e) => {
        console.log(e);
    }


    return (
        <div className="flex justify-center items-center h-screen pt-6 bg-[#FAF9F6]">
            
                <div className="bg-white p-5 rounded border-2 w-100 h-120 mt-8 ml-8 mr-8 mb-10 hover:bg-gray-100">
                    <h1 className="text-center text-2xl mb-2">Add Transaction</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-4">
                            <lable >
                                <strong htmlfor="date" className="font-medium" >Date: </strong>
                            </lable>
                            <input
                                type="date"
                                placeholder="Enter Date"
                                autoComplete="off"
                                name="date"
                                value={FormDataEvent}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-4">
                            <lable>
                                <strong htmlfor="Category" className="font-medium ">Category: </strong>
                            </lable>
                            <input
                                type="text"
                                placeholder="Enter Category"
                                autoComplete="off"
                                name="name"
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-4" >
                            <lable>
                                <strong htmlfor="paymentmode" className="font-medium">Payment Mode: </strong>
                            </lable>
                            <select
                                type="text"
                                placeholder="Enter Payment"
                                autoComplete="off"
                                value={FormData.paymentmode}
                                name="name"
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
                                onChange={(e) => setPayment(e.target.value)}
                            >
                                <option value="">Select Payment Mode</option>
                                <option value="UPI">UPI</option>
                                <option value="Cash">Cash</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                        </div>

                        <div className="flex flex-col mb-4">
                            <lable>
                                <strong htmlfor="description" className="font-medium">Description: </strong>
                            </lable>
                            <input
                                type="text"
                                placeholder="Enter Description"
                                autoComplete="off"
                                name="name"
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-4" >
                            <lable>
                                <strong htmlfor="amount" className="font-medium">Amount: </strong>
                            </lable>
                            <input
                                type="number"
                                placeholder="Enter Amount"
                                autoComplete="off"
                                name="Number"
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <button className="text-center text-[15px] py-1 px-3 w-full mt-3 mr-1 bg-[#10B981] text-white rounded-xl hover:bg-blue-800">
                            Save
                        </button>
                    </form>               
            </div>
        </div>
    );
}

export default AddTransaction