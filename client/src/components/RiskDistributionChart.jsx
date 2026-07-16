import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import {
  FiShield,
} from "react-icons/fi";

import "../styles/charts.css";

function RiskDistributionChart() {

  const data = [
    {
      name: "Low Risk",
      value: 62,
      color: "#22C55E",
    },
    {
      name: "Medium Risk",
      value: 24,
      color: "#F59E0B",
    },
    {
      name: "High Risk",
      value: 10,
      color: "#EF4444",
    },
    {
      name: "Critical",
      value: 4,
      color: "#7C3AED",
    },
  ];

  return (

    <div className="chart-card">

      {/* ===========================
          HEADER
      =========================== */}

      <div className="chart-top">

        <div>

          <h3>

            <FiShield />

            Risk Distribution

          </h3>

          <p>

            Current employee risk classification

          </p>

        </div>

        <div className="chart-status">

          ACTIVE

        </div>

      </div>

      {/* ===========================
          CHART
      =========================== */}

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={3}
            animationDuration={1200}
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={entry.color}
              />

            ))}

          </Pie>

          <Tooltip
            contentStyle={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "14px",
              color: "#fff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
          />

        </PieChart>

      </ResponsiveContainer>

      {/* ===========================
          FOOTER
      =========================== */}

      <div className="chart-footer">

        <div>

          <strong>100%</strong>

          <span>Total Employees</span>

        </div>

        <div>

          <strong>4%</strong>

          <span>Critical Risk</span>

        </div>

        <div>

          <strong>62%</strong>

          <span>Low Risk</span>

        </div>

      </div>

    </div>

  );

}

export default RiskDistributionChart;