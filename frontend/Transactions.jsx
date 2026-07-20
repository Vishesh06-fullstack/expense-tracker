import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Transactions() {
  const [editingItems, setEditingItems] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getLastData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/expense",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLastData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions((prev) => prev.filter((item) => item._id !== id));
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("Failed to Delete");
    }
  };

  const handleEdit = (item) => {
    setEditingItems({ ...item });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingItems({ ...editingItems, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/expense/${editingItems._id}`,
        editingItems,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTransactions((prev) =>
        prev.map((item) =>
          item._id === editingItems._id ? response.data.expense : item
        )
      );
      toast.success("Successfully Updated");
      setEditingItems(null);
    } catch (error) {
      toast.error("Failed to Update");
    }
  };

  const handleCancel = () => {
    setEditingItems(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 sm:p-5 w-full">
      <div className="pb-3 border-b border-gray-100 mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 text-left">
          Recent Transactions
        </h2>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm py-8 text-center">Loading Transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-400 text-sm py-8 text-center">No Transactions yet...</p>
      ) : (
        <>
          {/* 1. MOBILE RESPONSIVE LIST VIEW (Shows on smaller viewports, hidden on large screens) */}
          <div className="block lg:hidden space-y-3">
            {transactions.map((item) => (
              <div 
                key={item._id} 
                className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col gap-2 text-left"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-base">{item.title}</h4>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium inline-block mt-1">
                      {item.category}
                    </span>
                  </div>
                  <span className={`font-bold text-base ${item.type === "income" ? "text-green-500" : "text-red-500"}`}>
                    {item.type === "income" ? "+" : "-"}₹{Math.abs(item.amount)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                  <div>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{item.paymentMode}</span>
                  </div>
                  <div className="flex gap-3 text-base">
                    <button onClick={() => handleEdit(item)} className="hover:scale-110 transition">✏️</button>
                    <button onClick={() => handleDelete(item._id)} className="hover:scale-110 transition">🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. DESKTOP TABLE VIEW (Hidden on mobile, displays smoothly on lg viewports) */}
          <div className="hidden lg:block overflow-x-auto w-full">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-600 uppercase tracking-wider">Payment Mode</th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {transactions.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50/70 transition text-[14px] text-gray-700"
                  >
                    <td className="px-4 py-3.5 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-gray-500">{item.paymentMode}</td>
                    <td className="px-4 py-3.5 font-medium">{item.title}</td>
                    <td
                      className={`px-4 py-3.5 whitespace-nowrap font-bold ${
                        item.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"}₹{Math.abs(item.amount)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3 text-base">
                        <button onClick={() => handleEdit(item)} className="hover:opacity-70 transition">✏️</button>
                        <button onClick={() => handleDelete(item._id)} className="hover:opacity-70 transition">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* EDIT MODAL */}
      {editingItems && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white p-5 sm:p-6 rounded-xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-left">
              Edit Transaction
            </h3>

            <div className="flex flex-col gap-3 text-left">
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-500 mb-1">Title</label>
                <input
                  name="title"
                  value={editingItems.title}
                  onChange={handleEditChange}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-500 mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={editingItems.amount}
                  onChange={handleEditChange}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-500 mb-1">Category</label>
                <input
                  name="category"
                  value={editingItems.category}
                  onChange={handleEditChange}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-500 mb-1">Type</label>
                <select
                  name="type"
                  value={editingItems.type}
                  onChange={handleEditChange}
                  className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-500 mb-1">Payment Mode</label>
                <select
                  name="paymentMode"
                  value={editingItems.paymentMode}
                  onChange={handleEditChange}
                  className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-500 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={
                    editingItems.date
                      ? new Date(editingItems.date).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleEditChange}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-500 mb-1">Notes</label>
                <input
                  name="notes"
                  value={editingItems.notes || ""}
                  onChange={handleEditChange}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-[#10B981] text-white py-2 rounded-xl text-sm font-medium hover:bg-emerald-600 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;