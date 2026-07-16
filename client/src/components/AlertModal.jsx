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

    {/* Employee */}

    <div className="modal-section">

        <h3>👤 Employee Information</h3>

        <div className="modal-grid">

            <div className="info-card">
                <span>Name</span>
                <strong>{alert.user?.name || "Unknown"}</strong>
            </div>

            <div className="info-card">
                <span>Email</span>
                <strong>{alert.user?.email || "N/A"}</strong>
            </div>

            <div className="info-card">
                <span>Department</span>
                <strong>{alert.user?.department || "General"}</strong>
            </div>

            <div className="info-card">
                <span>Role</span>
                <strong>{alert.user?.role || "Employee"}</strong>
            </div>

        </div>

    </div>

    {/* Alert */}

    <div className="modal-section">

        <h3>🚨 Alert Details</h3>

        <div className="modal-grid">

            <div className="info-card">
                <span>Alert Type</span>
                <strong>{alert.alertType}</strong>
            </div>

            <div className="info-card">
                <span>Status</span>
                <strong>{alert.status}</strong>
            </div>

            <div className="info-card">
                <span>Risk Level</span>

                <div className={`risk ${(alert.riskLevel || "Low").toLowerCase()}`}>
                    {alert.riskLevel}
                </div>

            </div>

            <div className="info-card">
                <span>Generated</span>
                <strong>
                    {new Date(alert.createdAt).toLocaleString()}
                </strong>
            </div>

        </div>

        <div className="description-box">

            <h4>Description</h4>

            <p>{alert.message}</p>

        </div>

    </div>

    {/* Environment */}

    <div className="modal-section">

        <h3>💻 Device Information</h3>

        <div className="modal-grid">

            <div className="info-card">
                <span>IP Address</span>
                <strong>{alert.ipAddress || "127.0.0.1"}</strong>
            </div>

            <div className="info-card">
                <span>Location</span>
                <strong>{alert.location || "Head Office"}</strong>
            </div>

            <div className="info-card">
                <span>Browser</span>
                <strong>{alert.browser || "Chrome"}</strong>
            </div>

            <div className="info-card">
                <span>Device</span>
                <strong>{alert.device || "Windows Laptop"}</strong>
            </div>

        </div>

    </div>

    {/* Risk */}

    <div className="modal-section">

        <h3>📊 Risk Score</h3>

        <div className="risk-progress">

            <div
                className="risk-fill"
                style={{
                    width: `${alert.riskScore || 80}%`
                }}
            />

        </div>

        <h2 className="risk-score">

            {alert.riskScore || 80}%

        </h2>

    </div>

    {/* Actions */}

    <div className="modal-actions">

        <button
            className="investigate-btn"
            onClick={handleInvestigate}
        >
            Investigate
        </button>

        <button
            className="resolve-btn"
            onClick={handleResolve}
        >
            Resolve
        </button>

    </div>

</div>
      </div>
    </div>
  );
}

export default AlertModal;
