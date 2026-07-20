import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

function AddTransaction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    paymentMode: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

   
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN VALUE:", token)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/expense`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },

      );
      toast.success("Transaction added successfully");
      navigate("/Dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to transaction");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-6 bg-[#FAF9F6]">
      <div className="bg-white p-5 rounded border-2 w-full max-w-md hover:bg-gray-100">
        <h1 className="text-center text-2xl mb-2">Add Transaction</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label>
              <strong  className="font-medium">
                title
              </strong>
            </label>
            <input
              type="text"
              placeholder="Enter Date (e.g Burger)"
              autoComplete="off"
              name="title"
              value={formData.title}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label>
              <strong className="font-medium">
                type
              </strong>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
            >
              <option value="expense">expense</option>
              <option value="income">income</option>
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label>
              <strong  className="font-medium">
                Date
              </strong>
            </label>
            <input
              type="date"
              name="date"
              placeholder="Enter Date"
              autoComplete="off"
             
              value={formData.date}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label>
              <strong  className="font-medium ">
                Category
              </strong>
            </label>
            <input
              type="text"
              placeholder="Enter Category"
              autoComplete="off"
              name="category"
              value={formData.category}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label>
              <strong className="font-medium">
                Payment Mode
              </strong>
            </label>
            <select
              type="text"
              placeholder="Enter Payment"
              autoComplete="off"
              value={formData.paymentMode}
              name="paymentMode"
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
               onChange={handleChange}
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
            <label>
              <strong  className="font-medium">
                notes
              </strong>
            </label>
            <input
              type="text"
              placeholder="Enter notes"
              autoComplete="off"
              name="notes"
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
              onChange={handleChange}
              value={formData.notes}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label>
              <strong  className="font-medium">
                Amount
              </strong>
            </label>
            <input
              type="number"
              placeholder="Enter Amount"
              autoComplete="off"
              name="amount"
              value={formData.amount}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full font-sans"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="text-center text-[15px] py-1 px-3 w-full mt-3 mr-1 bg-[#10B981] text-white rounded-xl hover:bg-blue-800">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
