import { useEffect, useState } from "react";
import axios from "axios";
import {motion} from "framer-motion";
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
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{
      y: -4,
      boxShadow: "0px 18px 35px rgba(0,0,0,0.08)",
    }}
    className="bg-white rounded-3xl border border-gray-200 shadow-lg p-5 w-full h-[380px] transition-all"
  >
    {/* Header */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-5"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Monthly Income vs Expense
      </h2>

      <p className="text-gray-500 mt-1 text-sm">
        Compare your monthly income and expenses.
      </p>
    </motion.div>

    {/* Loading */}
    {loading ? (
      <motion.div
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
        }}
        className="flex justify-center items-center h-[260px]"
      >
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    ) : data.length === 0 ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-[260px]"
      >
        <p className="text-gray-400 text-lg">
          No data available 📊
        </p>
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="h-[280px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 13 }}
            />

            <YAxis
              tick={{ fontSize: 13 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,.12)",
              }}
              formatter={(value) => [
                `₹${value.toLocaleString()}`,
              ]}
            />

            <Legend
              wrapperStyle={{
                fontSize: "14px",
                paddingTop: "8px",
              }}
            />

            <Bar
              dataKey="income"
              fill="#22C55E"
              name="Income"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />

            <Bar
              dataKey="expense"
              fill="#EF4444"
              name="Expense"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    )}
  </motion.div>
);
}