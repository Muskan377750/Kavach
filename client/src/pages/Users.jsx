import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeModal from "../components/EmployeeModal";
import RiskBadge from "../components/RiskBadge";

import useUsers from "../hooks/useUsers";

import "../styles/users.css";

function Users() {
  const {
    users,
    loading,
    error,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);

  const [search, setSearch] = useState("");

  if (loading) {
    return <h2>Loading Employees...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.department.toLowerCase().includes(value)
    );
  });

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="users-page">

          <div className="users-header">

            <h2>Employees</h2>

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <table className="users-table">

            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Department</th>

                <th>Role</th>

                <th>Risk</th>

                <th>Alerts</th>

                <th>Audit Logs</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr key={user._id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.department}</td>

                  <td>{user.role}</td>

                  <td>

                    <RiskBadge
                      score={user.riskScore}
                    />

                    <br />

                    <small>
                      {user.riskScore}%
                    </small>

                  </td>

                  <td>{user.alertCount}</td>

                  <td>{user.auditCount}</td>

                  <td>

                    <button
                      className="view-btn"
                      onClick={() =>
                        setSelectedUser(user)
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {selectedUser && (

        <EmployeeModal
          user={selectedUser}
          onClose={() =>
            setSelectedUser(null)
          }
        />

      )}

    </div>
  );
}

export default Users;