const list = [
["🟤Mortgage","6000"],
["🟠Food","4866"],
["🟡Utilities","4160"],
["🔴Bills","3960"],
["🟣Shopping","3375"],
["🔵Transportation","3230"],
["🟢Insurance","2890"],
["🔵Health Care","2480"],
["⚫Other","10"]
];

export default function ExpenseList(){

return(

<div className="bg-white shadow rounded-xl p-5 mr-5">

<h2 className="text-1xl font-normal mb-2">
Categories
</h2>

{list.map((item,index)=>(

<div
key={index}
className="flex justify-between text-[12px] py-1.5 border-b border-gray-400"
>

<span>{item[0]}</span>

<span>${item[1]}</span>

</div>

))}

</div>

)

}