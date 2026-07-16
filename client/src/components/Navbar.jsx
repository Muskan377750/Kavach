import {
  FiSearch,
  FiBell,
  FiShield,
} from "react-icons/fi";

import { useEffect, useRef, useState } from "react";

import { useSearch } from "../context/SearchContext";
import { useNotifications } from "../context/NotificationContext";

import NotificationDropdown from "./NotificationDropdown";
import ProfileModal from "./ProfileModal";

import "../styles/navbar.css";

function Navbar() {
  const { search, setSearch } = useSearch();

  const { unreadCount, open, setOpen } = useNotifications();

  const notificationRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        setProfileOpen(false);
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = profileOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [profileOpen]);

  return (
    <>
      <header className="navbar">
        {/* LEFT */}

        <div className="navbar-logo">
  <div className="logo-icon">
    <FiShield />
  </div>

  <div>
    <div className="logo-title">KAVACH</div>
    <div className="logo-subtitle">Banking SOC</div>
  </div>
</div>

        {/* SEARCH */}

        <div className="navbar-search">
          <FiSearch className="search-icon" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts, employees, investigations..."
          />
        </div>

        {/* RIGHT */}

        <div className="navbar-right">
          <div className="live-status">
            <span className="live-dot"></span>
            All Systems Secure
          </div>

          {/* Notifications */}

          <div
            ref={notificationRef}
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

          {/* PROFILE */}

          <div
            className="profile"
            onClick={() => setProfileOpen(true)}
          >
            <div className="profile-avatar">A</div>

            <div className="profile-info">
              <div className="profile-name">Admin</div>

              <div className="profile-role">
                SOC Administrator
              </div>
            </div>
          </div>
        </div>
      </header>

      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
}

export default Navbar;