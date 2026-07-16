// import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SummaryCard from "./SummaryCard";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";
import Transactions from "./Transactions";
import MonthlyIncomeExpenseChart from "./MonthlyIncomeExpenseChart";
import Footer from "./Footer";

export default function Dashboard({display}) {
  return (
    // <div className="flex">

    //   <Sidebar />

    <div className="flex-1  bg-[#FAF9F6]">
<div >
      <Navbar heading={"Dashboard"} a1={"Add Transaction"} l1={"/AddTransaction"} a2={"Logout"} w={"w-3"} image={"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%3Cpath%20d%3D%22M9%2021H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h4%22%3E%3C%2Fpath%3E%0A%20%20%3Cpolyline%20points%3D%2216%2017%2021%2012%2016%207%22%3E%3C%2Fpolyline%3E%0A%20%20%3Cline%20x1%3D%2221%22%20y1%3D%2212%22%20x2%3D%229%22%20y2%3D%2212%22%3E%3C%2Fline%3E%0A%3C%2Fsvg%3E"} />
</div>
      {/* Cards */}

      <div className="flex justify-around gap-1 ml-3 mr-3 mt-10 py-9">

        <SummaryCard
          title="Income"
          amount="$43,300"
          color="text-blue-500"
          h={"h-26"}
          img={"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%20%20%3Crect%20x%3D%2210%22%20y%3D%2216%22%20width%3D%2244%22%20height%3D%2232%22%20rx%3D%226%22%20fill%3D%22%2322C55E%22%3E%3C%2Frect%3E%0A%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%228%22%20fill%3D%22%23FFFFFF%22%3E%3C%2Fcircle%3E%0A%20%20%3Ctext%20x%3D%2232%22%20y%3D%2237%22%20text-anchor%3D%22middle%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20fill%3D%22%2316A34A%22%3E%24%3C%2Ftext%3E%0A%3C%2Fsvg%3E"}
        />

        <SummaryCard
          title="Expenses"
          amount="$38,060"
          color="text-pink-500"
          h={"h-25"}
          img={"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%2230%22%20fill%3D%22%23FEE2E2%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M18%2022l12%2012%208-8%2012%2016%22%20fill%3D%22none%22%20stroke%3D%22%23EF4444%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%3Cpath%20d%3D%22M44%2042h8v-8%22%20fill%3D%22none%22%20stroke%3D%22%23EF4444%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E"}
        />

        <SummaryCard
          title="Balance"
          amount="$5,240"
          color="text-green-500"
          h={"h-25"}
          img={"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%2230%22%20fill%3D%22%23DBEAFE%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M16%2024L32%2016L48%2024V28H16V24Z%22%20fill%3D%22%233B82F6%22%3E%3C%2Fpath%3E%0A%20%20%3Crect%20x%3D%2218%22%20y%3D%2228%22%20width%3D%224%22%20height%3D%2214%22%20fill%3D%22%232563EB%22%3E%3C%2Frect%3E%0A%20%20%3Crect%20x%3D%2228%22%20y%3D%2228%22%20width%3D%224%22%20height%3D%2214%22%20fill%3D%22%232563EB%22%3E%3C%2Frect%3E%0A%20%20%3Crect%20x%3D%2238%22%20y%3D%2228%22%20width%3D%224%22%20height%3D%2214%22%20fill%3D%22%232563EB%22%3E%3C%2Frect%3E%0A%20%20%3Crect%20x%3D%2214%22%20y%3D%2242%22%20width%3D%2236%22%20height%3D%224%22%20fill%3D%22%233B82F6%22%3E%3C%2Frect%3E%0A%3C%2Fsvg%3E"}
        />

        <SummaryCard
          title="Transactions"
          amount="1,284"
          color="text-cyan-500"
          h={"h-25"}
          img={"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%3E%0A%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%2230%22%20fill%3D%22%23E0F2FE%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M18%2026h20l-5-5%22%20fill%3D%22none%22%20stroke%3D%22%230EA5E9%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%3Cpath%20d%3D%22M46%2038H26l5%205%22%20fill%3D%22none%22%20stroke%3D%22%230EA5E9%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E"}
        />

      </div>

      <div className="grid grid-cols-3 gap-4 mt-2">

        <div className="col-span-2">
          <ExpenseChart />
        </div>

        <ExpenseList />

      </div>
      <div className="grid grid-cols-2 gap-1 items-center mt-8 ml-3 mr-3 bg-[#FAF9F6]">
        <Transactions />
         <MonthlyIncomeExpenseChart/>
      </div>

     

      <div>
        <Footer/>
      </div>

    </div>

    // </div>
  );
}