import { Link } from "react-router-dom";

export default function Navbar({ heading, a1, a2, l1, l2, width, image ,w }) {
  return (
    <div className="flex justify-between bg-[#0F172A] h-10 p-1.5 fixed top-0 w-full z-10">

      <h1 className="text-1xl text-white">
        {/* Dashboard */}
        {heading}
      </h1>


      <div className="flex items-center gap 1">
        <Link to={l1}>
          <button className={`text-center text-[12px] py-1 ${width} px-3  mr-1 bg-[#10B981] text-white rounded-xl hover:bg-blue-800`}>
            {a1}
          </button>
        </Link>

        
          <Link to={l2}>
            <button className="flex justify-center items-center gap-1 text-center text-[12px] py-1 w-20 px-3  mr-1 bg-[#10B981] text-white rounded-xl hover:bg-blue-800">
              {a2}<img src={image} className={`${w} `}></img>
            </button>

          </Link>
          
        

      </div>

    </div>
  );
}