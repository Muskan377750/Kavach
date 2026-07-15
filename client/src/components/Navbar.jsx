import {
  FaUserCircle,
  FaSearch,
  FaShieldAlt,
} from "react-icons/fa";

import NotificationBell from "./NotificationBell";

import "../styles/navbar.css";

function Navbar() {
  const today = new Date();

  const currentDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="navbar">

      {/* Left */}

      <div className="nav-left">

        <div className="nav-title">

          <FaShieldAlt className="shield-icon" />

          <div>

            <h2>SecureVault Enterprise</h2>

            <p>AI Powered Insider Threat Detection</p>

          </div>

        </div>

      </div>

      {/* Center */}

      <div className="nav-center">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search employees, alerts, audit logs..."
          />

        </div>

      </div>

      {/* Right */}

      <div className="nav-right">

        <div className="date-card">

          <span>{currentDate}</span>

        </div>

        <NotificationBell />

        <div className="profile-card">

          <FaUserCircle className="profile-icon" />

          <div>

            <h4>Administrator</h4>

            <small>Security Team</small>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;