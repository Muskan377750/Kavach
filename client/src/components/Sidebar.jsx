import {
  FaShieldAlt,
  FaHome,
  FaBell,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      {/* ===========================
          LOGO
      =========================== */}

      <div className="sidebar-logo">
        <FaShieldAlt />

        <div>
          <h2>SecureVault</h2>
          <span>Enterprise SOC</span>
        </div>
      </div>

      {/* ===========================
          MENU
      =========================== */}

      <ul>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <li>
            <FaHome />
            <span>Dashboard</span>
          </li>
        </NavLink>

        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <li>
            <FaBell />
            <span>Alerts</span>
          </li>
        </NavLink>

        <NavLink
          to="/audit"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <li>
            <FaClipboardList />
            <span>Audit Logs</span>
          </li>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <li>
            <FaUsers />
            <span>Employees</span>
          </li>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <li>
            <FaChartBar />
            <span>Reports</span>
          </li>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <li>
            <FaCog />
            <span>Settings</span>
          </li>
        </NavLink>
      </ul>

      {/* ===========================
          BOTTOM SECTION
      =========================== */}

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">
            <FaUserShield />
          </div>

          <div className="user-details">
            <h4>Administrator</h4>
            <span>Security Team</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;