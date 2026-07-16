import { useMemo, useState } from "react";
import {
  FiSearch,
  FiUsers,
  FiAlertTriangle,
  FiShield,
  FiActivity,
  FiEye,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeModal from "../components/EmployeeModal";
import RiskBadge from "../components/RiskBadge";
import useUsers from "../hooks/useUsers";

import "../styles/dashboard.css";
import "../styles/users.css";

function Users() {
  const { users, loading, error } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("All");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const value = search.toLowerCase();

      const matchesSearch =
        (user.name || "").toLowerCase().includes(value) ||
        (user.email || "").toLowerCase().includes(value) ||
        (user.department || "").toLowerCase().includes(value);

      let matchesRisk = true;

      if (risk === "High") {
        matchesRisk = user.riskScore >= 70;
      } else if (risk === "Medium") {
        matchesRisk =
          user.riskScore >= 40 &&
          user.riskScore < 70;
      } else if (risk === "Low") {
        matchesRisk = user.riskScore < 40;
      }

      return matchesSearch && matchesRisk;
    });
  }, [users, search, risk]);

  const criticalUsers = users.filter(
    (u) => u.riskScore >= 80
  ).length;

  const highUsers = users.filter(
    (u) =>
      u.riskScore >= 50 &&
      u.riskScore < 80
  ).length;

  const lowUsers = users.filter(
    (u) => u.riskScore < 50
  ).length;

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <div className="dashboard-content">

          <Navbar />

          <section className="users-page">

            <div className="users-header">

              <div>

                <span className="dashboard-badge">
                  KAVACH • BANKING SECURITY OPERATIONS CENTER
                </span>

                <h1>Employee Risk Intelligence Center</h1>

                <p>
                  Monitor privileged users, identify insider
                  threats and investigate suspicious employee
                  activities in real time.
                </p>

              </div>

              <div className="users-toolbar">

                <div className="search-box">

                  <FiSearch />

                  <input
                    type="text"
                    placeholder="Search employee..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>

                <select
                  value={risk}
                  onChange={(e) =>
                    setRisk(e.target.value)
                  }
                >
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

              </div>

            </div>

            <div className="users-stats">

              <div className="user-stat-card">

                <div className="stat-icon blue">
                  <FiUsers />
                </div>

                <div>
                  <h2>{users.length}</h2>
                  <p>Total Employees</p>
                </div>

              </div>

              <div className="user-stat-card">

                <div className="stat-icon red">
                  <FiAlertTriangle />
                </div>

                <div>
                  <h2>{criticalUsers}</h2>
                  <p>Critical Risk</p>
                </div>

              </div>

              <div className="user-stat-card">

                <div className="stat-icon orange">
                  <FiShield />
                </div>

                <div>
                  <h2>{highUsers}</h2>
                  <p>High Risk</p>
                </div>

              </div>

              <div className="user-stat-card">

                <div className="stat-icon green">
                  <FiActivity />
                </div>

                <div>
                  <h2>{lowUsers}</h2>
                  <p>Low Risk</p>
                </div>

              </div>

            </div>

            {loading ? (
              <div className="loading-box">
                Loading Employees...
              </div>
            ) : error ? (
              <div className="error-box">
                {error}
              </div>
            ) : (
              <div className="users-table-card">

                <table className="users-table">

                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Role</th>
                      <th>Risk</th>
                      <th>Alerts</th>
                      <th>Logs</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                                        {filteredUsers.map((user) => (
                      <tr key={user._id}>

                        <td>
                          <div className="employee-cell">

                            <div className="employee-avatar">
                              {(user.name || "U")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="employee-info">
                              <h4>{user.name}</h4>
                              <span>{user.email}</span>
                            </div>

                          </div>
                        </td>

                        <td>
                          <span className="department-chip">
                            {user.department || "N/A"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`role-chip ${(
                              user.role || "employee"
                            ).toLowerCase()}`}
                          >
                            {user.role || "Employee"}
                          </span>
                        </td>

                        <td>

                          <RiskBadge score={user.riskScore} />

                          <div className="risk-progress">

                            <div
                              className="risk-progress-fill"
                              style={{
                                width: `${user.riskScore || 0}%`,
                              }}
                            />

                          </div>

                          <span className="risk-percent">
                            {user.riskScore || 0}%
                          </span>

                        </td>

                        <td>
                          {user.alertCount ?? 0}
                        </td>

                        <td>
                          {user.auditCount ?? 0}
                        </td>

                        <td>

                          <button
                            className="view-btn"
                            onClick={() =>
                              setSelectedUser(user)
                            }
                          >
                            <FiEye />
                            <span>View</span>
                          </button>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </div>

      </main>

      {selectedUser && (
        <EmployeeModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

    </div>
  );
}

export default Users;