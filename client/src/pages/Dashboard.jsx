import { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import SecurityHealth from "../components/SecurityHealth";
import ThreatTrendChart from "../components/ThreatTrendChart";
import RiskDistributionChart from "../components/RiskDistributionChart";
import ThreatFeed from "../components/ThreatFeed";
import EmployeeRiskMonitor from "../components/EmployeeRiskMonitor";
import IncidentTimeline from "../components/IncidentTimeline";

import useDashboard from "../hooks/useDashboard";
import socket from "../socket";

import "../styles/dashboard.css";

function Dashboard() {
  const {
    dashboard,
    loading,
    error,
    fetchDashboard,
  } = useDashboard();

  // ===========================
  // Real-Time Dashboard Updates
  // ===========================

  useEffect(() => {
    socket.on("new-alert", () => {
      console.log("📊 Dashboard Updated");
      fetchDashboard();
    });

    return () => {
      socket.off("new-alert");
    };
  }, [fetchDashboard]);

  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />

        <div className="dashboard-content">
          <Navbar />

          <div className="users-loading">
            <div className="loader"></div>

            <h2>Loading Dashboard...</h2>
          </div>
        </div>
      </div>
    );
  }

  // ===========================
  // Error
  // ===========================

  if (error) {
    return (
      <div className="dashboard">
        <Sidebar />

        <div className="dashboard-content">
          <Navbar />

          <div className="users-error">
            <h2>{error}</h2>
          </div>
        </div>
      </div>
    );
  }

  // ===========================
  // Dashboard
  // ===========================

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        {/* ===========================
            Statistics
        =========================== */}

        <div className="cards">
          <StatCard
            title="Active Employees"
            value={dashboard.activeEmployees}
            color="#2563EB"
          />

          <StatCard
            title="Open Alerts"
            value={dashboard.openAlerts}
            color="#EF4444"
          />

          <StatCard
            title="Audit Logs"
            value={dashboard.auditLogs}
            color="#10B981"
          />

          <StatCard
            title="High Risk Users"
            value={dashboard.highRiskUsers}
            color="#F59E0B"
          />
        </div>

        {/* ===========================
            Security Health + Trend
        =========================== */}

        <div className="dashboard-grid">
          <SecurityHealth />

          <ThreatTrendChart />
        </div>

        {/* ===========================
            Threat Feed + Risk Chart
        =========================== */}

        <div className="dashboard-grid">
          <ThreatFeed />

          <RiskDistributionChart />
        </div>

        {/* ===========================
            Enterprise Monitoring
        =========================== */}

        <div className="dashboard-grid">
          <EmployeeRiskMonitor
            employees={dashboard.topRiskEmployees || []}
          />

          <IncidentTimeline
            investigations={dashboard.recentInvestigations || []}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;