import React, { useState } from "react";

function Transactions() {
  const [editingItems, setEditingItems] = useState(null);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "13 Jul 2026",
      category: "Food",
      paymentMode: "UPI",
      description: "Pizza Hut",
      amount: -450,
    },
    {
      id: 2,
      date: "12 Jul 2026",
      category: "Shopping",
      paymentMode: "Credit Card",
      description: "Amazon Order",
      amount: -1299,
    },
    {
      id: 3,
      date: "11 Jul 2026",
      category: "Salary",
      paymentMode: "Bank Transfer",
      description: "Monthly Salary",
      amount: 35000,
    },
    {
      id: 4,
      date: "10 Jul 2026",
      category: "Travel",
      paymentMode: "Cash",
      description: "Metro Card Recharge",
      amount: -200,
    },


  ]);

  const handleDelete = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingItems({ ...item });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingItems({ ...editingItems, [name]: value });
  };

  const handleSave = () => {
    setEditingItems(
      transactions.map((item) =>
        item.id === editingItems.id
          ? { ...editingItems, amount: Number(editingItems.amount) } : item
      )
    );
    setEditingItems(null);
  };

  const handleCancle = () => {
    setEditingItems(null);
  }


  return (

    <div className="bg-white rounded-xl shadow-lg overflow-hidden ml-3 p-3 ">

      <div className="px-4 py-2">
        <h2 className="text-2xl text-left font-normal text-gray-500">
          Recent Transactions
        </h2>
      </div>

      <table >

        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-[17px] font-medium">Date</th>
            <th className="px-4 py-2 text-left text-[17px] font-medium">Category</th>
            <th className="px-4 py-2 text-left text-[17px] font-medium">Payment Mode</th>
            <th className="px-4 py-2 text-left text-[17px] font-medium">Description</th>
            <th className="px-4 py-2 text-left text-[17px] font-medium">Amount</th>
            <th className="px-4 py-2 text-left text-[17px] font-medium">Action</th>

          </tr>
        </thead>

        <tbody>

          {transactions.map((item) => (

            <tr
              key={item.id}
              className=" hover:bg-gray-50 transition text-2xl text-[14px] font-normal"
            >
              <td className="px-5 py-4 text-1xl">{item.date}</td>

              <td className="px-5 py-4 text-1xl">{item.category}</td>

              <td className="px-5 py-4 text-1xl">{item.paymentMode}</td>

              <td className="px-5 py-4 text-1xl">{item.description}</td>

              <td
                className={`px-4 py-2 text-left font-semibold ${item.amount > 0
                  ? "text-green-500"
                  : "text-red-500"
                  }`}
              >
                {item.amount > 0 ? "+" : "-"}₹{Math.abs(item.amount)}
                </td>

              <td className="px-5 py-4 text-2xl">{item.Action}
                  <div className="flex w-7 items-center h-3  mt-2">
                    <button onClick={() => handleEdit(item)}><img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20d%3D%22M3%2017.25V21h3.75L18.81%208.94l-3.75-3.75L3%2017.25zm17.71-10.04a1.003%201.003%200%20000-1.42L18.21%203.29a1.003%201.003%200%2000-1.42%200L15.13%204.95l3.75%203.75%201.83-1.49z%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E"></img></button>
                    <button onClick={() => handleDelete(item.id)}><img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%3Cpath%20d%3D%22M3%206h18%22%3E%3C%2Fpath%3E%0A%20%20%3Cpath%20d%3D%22M8%206V4h8v2%22%3E%3C%2Fpath%3E%0A%20%20%3Cpath%20d%3D%22M19%206l-1%2014H6L5%206%22%3E%3C%2Fpath%3E%0A%20%20%3Cpath%20d%3D%22M10%2011v6%22%3E%3C%2Fpath%3E%0A%20%20%3Cpath%20d%3D%22M14%2011v6%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E"></img></button>
                  </div>
                </td>
            </tr>

          ))}

        </tbody>

      </table>



    </div>
  );
}


export default Transactions;