export default function SmartCard({
  title,
  amount,
  color,
  img,
  h,
}) {
  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-1xl p-3 text-left w-75 h-35 flex justify-around ">

      <div>
        <h1 className={`text-4xl font-bold ${color}`}>
          {amount}
        </h1>

        <p className="text-[#1E293B] text-2xl mt-2">
          {title}
        </p>
      </div>
      
      <div>
        <img src={img} className={`${h}`}/>
      </div>



    </div>
  );
}