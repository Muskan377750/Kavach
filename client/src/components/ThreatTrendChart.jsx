import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

import "../styles/charts.css";

function ThreatTrendChart() {

  const data = [
    { day: "Mon", threats: 12 },
    { day: "Tue", threats: 19 },
    { day: "Wed", threats: 8 },
    { day: "Thu", threats: 25 },
    { day: "Fri", threats: 18 },
    { day: "Sat", threats: 30 },
    { day: "Sun", threats: 22 },
  ];

  const totalThreats = data.reduce(
    (sum, item) => sum + item.threats,
    0
  );

  const peakThreat = Math.max(
    ...data.map(item => item.threats)
  );

  return (

    <div className="chart-card">

      {/* ===========================
          HEADER
      =========================== */}

      <div className="chart-top">

        <div>

          <h3>

            <FiTrendingUp />

            Threat Activity Trend

          </h3>

          <p>
            Real-time threat detections over the last 7 days
          </p>

        </div>

        <div className="chart-status">

          <span className="live-dot"></span>

          LIVE

        </div>

      </div>

      {/* ===========================
          CHART
      =========================== */}

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -15,
            bottom: 0,
          }}
        >

          <defs>

            <linearGradient
              id="threatGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#3B82F6"
                stopOpacity={0.45}
              />

              <stop
                offset="100%"
                stopColor="#3B82F6"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              stroke: "#3B82F6",
              strokeDasharray: "3 3",
            }}
            contentStyle={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "14px",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="threats"
            fill="url(#threatGradient)"
            stroke="none"
            animationDuration={1200}
          />

          <Line
            type="monotone"
            dataKey="threats"
            stroke="#3B82F6"
            strokeWidth={4}
            dot={{
              r: 5,
              fill: "#3B82F6",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
            }}
            animationDuration={1200}
          />

        </AreaChart>

      </ResponsiveContainer>

      {/* ===========================
          FOOTER
      =========================== */}

      <div className="chart-footer">

        <div>

          <strong>

            {totalThreats}

          </strong>

          <span>Total Threats</span>

        </div>

        <div>

          <strong>

            {peakThreat}

          </strong>

          <span>Peak Detection</span>

        </div>

        <div>

          <strong>

            <FiActivity />

            Live

          </strong>

          <span>Monitoring Active</span>

        </div>

      </div>

    </div>

  );
}

export default ThreatTrendChart;