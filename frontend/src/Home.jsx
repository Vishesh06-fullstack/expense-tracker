import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const Home = () => {
  return (
    <>
      <div>
        <Navbar
          heading={"Expense Tracker"}
          a1={"Signup"}
          a2={"Login"}
          width={"w-22"}
          l1={"/Signup"}
          l2={"/Login"}
        />
      </div>

      {/* Main Hero Container - Flex layout switching to 2-col on desktop */}
      <div className="min-h-[calc(100vh-64px)] bg-[#FAF9F6] flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-10 lg:py-0 gap-10">
        
        {/* Left / Bottom Text Content */}
        <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Take Control of Your{" "}
            <span className="text-emerald-500">Finances</span>
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
            Track your income and expenses, monitor your budget, and make
            smarter financial decisions with a clean and intuitive dashboard.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/Signup"
              className="px-8 py-3.5 text-center text-base sm:text-lg font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              Get Started
            </Link>
            <Link
              to="/Login"
              className="px-8 py-3.5 text-center text-base sm:text-lg font-medium border border-gray-300 bg-white hover:bg-gray-50 text-slate-700 rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              Login
            </Link>
          </div>
        </section>

        {/* Right / Top Hero Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src="https://png.pngtree.com/png-clipart/20230923/original/pngtree-budget-planning-and-expense-tracking-app-for-efficient-financial-management-vector-png-image_12734376.png"
            alt="Budget planning illustration"
            className="w-full max-w-md lg:max-w-xl h-auto object-contain drop-shadow-sm hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </div>
    </>
  );
};

export default Home;