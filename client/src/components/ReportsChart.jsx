import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function ReportsChart({ data }) {

  return (

    <div className="chart-wrapper">

      <h3>
        📊 Department Wise Threat Analysis
      </h3>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="department" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="threats"
            fill="#2563EB"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ReportsChart;