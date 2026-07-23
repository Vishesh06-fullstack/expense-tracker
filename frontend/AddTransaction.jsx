import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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

      await axios.post(
        `${import.meta.env.VITE_API_URL}/expense`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Transaction added successfully");
      navigate("/Dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add transaction");
    }
  };

  const fieldAnimation = (delay) => ({
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay, duration: 0.35 },
  });

  const inputStyle =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-emerald-400 bg-white";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 flex justify-center items-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-gray-800 mb-8"
        >
          Add Transaction
        </motion.h1>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <motion.div {...fieldAnimation(0.2)} className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title (e.g Burger)"
              autoComplete="off"
              value={formData.title}
              onChange={handleChange}
              className={inputStyle}
            />
          </motion.div>

          {/* Type */}
          <motion.div {...fieldAnimation(0.3)} className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </motion.div>

          {/* Date */}
          <motion.div {...fieldAnimation(0.4)} className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputStyle}
            />
          </motion.div>

          {/* Category */}
          <motion.div {...fieldAnimation(0.5)} className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              autoComplete="off"
              value={formData.category}
              onChange={handleChange}
              className={inputStyle}
            />
          </motion.div>

          {/* Payment Mode */}
          <motion.div {...fieldAnimation(0.6)} className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Payment Mode
            </label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="">Select Payment Mode</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </motion.div>

          {/* Notes */}
          <motion.div {...fieldAnimation(0.7)} className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Notes
            </label>
            <input
              type="text"
              name="notes"
              placeholder="Enter Notes"
              autoComplete="off"
              value={formData.notes}
              onChange={handleChange}
              className={inputStyle}
            />
          </motion.div>

          {/* Amount */}
          <motion.div {...fieldAnimation(0.8)} className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              autoComplete="off"
              value={formData.amount}
              onChange={handleChange}
              className={inputStyle}
            />
          </motion.div>

          {/* Button */}
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 15px 30px rgba(16,185,129,0.35)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            Save Transaction
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default AddTransaction;