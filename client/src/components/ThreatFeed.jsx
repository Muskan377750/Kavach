import {
  FiAlertTriangle,
  FiClock,
  FiMapPin,
  FiChevronRight,
  FiRadio,
} from "react-icons/fi";

import "../styles/threatFeed.css";

const severityConfig = {
  Critical: {
    className: "critical",
    label: "Critical",
  },
  High: {
    className: "high",
    label: "High",
  },
  Medium: {
    className: "medium",
    label: "Medium",
  },
  Low: {
    className: "low",
    label: "Low",
  },
};

function formatTime(time) {
  if (!time) return "Just now";

  try {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return time;
  }
}

function ThreatFeed({ alerts = [], onViewAlert }) {
  if (!alerts.length) {
    return (
      <div className="threat-empty">
        <div className="threat-empty-icon">
          <FiAlertTriangle />
        </div>

        <h3>No Active Threats</h3>

        <p>
          All monitored banking systems are operating normally. No suspicious
          activity detected.
        </p>
      </div>
    );
  }

  return (
    <div className="threat-feed-card">
      <div className="threat-feed-header">
        <div>
          <h2>Live Threat Activity</h2>

          <p>Real-time suspicious events from across the banking network</p>
        </div>

        <div className="live-indicator">
          <FiRadio />
          LIVE
        </div>
      </div>

      <div className="threat-feed">
        {alerts.slice(0, 8).map((alert, index) => {
          const severity =
            severityConfig[alert.severity || alert.riskLevel] ||
            severityConfig.Low;

          return (
            <div
              className="threat-item"
              key={alert.id || alert._id || index}
              onClick={() => onViewAlert(alert)}
            >
              <div className={`severity-line ${severity.className}`} />

              <div className="threat-content">
                <div className="threat-top">
                  <div>
                    <h4>{alert.title || alert.alertType}</h4>

                    <p>{alert.description || alert.message}</p>
                  </div>

                  <span className={`severity-badge ${severity.className}`}>
                    {severity.label}
                  </span>
                </div>

                <div className="threat-footer">
                  <span>
                    <FiClock />
                    {formatTime(alert.createdAt || alert.time)}
                  </span>

                  <span>
                    <FiMapPin />
                    {alert.location || alert.user?.department || "Head Office"}
                  </span>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ThreatFeed;
