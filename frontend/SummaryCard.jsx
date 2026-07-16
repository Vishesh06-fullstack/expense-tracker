export default function SmartCard({
  title,
  amount,
  color,
  img,
  h,
}) {
  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-1xl p-2 text-left w-55 h-25 flex justify-around ">

      <div>
        <h1 className={`text-2xl font-bold ${color}`}>
          {amount}
        </h1>

        <p className="text-[#1E293B] text-1xl mt-1">
          {title}
        </p>
      </div>
      
      <div>
        <img src={img} className={`${h}`}/>
      </div>



    </div>
  );
}