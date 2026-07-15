import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import ReportCard from "../components/ReportCard";
import ReportsChart from "../components/ReportsChart";
import ExportButtons from "../components/ExportButtons";

import useReports from "../hooks/useReports";

import "../styles/dashboard.css";
import "../styles/reports.css";

function Reports() {

  const { reports, loading, error } = useReports();

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />

        <div className="dashboard-content">

          <Navbar />

          <div className="users-loading">

            <div className="loader"></div>

            <h2>Loading Reports...</h2>

          </div>

        </div>

      </div>
    );
  }

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

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="reports-page">

          <div className="reports-header">

            <div>

              <h1>📊 Security Reports</h1>

              <p>

                Live security analytics from your banking
                monitoring system.

              </p>

            </div>

          </div>

          <div className="reports-grid">

            <ReportCard
              title="Employees"
              value={reports.totalEmployees}
              icon="👨"
              color="#2563EB"
            />

            <ReportCard
              title="Total Alerts"
              value={reports.totalAlerts}
              icon="🚨"
              color="#DC2626"
            />

            <ReportCard
              title="Critical Alerts"
              value={reports.criticalAlerts}
              icon="⚠️"
              color="#EA580C"
            />

            <ReportCard
              title="Resolved Alerts"
              value={reports.resolvedAlerts}
              icon="✅"
              color="#16A34A"
            />

            <ReportCard
              title="Open Alerts"
              value={reports.openAlerts}
              icon="📂"
              color="#7C3AED"
            />

            <ReportCard
              title="Audit Logs"
              value={reports.auditLogs}
              icon="📜"
              color="#0F766E"
            />

          </div>

          <ReportsChart
            data={reports.departmentData}
          />

          <ExportButtons />

        </div>

      </div>

    </div>

  );

}

export default Reports;