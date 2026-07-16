import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import StatCard from "../components/StatCard";
import SecurityHealth from "../components/SecurityHealth";
import ThreatFeed from "../components/ThreatFeed";
import EmployeeRiskMonitor from "../components/EmployeeRiskMonitor";
import RecentInvestigations from "../components/RecentInvestigations";

import ThreatTrendChart from "../components/ThreatTrendChart";
import RiskDistributionChart from "../components/RiskDistributionChart";

import LiveClock from "../components/LiveClock";

import { getDashboardData } from "../services/dashboardService";

import { useSearch } from "../context/SearchContext";
import { useSidebar } from "../context/SidebarContext";

import "../styles/dashboard.css";
import "../styles/statcard.css";

function Dashboard() {
  const { collapsed } = useSidebar();
  const { search } = useSearch();

  const [loading, setLoading] = useState(true);

  const [dashboardData, setDashboardData] = useState({
    activeEmployees: 0,
    openAlerts: 0,
    auditLogs: 0,
    highRiskUsers: 0,

    recentAlerts: [],
    topRiskEmployees: [],
    recentInvestigations: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDashboardData();
        console.log(data);

        setDashboardData({
          activeEmployees: data.activeEmployees || 0,
          openAlerts: data.openAlerts || 0,
          auditLogs: data.auditLogs || 0,
          highRiskUsers: data.highRiskUsers || 0,

          recentAlerts: data.recentAlerts || data.alerts || [],

          topRiskEmployees: data.topRiskEmployees || [],

          recentInvestigations: data.recentInvestigations || [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredAlerts = dashboardData.recentAlerts.filter(
    (alert) =>
      (alert.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (alert.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (alert.severity || "").toLowerCase().includes(search.toLowerCase()),
  );

  const filteredEmployees = dashboardData.topRiskEmployees.filter(
    (employee) =>
      (employee.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (employee.department || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (employee.risk || "").toLowerCase().includes(search.toLowerCase()),
  );

  const filteredInvestigations = dashboardData.recentInvestigations.filter(
    (item) =>
      (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.status || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className={`dashboard-main ${collapsed ? "collapsed" : ""}`}>
        <div className="dashboard-content">
          {/* Floating Navbar */}
          <Navbar />

          {/* Dashboard Header */}

          <section className="dashboard-header">
            <div>
              <span className="dashboard-badge">
                KAVACH • Banking Security Operations Center
              </span>

              <h1>Security Command Center</h1>

              <p>
                Monitor privileged users, insider threats, suspicious banking
                activities, audit events and security posture from one
                centralized dashboard.
              </p>
            </div>

            <div className="dashboard-actions">
              <LiveClock />
            </div>
          </section>

          {/* KPI Cards */}

          <section className="stats-grid">
            <StatCard
              title="Active Employees"
              value={loading ? "..." : dashboardData.activeEmployees}
              type="users"
              trend="Online Monitoring"
            />

            <StatCard
              title="Open Alerts"
              value={loading ? "..." : dashboardData.openAlerts}
              type="alerts"
              trend="Critical Review"
            />

            <StatCard
              title="Audit Events"
              value={loading ? "..." : dashboardData.auditLogs}
              type="activity"
              trend="Today's Activity"
            />

            <StatCard
              title="High Risk Users"
              value={loading ? "..." : dashboardData.highRiskUsers}
              type="risk"
              trend="Immediate Action"
            />
          </section>

          {/* Threat Analytics */}

          <section className="dashboard-section">
            <h2 className="section-title">Threat Analytics</h2>

            <div className="charts-grid">
              <div className="dashboard-panel">
                <ThreatTrendChart />
              </div>

              <div className="dashboard-panel">
                <RiskDistributionChart />
              </div>
            </div>
          </section>

          {/* Security Health */}

          <section className="dashboard-section">
            <h2 className="section-title">Security Health</h2>

            <div className="dashboard-panel">
              <SecurityHealth />
            </div>
          </section>

          {/* Threat Feed */}

          <section className="dashboard-section">
            <h2 className="section-title">Threat Intelligence</h2>

            <div className="dashboard-two-column">
              <div className="dashboard-panel">
                <ThreatFeed
                  alerts={filteredAlerts}
                  onViewAlert={(alert) => {
                    console.log(alert);
                  }}
                />
              </div>

              <div className="dashboard-panel">
                <EmployeeRiskMonitor employees={filteredEmployees} />
              </div>
            </div>
          </section>

          {/* Investigations */}

          <section className="dashboard-section">
            <h2 className="section-title">Recent Investigations</h2>

            <div className="dashboard-panel">
              <RecentInvestigations investigations={filteredInvestigations} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
