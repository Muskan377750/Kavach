import {
  FiSearch,
  FiBell,
  FiMoon,
  FiSun,
  FiShield,
  FiChevronDown,
} from "react-icons/fi";
import { useEffect, useRef } from "react";
import { useSearch } from "../context/SearchContext";
import { useNotifications } from "../context/NotificationContext";
import { useTheme } from "../context/ThemeContext";
import NotificationDropdown from "./NotificationDropdown";
import "../styles/navbar.css";

function Navbar() {
  const { search, setSearch } = useSearch();
  const { theme, setTheme } = useTheme();

  const {
    unreadCount,
    open,
    setOpen,
  } = useNotifications();

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, [setOpen]);

  return (
    <header className="navbar">

      {/* Left */}

      <div className="navbar-logo">

        <div className="logo-icon">
          <FiShield />
        </div>

        <div>
          <div className="logo-title">KAVACH</div>
          <div className="logo-subtitle">
            Banking SOC
          </div>
        </div>

      </div>

      {/* Search */}

      <div className="navbar-search">

        <FiSearch className="search-icon" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search alerts, employees, investigations..."
        />

      </div>

      {/* Right */}

      <div className="navbar-right">

        <div className="live-status">

          <span className="live-dot"></span>

          All Systems Secure

        </div>

        <div
          ref={dropdownRef}
          style={{ position: "relative" }}
        >

          <button
            className={`notification ${
              unreadCount ? "has-unread" : ""
            }`}
            onClick={() => setOpen(!open)}
          >
            <FiBell />

            {unreadCount > 0 && (
              <span className="notification-count">
                {unreadCount}
              </span>
            )}

          </button>

          {open && <NotificationDropdown />}

        </div>

        <button
          className="notification"
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
        >

          {theme === "dark" ? (
            <FiSun />
          ) : (
            <FiMoon />
          )}

        </button>

        <div className="profile">

          <div className="profile-avatar">
            A
          </div>

          <div className="profile-info">

            <div className="profile-name">
              Admin
            </div>

            <div className="profile-role">
              SOC Administrator
            </div>

          </div>

          <FiChevronDown className="profile-arrow"/>

        </div>

      </div>

    </header>
  );
}

export default Navbar;