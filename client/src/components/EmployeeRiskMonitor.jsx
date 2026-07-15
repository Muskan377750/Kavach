import "../styles/dashboard.css";

function EmployeeRiskMonitor({ employees = [] }) {
  if (!employees.length) {
    return (
      <div className="employee-monitor">
        <div className="section-header">
          <h2>👥 Employee Risk Monitor</h2>
          <span className="live-badge">LIVE</span>
        </div>

        <div className="empty-state">
          No employee risk detected.
        </div>
      </div>
    );
  }

  return (
    <div className="employee-monitor">

      <div className="section-header">
        <h2>👥 Employee Risk Monitor</h2>
        <span className="live-badge">LIVE</span>
      </div>

      {employees.map((employee) => {

        const initials =
          employee.name?.charAt(0).toUpperCase() || "?";

        const risk =
          employee.riskScore || 0;

        return (
          <div
            key={employee._id}
            className="employee-card"
          >
            <div className="employee-left">

              <div className="employee-avatar">
                {initials}
              </div>

              <div>

                <h3>{employee.name}</h3>

                <p>
                  {employee.department}
                  {" • "}
                  {employee.role}
                </p>

              </div>

            </div>

            <div className="employee-right">

              <div className="risk-percent">
                {risk}%
              </div>

              <div className="risk-progress">

                <div
                  className="risk-progress-fill"
                  style={{
                    width: `${risk}%`,
                  }}
                />

              </div>

              <span
                className={`risk-chip ${
                  risk >= 80
                    ? "critical"
                    : risk >= 60
                    ? "high"
                    : risk >= 30
                    ? "medium"
                    : "low"
                }`}
              >
                {risk >= 80
                  ? "Critical"
                  : risk >= 60
                  ? "High"
                  : risk >= 30
                  ? "Medium"
                  : "Low"}
              </span>

            </div>

          </div>
        );
      })}
    </div>
  );
}

export default EmployeeRiskMonitor;