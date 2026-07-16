import {
PieChart,
Pie,
Cell,
Tooltip
} from "recharts";

const data = [
{ name:"Food", value:400 },
{ name:"Bills", value:300 },
{ name:"Shopping", value:200 },
{ name:"Travel", value:250 },
{ name:"Others", value:100 },
{ name:"Mortgage", value:500 },
{ name:"Utilities", value:600 },
{ name:"Insurance", value:700 },
{ name:"Health Care", value:800 }

];

const colors = [
"#F97316",
"#EF4444",
"#8B5CF6",
"#0EA5E9",
"#64748B",
"#92400E",
"#F59E0B",
"#10B981",
"#3B82F6"
];

export default function ExpenseChart(){

return(

<div className="bg-white rounded-xl shadow p-6 pt-8  ml-5">

<h1 className="text-2xl font-normal mb-3">
Total Expenses
</h1>

<PieChart width={900} height={530}>

<Pie
data={data}
innerRadius={150}
outerRadius={200}
dataKey="value"
label={({ name }) => name}
>

{data.map((entry,index)=>(
<Cell
key={index}
fill={colors[index]}
className="flex justify-between"
/>
))}

</Pie>

<Tooltip/>

</PieChart>

</div>

)

}