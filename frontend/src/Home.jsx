
import Navbar from '../Navbar'

const Home = () => {
  return (
    <>
      <div>
        <Navbar heading={"Expense Tracker"} a1={"Signup"} a2={"Login"} width={"w-22"} l1={'/Signup'} l2={'/Login'} />
      </div>


      <div className=" grid grid-cols-2">
        <section className=" px-8 min-h-screen flex flex-col justify-center bg-[#FAF9F6]">
          <h1 className="text-5xl font-bold text-slate-900">
            Take Control of Your
            <span className="text-emerald-500"> Finances</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-600">
            Track your income and expenses, monitor your budget, and make
            smarter financial decisions with a clean and intuitive dashboard.
          </p>

          <div className="mt-5 flex gap-4">
            <button className="px-5 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition">
              <a href='/Signup'>Get Started</a>
              
            </button>
          </div>
        </section>

        <div>
          <img src='https://png.pngtree.com/png-clipart/20230923/original/pngtree-budget-planning-and-expense-tracking-app-for-efficient-financial-management-vector-png-image_12734376.png' className='h-105'></img>
        </div>
      </div>
    </>
  )
}

export default Home