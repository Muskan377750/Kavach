import { useState, useEffect } from "react";
import {
  FiSearch,
  FiAlertTriangle,
  FiShield,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";

import useAlerts from "../hooks/useAlerts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AlertModal from "../components/AlertModal";
import AlertTable from "../components/AlertTable";
import socket from "../socket";

import { useSidebar } from "../context/SidebarContext";

import "../styles/alerts.css";
import "../styles/alertTable.css";

function Alerts() {
  const { collapsed } = useSidebar();

  const { alerts, loading, error, fetchAlerts } = useAlerts();

  const [selectedAlert, setSelectedAlert] = useState(null);

  const [search, setSearch] = useState("");

  const [risk, setRisk] = useState("All");

  const [status, setStatus] = useState("All");

  useEffect(() => {
    socket.on("new-alert", () => {
      fetchAlerts();
    });

    return () => {
      socket.off("new-alert");
    };
  }, [fetchAlerts]);

  const filteredAlerts = alerts.filter((alert) => {
    const text = search.toLowerCase();

    const matchesSearch =
      alert.alertType?.toLowerCase().includes(text) ||
      alert.message?.toLowerCase().includes(text) ||
      alert.user?.name?.toLowerCase().includes(text);

    const matchesRisk = risk === "All" || alert.riskLevel === risk;

    const matchesStatus = status === "All" || alert.status === status;

    return matchesSearch && matchesRisk && matchesStatus;
  });

  const openAlerts = alerts.filter((a) => a.status === "Open").length;

  const criticalAlerts = alerts.filter(
    (a) => a.riskLevel === "Critical",
  ).length;

  const investigatingAlerts = alerts.filter(
    (a) => a.status === "Investigating",
  ).length;

  const resolvedAlerts = alerts.filter((a) => a.status === "Closed").length;

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className={`dashboard-main ${collapsed ? "collapsed" : ""}`}>
        <div className="dashboard-content">
          <Navbar />

          <div className="alerts-page">
            {/* ===========================
                HEADER
            =========================== */}

            <div className="alerts-header">
              <div>
                <span className="soc-badge">
                  KAVACH • Banking Security Operations Center
                </span>

                <h1>Threat Intelligence Center</h1>

                <p>
                  Monitor suspicious activities, insider threats, privilege
                  abuse and banking security incidents in real time.
                </p>
              </div>
            </div>

            {/* ===========================
                STATS
            =========================== */}

            <div className="alerts-stats">
              <div className="alert-stat-card">
                <div className="alert-stat-icon open">
                  <FiAlertTriangle />
                </div>

                <div>
                  <h2>{openAlerts}</h2>

                  <p>Open Alerts</p>
                </div>
              </div>

              <div className="alert-stat-card">
                <div className="alert-stat-icon critical">
                  <FiShield />
                </div>

                <div>
                  <h2>{criticalAlerts}</h2>

                  <p>Critical Threats</p>
                </div>
              </div>

              <div className="alert-stat-card">
                <div className="alert-stat-icon investigating">
                  <FiActivity />
                </div>

                <div>
                  <h2>{investigatingAlerts}</h2>

                  <p>Investigating</p>
                </div>
              </div>

              <div className="alert-stat-card">
                <div className="alert-stat-icon resolved">
                  <FiCheckCircle />
                </div>

                <div>
                  <h2>{resolvedAlerts}</h2>

                  <p>Resolved</p>
                </div>
              </div>
            </div>

            {/* ===========================
                CONTROLS
            =========================== */}

            <div className="alert-controls">
              <div className="search-box">
                <FiSearch />

                <input
                  type="text"
                  placeholder="Search employees, alert types or messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select value={risk} onChange={(e) => setRisk(e.target.value)}>
                <option>All</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All</option>
                <option>Open</option>
                <option>Investigating</option>
                <option>Closed</option>
              </select>
            </div>
            {/* ===========================
                ALERT LIST
            =========================== */}

            {loading ? (
              <div className="alerts-loading">
                <h3>Loading security alerts...</h3>
              </div>
            ) : error ? (
              <div className="alerts-error">
                <h3>{error}</h3>
              </div>
            ) : filteredAlerts.length === 0 ? (
              <div className="no-alerts">
                <FiCheckCircle size={60} className="empty-icon" />

                <h2>No Security Alerts Found</h2>

                <p>
                  There are currently no alerts matching your search and filter
                  criteria.
                </p>
              </div>
            ) : (
              <AlertTable
                alerts={filteredAlerts.map((alert) => ({
                  id: alert._id,
                  title: alert.alertType,
                  category: alert.status,
                  user: alert.user?.name,
                  location: alert.location || "Unknown",
                  time: alert.createdAt,
                  severity: alert.riskLevel,
                  originalAlert: alert,
                }))}
                onView={(alert) => setSelectedAlert(alert.originalAlert)}
              />
            )}
          </div>
        </div>
      </main>

      {/* ===========================
          MODAL
      =========================== */}

      <AlertModal
        alert={selectedAlert}
        fetchAlerts={fetchAlerts}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}

export default Alerts;
