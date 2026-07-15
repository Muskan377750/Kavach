import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", threats: 5 },
  { day: "Tue", threats: 8 },
  { day: "Wed", threats: 6 },
  { day: "Thu", threats: 11 },
  { day: "Fri", threats: 9 },
  { day: "Sat", threats: 4 },
  { day: "Sun", threats: 3 },
];

function ThreatTrendChart() {
  return (
    <div className="chart-card">

      <h2>📈 Weekly Threat Trend</h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="threats"
            stroke="#2563EB"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ThreatTrendChart;