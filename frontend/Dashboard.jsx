import React from "react";
// import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SummaryCard from "./SummaryCard";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";
import Transactions from "./Transactions";
import MonthlyIncomeExpenseChart from "./MonthlyIncomeExpenseChart";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Dashboard({ display }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [data, setData] = useState({
    totalExpense: 0,
    totalIncome: 0,
    totalBalance: 0,
    transactionCount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopNav = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/expense/summary`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setData((prev) => ({
          ...prev,
          totalExpense: response.data.totalExpense,
          transactionCount: response.data.transactionCount,
          totalIncome: response.data.totalIncome,
          totalBalance: response.data.balance,
        }));
      } catch (error) {
        console.error("failed to load", error);
      } finally {
        setLoading(false);
      }
    };
    getTopNav();
  }, []);

  return (
    // pb-12 creates space at the bottom so the fixed footer doesn't block the UI content
    <div className="flex-1 min-h-screen bg-[#FAF9F6] pb-12">
      <Navbar
        heading={"Dashboard"}
        a1={"Add Transaction"}
        l1={"/AddTransaction"}
        a2={"Logout"}
        w={"w-3"}
        onLogoutClick={handleLogout}
        image={
          "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%3Cpath%20d%3D%22M9%2021H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h4%22%3E%3C%2Fpath%3E%0A%20%20%3Cpolyline%20points%3D%2216%2017%2021%2012%2016%207%22%3E%3C%2Fpolyline%3E%0A%20%20%3Cline%20x1%3D%2221%22%20y1%3D%2212%22%20x2%3D%229%22%20y2%3D%2212%22%3E%3C%2Fline%3E%0A%3C%2Fsvg%3E"
        }
      />

     
      <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
        <div className="mt-1 lg:mt-10">
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <SummaryCard
            title="Income"
            amount={data.totalIncome}
            color="text-blue-500"
            h={"h-25"}
            img={"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%20%20%3Crect%20x%3D%2210%22%20y%3D%2216%22%20width%3D%2244%22%20height%3D%2232%22%20rx%3D%226%22%20fill%3D%22%2322C55E%22%3E%3C%2Frect%3E%0A%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%228%22%20fill%3D%22%23FFFFFF%22%3E%3C%2Fcircle%3E%0A%20%20%3Ctext%20x%3D%2232%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20fill%3D%22%2316A34A%22%3E%24%3C%2Ftext%3E%0A%3C%2Fsvg%3E"}
          />
          <SummaryCard
            title="Expenses"
            amount={data.totalExpense}
            color="text-pink-500"
            h={"h-25"}
            img={"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%2230%22%20fill%3D%22%23FEE2E2%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M18%2022l12%2012%208-8%2012%2016%22%20fill%3D%22none%22%20stroke%3D%22%23EF4444%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%3Cpath%20d%3D%22M44%2042h8v-8%22%20fill%3D%22none%22%20stroke%3D%22%23EF4444%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E"}
          />
          <SummaryCard
            title="Balance"
            amount={data.totalBalance}
            color="text-green-500"
            h={"h-25"}
            img={
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect x='10' y='18' width='44' height='28' rx='6' fill='%232563EB'/%3E%3Crect x='34' y='26' width='20' height='12' rx='3' fill='%231D4ED8'/%3E%3Ccircle cx='46' cy='32' r='2.5' fill='white'/%3E%3Cpath d='M18 14h22a4 4 0 014 4H18a4 4 0 010-8h18' fill='%2360A5FA'/%3E%3C/svg%3E"
}
            
          />
          <SummaryCard
            title="Transactions"
            amount={data.transactionCount}
            color="text-cyan-500"
            h={"h-25"}
            img={"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%2230%22%20fill%3D%22%23E0F2FE%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M18%2026h20l-5-5%22%20fill%3D%22none%22%20stroke%3D%22%230EA5E9%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%3Cpath%20d%3D%22M46%2038H26l5%205%22%20fill%3D%22none%22%20stroke%3D%22%230EA5E9%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E"}
          />
        </div>
        </div>
        
        {/* Summary Cards Grid */}
       

        {/* Charts & Lists Main Section */}
        <div className="grid grid-cols-12 gap-5 mt-6">
          <div className="col-span-12 lg:col-span-8">
            <ExpenseChart />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <ExpenseList />
          </div>
        </div>

        {/* Transactions & Monthly Chart Row */}
        {/* Changed grid-cols-2 to grid-cols-1 lg:grid-cols-2 so it stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6 items-start">
          <Transactions />
          <MonthlyIncomeExpenseChart />
        </div>

      </div>

      <Footer />
    </div>
  );
}