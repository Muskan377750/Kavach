import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [

{ name:"Low", value:35 },

{ name:"Medium", value:30 },

{ name:"High", value:20 },

{ name:"Critical", value:15 }

];

const COLORS = [

"#22C55E",

"#FACC15",

"#F97316",

"#EF4444"

];

function RiskDistributionChart(){

return(

<div className="chart-card">

<h2>🥧 Risk Distribution</h2>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie

data={data}

dataKey="value"

outerRadius={110}

label

>

{

data.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index]}

/>

))

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

);

}

export default RiskDistributionChart;