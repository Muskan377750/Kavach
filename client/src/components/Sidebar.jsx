import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiAlertTriangle,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiShield,
  FiActivity,
  FiChevronRight,
  FiMenu,
  FiChevronLeft
} from "react-icons/fi";

import { useSidebar } from "../context/SidebarContext";

import "../styles/sidebar.css";

function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiGrid />,
    },
    {
      name: "Employees",
      path: "/users",
      icon: <FiUsers />,
    },
    {
      name: "Alerts",
      path: "/alerts",
      icon: <FiAlertTriangle />,
    },
    {
      name: "Audit Logs",
      path: "/audit",
      icon: <FiFileText />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FiBarChart2 />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FiSettings />,
    },
  ];

  return (
    <aside
      className={`sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className="sidebar-glow"></div>

      {/* Collapse Button */}

      {/* Collapse Button */}

<button
  className="sidebar-toggle"
  onClick={toggleSidebar}
  title={
    collapsed
      ? "Expand Sidebar"
      : "Collapse Sidebar"
  }
  aria-label={
    collapsed
      ? "Expand Sidebar"
      : "Collapse Sidebar"
  }
>

  {collapsed ? <FiMenu /> : <FiChevronLeft />}

</button>

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          <FiShield />
        </div>

        {!collapsed && (

          <div className="logo-text">

            <h2 className="logo-title">
              KAVACH
            </h2>

            <p className="logo-subtitle">
              Banking Security Operations Center
            </p>

          </div>

        )}

      </div>

      {!collapsed && (
        <div className="menu-section">
          Main Navigation
        </div>
      )}

      <nav
        className="sidebar-nav"
        aria-label="Primary Navigation"
      >

        {menu.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >

            <span className="active-bar"></span>

            <div className="sidebar-icon">
              {item.icon}
            </div>

            {!collapsed && (

              <>
                <span className="sidebar-label">
                  {item.name}
                </span>

                <FiChevronRight className="menu-arrow" />
              </>

            )}

          </NavLink>

        ))}

      </nav>

      {!collapsed && (

        <div className="sidebar-footer">

          <div className="status-card">

            <div className="status-header">

              <FiActivity />

              <span>
                System Status
              </span>

            </div>

            <div className="status-online">

              <span className="status-dot"></span>

              <span>
                All Services Operational
              </span>

            </div>

          </div>

          <div className="sidebar-version">

            KAVACH SOC

            <br />

            Version 2.0

          </div>

        </div>

      )}

    </aside>
  );
}

export default Sidebar;