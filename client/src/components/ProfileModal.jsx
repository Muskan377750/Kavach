import { FiX, FiMail, FiPhone, FiMapPin, FiShield, FiLock, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/profileModal.css";

function ProfileModal({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("theme");
    navigate("/");
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div
        className="profile-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="profile-modal-header">
          <div className="profile-cover"></div>

          <button className="close-profile" onClick={onClose}>
            <FiX />
          </button>

          <div className="profile-avatar-large">
            A
          </div>

          <h2>Admin</h2>

          <p>SOC Administrator</p>
        </div>

        {/* Body */}

        <div className="profile-modal-body">

          <div className="profile-section">

            <h4>Personal Information</h4>

            <div className="info-grid">

              <div className="info-card">
                <FiMail />
                <div>
                  <span>Email</span>
                  <strong>admin@kavach.com</strong>
                </div>
              </div>

              <div className="info-card">
                <FiPhone />
                <div>
                  <span>Phone</span>
                  <strong>+91 98765 43210</strong>
                </div>
              </div>

              <div className="info-card">
                <FiMapPin />
                <div>
                  <span>Location</span>
                  <strong>New Delhi, India</strong>
                </div>
              </div>

              <div className="info-card">
                <FiShield />
                <div>
                  <span>Role</span>
                  <strong>Security Administrator</strong>
                </div>
              </div>

            </div>

          </div>

          <div className="profile-section">

            <h4>Account Overview</h4>

            <div className="stats-grid">

              <div className="stat-box">
                <h2>128</h2>
                <p>Alerts Reviewed</p>
              </div>

              <div className="stat-box">
                <h2>32</h2>
                <p>Investigations</p>
              </div>

              <div className="stat-box">
                <h2>99%</h2>
                <p>Resolution Rate</p>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="profile-footer">

          <button
            className="profile-btn secondary"
            onClick={() => {
              onClose();
              navigate("/settings");
            }}
          >
            <FiLock />
            Settings
          </button>

          <button
            className="profile-btn danger"
            onClick={logout}
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProfileModal;