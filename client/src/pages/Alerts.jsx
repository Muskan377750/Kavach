import { useState, useEffect } from "react";
import useAlerts from "../hooks/useAlerts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AlertModal from "../components/AlertModal";

import socket from "../socket";

import "../styles/alerts.css";

function Alerts() {
  const { alerts, loading, error, fetchAlerts } = useAlerts();
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    socket.on("new-alert", () => {
      console.log("🚨 New Alert Received");
      fetchAlerts();
    });

    return () => {
      socket.off("new-alert");
    };
  }, [fetchAlerts]);

  if (loading) {
    return <h2>Loading Alerts...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="alerts-page">
          <div className="alerts-header">
            <div className="alerts-title">
              <h1>🚨 Threat Intelligence Center</h1>

              <p>
                AI-powered monitoring of privileged access misuse, insider
                threats and suspicious employee behaviour.
              </p>
            </div>

            <div className="alert-count">
              <h2>{alerts.filter(alert => alert.status === "Open").length}</h2>
              <span>Open Alerts</span>
            </div>
          </div>

          {alerts.length === 0 ? (
            <div className="no-alerts">✅ No active alerts found.</div>
          ) : (
            alerts.map((alert) => (
              <div className="alert-card" key={alert._id}>
                <div className="alert-left">
                  <h2>{alert.alertType}</h2>

                  <p>
                    <strong>Employee:</strong> {alert.user?.name || "Unknown"}
                  </p>

                  <p>
                    <strong>Email:</strong> {alert.user?.email || "N/A"}
                  </p>

                  <p>
                    <strong>Department:</strong>{" "}
                    {alert.user?.department || "N/A"}
                  </p>

                  <p>
                    <strong>Role:</strong> {alert.user?.role || "N/A"}
                  </p>

                  <p>
                    <strong>Description:</strong> {alert.message}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {new Date(alert.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="alert-right">
                  <div
                    className={`risk ${(alert.riskLevel || "Low").toLowerCase()}`}
                  >
                    {alert.riskLevel || "Low"}
                  </div>

                  <div
                    className={`status ${(alert.status || "Open").toLowerCase()}`}
                  >
                    {alert.status || "Open"}
                  </div>

                  <button
                    className="details-btn"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    🔍 Investigate
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AlertModal
        alert={selectedAlert}
        fetchAlerts={fetchAlerts}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}

export default Alerts;