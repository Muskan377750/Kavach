import {
  FiUsers,
  FiAlertTriangle,
  FiActivity,
  FiShield,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";

const cardConfig = {
  users: {
    icon: <FiUsers />,
    color: "#3b82f6",
    bg: "rgba(59,130,246,.15)",
    progress: 86,
  },

  alerts: {
    icon: <FiAlertTriangle />,
    color: "#ef4444",
    bg: "rgba(239,68,68,.15)",
    progress: 72,
  },

  activity: {
    icon: <FiActivity />,
    color: "#10b981",
    bg: "rgba(16,185,129,.15)",
    progress: 94,
  },

  risk: {
    icon: <FiShield />,
    color: "#f59e0b",
    bg: "rgba(245,158,11,.15)",
    progress: 61,
  },

  security: {
    icon: <FiShield />,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,.15)",
    progress: 98,
  },

  uptime: {
    icon: <FiTrendingUp />,
    color: "#22c55e",
    bg: "rgba(34,197,94,.15)",
    progress: 100,
  },
};

function ProgressRing({ progress, color }) {
  const radius = 27;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <svg className="progress-ring" width="70" height="70">
      <circle
        className="ring-bg"
        stroke="#233046"
        strokeWidth="6"
        fill="transparent"
        r={radius}
        cx="35"
        cy="35"
      />

      <circle
        className="ring-progress"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx="35"
        cy="35"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

export default function StatCard({
  title,
  value,
  trend,
  type = "users",
}) {
  const config = cardConfig[type];

  return (
    <div className="stat-card">

      <div className="stat-card-glow"></div>

      <div className="stat-top">

        <div
          className="stat-icon"
          style={{
            background: config.bg,
            color: config.color,
          }}
        >
          {config.icon}
        </div>

        <div className="stat-ring">
          <ProgressRing
            progress={config.progress}
            color={config.color}
          />
          <span>{config.progress}%</span>
        </div>

      </div>

      <div className="stat-content">

        <p className="stat-title">{title}</p>

        <h2 className="stat-value">{value}</h2>

        <div className="stat-bottom">

          <div className="trend-pill">

            <FiArrowUpRight />

            <span>{trend}</span>

          </div>

          <div
            className="pulse-dot"
            style={{
              background: config.color,
            }}
          ></div>

        </div>

      </div>

    </div>
  );
}