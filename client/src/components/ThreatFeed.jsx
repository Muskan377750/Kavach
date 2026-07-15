import {
  FaExclamationTriangle,
  FaClock,
  FaUserShield,
  FaChevronRight,
} from "react-icons/fa";

import "../styles/dashboard.css";
import useAlerts from "../hooks/useAlerts";

function ThreatFeed() {
  const { alerts, loading, error } = useAlerts();

  if (loading) {
    return (
      <div className="threat-feed">
        <h2>🚨 Live Threat Feed</h2>
        <p>Loading threats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="threat-feed">
        <h2>🚨 Live Threat Feed</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="threat-feed">

      <div className="feed-header">

        <h2>🚨 Live Threat Feed</h2>

        <span className="live-indicator">
          ● LIVE
        </span>

      </div>

      {alerts.length === 0 ? (
        <div className="empty-feed">
          ✅ No threats detected
        </div>
      ) : (
        alerts.slice(0, 6).map((alert) => (
          <div className="threat-card" key={alert._id}>

            <div className="threat-icon-box">

              <FaExclamationTriangle />

            </div>

            <div className="threat-content">

              <div className="threat-title">

                <h3>{alert.alertType}</h3>

                <span
                  className={`risk-badge ${alert.riskLevel.toLowerCase()}`}
                >
                  {alert.riskLevel}
                </span>

              </div>

              <div className="employee-info">

                <FaUserShield />

                <span>

                  {alert.user?.name || "Unknown Employee"}

                </span>

              </div>

              <p>{alert.message}</p>

              <div className="threat-footer">

                <span>

                  <FaClock />

                  {new Date(alert.createdAt).toLocaleString()}

                </span>

                <FaChevronRight />

              </div>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default ThreatFeed;