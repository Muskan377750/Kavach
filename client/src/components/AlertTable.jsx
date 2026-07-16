import {
  FiAlertTriangle,
  FiUser,
  FiClock,
  FiChevronRight,
  FiMapPin,
  FiHash,
} from "react-icons/fi";

import "../styles/alertTable.css";

const severityColors = {
  High: "high",
  Medium: "medium",
  Low: "low",
};

function formatTime(time) {
  if (!time) return "-";

  try {
    return new Date(time).toLocaleString([], {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return time;
  }
}

function AlertTable({ alerts = [], onView }) {
  if (!alerts.length) {
    return (
      <div className="alert-table-empty">
        <FiAlertTriangle size={38} />
        <h3>No Active Alerts</h3>
        <p>Everything looks good. No alerts have been detected.</p>
      </div>
    );
  }

  return (
    <div className="alert-table-card">
      <div className="alert-table-header">
        <div>
          <h2>Live Incident Alerts</h2>
          <p>Monitor and manage all incoming incidents.</p>
        </div>

        <div className="alert-count">
          {alerts.length} Active
        </div>
      </div>

      <div className="alert-table-wrapper">
        <table className="alert-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Alert</th>
              <th>Citizen</th>
              <th>Location</th>
              <th>Time</th>
              <th>Severity</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td>
                  <span className="alert-id">
                    <FiHash />
                    #{alert.id}
                  </span>
                </td>

                <td>
                  <div className="alert-title-cell">
                    <FiAlertTriangle className="alert-icon" />

                    <div>
                      <h4>{alert.title}</h4>

                      <span>
                        {alert.category || "Emergency"}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="alert-user">
                    <FiUser />
                    <span>
                      {alert.user || alert.name || "Unknown"}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="alert-location">
                    <FiMapPin />
                    <span>
                      {alert.location || "Not Available"}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="alert-time">
                    <FiClock />
                    <span>
                      {formatTime(alert.time)}
                    </span>
                  </div>
                </td>

                <td>
                  <span
                    className={`severity ${
                      severityColors[
                        alert.severity || "Low"
                      ]
                    }`}
                  >
                    {alert.severity || "Low"}
                  </span>
                </td>

                <td>
                  <button
                    className="view-alert-btn"
                    onClick={() => onView(alert)}
                  >
                    View
                    <FiChevronRight />
                  </button>
                </td>
              </tr>
            ))}
                      </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlertTable;