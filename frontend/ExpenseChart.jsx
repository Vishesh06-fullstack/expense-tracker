import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const colors = [
  "#F97316", "#EF4444", "#8B5CF6", "#0EA5E9", "#64748B",
  "#92400E", "#F59E0B", "#10B981", "#3B82F6"
];

export default function ExpenseChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/expense/summary`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        const chartData = response.data.category.map((item) => ({
          name: item._id,      
          value: item.total, 
        }));

        setData(chartData);
        console.log("Hi chartData " , data);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 w-full min-h-[350px] flex flex-col justify-center">
        <h1 className="text-xl sm:text-2xl font-normal text-gray-700 mb-3 text-left">Total Expenses</h1>
        <p className="text-gray-400 text-sm text-center py-8">Loading chart...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 w-full min-h-[350px] flex flex-col justify-center">
        <h1 className="text-xl sm:text-2xl font-normal text-gray-700 mb-3 text-left">Total Expenses</h1>
        <p className="text-gray-400 text-sm text-center py-8">No expenses added yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 w-full flex flex-col">
      <h1 className="text-xl sm:text-2xl font-normal text-gray-700 mb-3 text-left">Total Expenses</h1>

      {/* Responsive Container dynamically takes up parent container spacing */}
      <div className="w-full h-[320px] sm:h-[400px] lg:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>


            <Tooltip 
              formatter={(value , name , props) => [`₹${value.toLocaleString("en-IN")}`, props.payload.name]} 
              contentStyle={{ borderRadius: "8px", border: "1px solid #f3f4f6" }}
            />
            <Legend 
              iconType="circle" 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}