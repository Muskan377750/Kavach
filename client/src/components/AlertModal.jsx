import "../styles/alertModal.css";
import { investigateAlert, resolveAlert } from "../api/alertApi";

function AlertModal({ alert, onClose, fetchAlerts }) {
  if (!alert) return null;

  const handleInvestigate = async () => {
    try {
      await investigateAlert(alert._id);

      onClose();

      await fetchAlerts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolve = async () => {
    try {
      await resolveAlert(alert._id);

      onClose();

      await fetchAlerts();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="alert-modal">
        <div className="modal-header">
          <h2>🚨 Alert Investigation</h2>

          <button onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <strong>Employee</strong>
            <span>{alert.user?.name || "Unknown"}</span>
          </div>

          <div className="modal-row">
            <strong>Email</strong>
            <span>{alert.user?.email || "N/A"}</span>
          </div>

          <div className="modal-row">
            <strong>Department</strong>
            <span>{alert.user?.department || "N/A"}</span>
          </div>

          <div className="modal-row">
            <strong>Role</strong>
            <span>{alert.user?.role || "N/A"}</span>
          </div>

          <div className="modal-row">
            <strong>Alert Type</strong>
            <span>{alert.alertType}</span>
          </div>

          <div className="modal-row">
            <strong>Description</strong>
            <span>{alert.message}</span>
          </div>

          <div className="modal-row">
            <strong>Risk Level</strong>

            <span
              className={`risk ${(alert.riskLevel || "Low").toLowerCase()}`}
            >
              {alert.riskLevel || "Low"}
            </span>
          </div>

          <div className="modal-row">
            <strong>Status</strong>

            <span>{alert.status || "Open"}</span>
          </div>

          <div className="modal-row">
            <strong>IP Address</strong>

            <span>{alert.ipAddress || "127.0.0.1"}</span>
          </div>

          <div className="modal-row">
            <strong>Location</strong>

            <span>{alert.location || "Head Office"}</span>
          </div>

          <div className="modal-row">
            <strong>Browser</strong>

            <span>{alert.browser || "Chrome"}</span>
          </div>

          <div className="modal-row">
            <strong>Device</strong>

            <span>{alert.device || "Windows Laptop"}</span>
          </div>

          <div className="modal-row">
            <strong>Risk Score</strong>

            <div className="risk-progress">
              <div
                className="risk-fill"
                style={{
                  width: `${alert.riskScore || 80}%`,
                }}
              ></div>
            </div>

            <span>{alert.riskScore || 80}%</span>
          </div>

          <div className="modal-row">
            <strong>Generated At</strong>

            <span>{new Date(alert.createdAt).toLocaleString()}</span>
          </div>

          <div className="modal-actions">
            <button className="investigate-btn" onClick={handleInvestigate}>
              Investigate
            </button>

            <button className="resolve-btn" onClick={handleResolve}>
              Resolve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
