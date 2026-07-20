import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function MonthlyIncomeExpenseChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMonthDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/expense/summary`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const rawTrend = response.data.monthlyTrend;

        // Step 1: month+year ke hisaab se group karo, income/expense merge karo
        const grouped = {};
        rawTrend.forEach((item) => {
          const key = `${item._id.year}-${item._id.month}`; // unique key per month

          if (!grouped[key]) {
            grouped[key] = {
              month: monthNames[item._id.month - 1], // 1-indexed hai backend se, isliye -1
              income: 0,
              expense: 0,
            };
          }
          grouped[key][item._id.type] = item.total; // 'income' ya 'expense' key pe daal do
        });
        
        // Step 2: object ko array mein convert karo (Recharts array chahta hai)
        const chartData = Object.values(grouped);

        setData(chartData); 

        console.log(data);
        console.log("Hi ji" ,data.expense)
        console.log("Hi ji" ,data.income)
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMonthDetails();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-2 w-full h-80">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Monthly Income vs Expense
        </h2>
        <p className="text-sans text-gray-500">
          Compare your monthly income and expenses.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading chart...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-400 text-sm">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="month" tick={{ fontSize: 13 }} />
            <YAxis tick={{ fontSize: 13 }} />
            <Tooltip
              formatter={(value) => [`₹${value.toLocaleString()}`,]}
            />
            <Legend wrapperStyle={{ fontSize: "15px", paddingBottom: "6px" }} />
            <Bar dataKey="income" name="Income" fill="#22C55E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name="Expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}