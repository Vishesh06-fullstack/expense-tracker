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

const data = [
  { month: "Jan", income: 52000, expense: 35000 },
  { month: "Feb", income: 48000, expense: 32000 },
  { month: "Mar", income: 60000, expense: 42000 },
  { month: "Apr", income: 55000, expense: 38000 },
  { month: "May", income: 70000, expense: 50000 },
  { month: "Jun", income: 65000, expense: 45000 },
];

export default function MonthlyIncomeExpenseChart() {
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

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" tick={{ fontSize: 13 }} />

          <YAxis tick={{ fontSize: 13 }} />

          <Tooltip
            formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]}
          />

          <Legend wrapperStyle={{ fontSize: "15px",paddingBottom: "6px" }} />

          <Bar
            dataKey="income"
            name="Income"
            fill="#22C55E"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="expense"
            name="Expense"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}