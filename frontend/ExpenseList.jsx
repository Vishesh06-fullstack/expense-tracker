import React, { useEffect, useState } from "react";
import axios from "axios";

const colors = [
  "#F97316", "#EF4444", "#8B5CF6", "#0EA5E9", "#64748B",
  "#92400E", "#F59E0B", "#10B981", "#3B82F6"
];

export default function ExpenseList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/v1/expense/summary",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const categoryData = response.data.category
          .map((item) => ({ name: item._id, value: item.total }))
          .sort((a, b) => b.value - a.value);

        setData(categoryData);
      } catch (error) {
        console.error("failed to fetch chart data: ", error);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white shadow-md rounded-xl p-5 sm:p-6 w-full flex flex-col">
      <h2 className="text-xl sm:text-2xl font-normal text-gray-700 mb-4 text-left">Categories</h2>

      {loading ? (
        <p className="text-gray-400 text-sm text-center py-8">Loading categories...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">No expenses added yet</p>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[450px] pr-1">
          {data.map((item, index) => {
            const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
            const color = colors[index % colors.length];

            return (
              <div key={index} className="group text-left">
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    ></span>
                    <p className="text-sm font-medium text-gray-700 truncate">{item.name}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 ml-2 whitespace-nowrap">
                    ₹{item.value.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%`, backgroundColor: color }}
                  ></div>
                </div>

                <p className="text-xs text-gray-400 mt-1">{percent}% of total</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}