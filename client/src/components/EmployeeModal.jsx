import EmployeeAvatar from "./EmployeeAvatar";
import RiskBadge from "./RiskBadge";
import RiskProgress from "./RiskProgress";
import StatusBadge from "./StatusBadge";

import "../styles/employeeModal.css";

function EmployeeModal({ user, onClose }) {
  if (!user) return null;

  const getStatus = () => {
    if (!user.lastLogin) return "Offline";

    const diff =
      (new Date() - new Date(user.lastLogin)) /
      (1000 * 60);

    return diff <= 15 ? "Online" : "Offline";
  };

  const formatDate = (date) => {
    if (!date) return "Never";

    return new Date(date).toLocaleString();
  };

  return (
    <div className="modal-overlay">

      <div className="employee-modal">

        <button
          className="close-modal"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}

        <div className="profile-header">

          <EmployeeAvatar
            name={user.name}
          />

          <div>

            <h2>{user.name}</h2>

            <p>{user.email}</p>

          </div>

        </div>

        {/* Information */}

        <div className="profile-grid">

          <div className="profile-card">

            <h3>Employee Information</h3>

            <div className="info-row">
              <span>Department</span>
              <strong>{user.department}</strong>
            </div>

            <div className="info-row">
              <span>Role</span>
              <strong>{user.role}</strong>
            </div>

            <div className="info-row">
              <span>Status</span>
              <StatusBadge
                status={getStatus()}
              />
            </div>

            <div className="info-row">
              <span>Last Login</span>

              <strong>
                {formatDate(user.lastLogin)}
              </strong>
            </div>

            <div className="info-row">
              <span>Failed Logins</span>

              <strong>
                {user.failedLoginAttempts}
              </strong>
            </div>

          </div>

          {/* Security */}

          <div className="profile-card">

            <h3>Security Overview</h3>

            <RiskProgress
              score={user.riskScore}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "15px",
              }}
            >

              <RiskBadge
                score={user.riskScore}
              />

              <strong>
                {user.riskScore}%
              </strong>

            </div>

            <div className="info-row">

              <span>Total Alerts</span>

              <strong>
                {user.alertCount}
              </strong>

            </div>

            <div className="info-row">

              <span>Audit Logs</span>

              <strong>
                {user.auditCount}
              </strong>

            </div>

          </div>

        </div>

        {/* Alerts */}

        <div className="timeline-card">

          <h3>🚨 Recent Alerts</h3>

          <ul>

            <li>Unauthorized Login Attempt</li>

            <li>Late Night Login</li>

            <li>Multiple Failed Logins</li>

          </ul>

        </div>

        {/* Audit */}

        <div className="timeline-card">

          <h3>📜 Recent Audit Activity</h3>

          <ul>

            <li>Viewed Customer Records</li>

            <li>Updated Employee Details</li>

            <li>Generated Security Report</li>

          </ul>

        </div>

        <div className="modal-footer">

          <button
            className="close-btn"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default EmployeeModal;