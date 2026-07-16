import {
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import {
  useNotifications,
} from "../context/NotificationContext";

import "../styles/notification.css";

function NotificationDropdown() {

  const {
    notifications,
    markAllAsRead,
  } = useNotifications();

  const getIcon = (severity) => {
    switch (severity) {
      case "critical":
        return <FiXCircle color="#EF4444" />;
      case "warning":
        return <FiAlertTriangle color="#F59E0B" />;
      case "success":
        return <FiCheckCircle color="#22C55E" />;
      default:
        return <FiAlertTriangle color="#3B82F6" />;
    }
  };

  return (

    <div className="notification-dropdown">

      <div className="notification-header">

        <h3>Notifications</h3>

        <button onClick={markAllAsRead}>
          Mark all read
        </button>

      </div>

      <div className="notification-list">

        {notifications.length === 0 ? (

          <div className="notification-empty">
            No notifications
          </div>

        ) : (

          notifications.map((item) => (

            <div
              key={item.id}
              className={`notification-item ${
                !item.read ? "unread" : ""
              }`}
            >

              <div className="notification-icon">

                {getIcon(item.severity)}

              </div>

              <div className="notification-content">

                <strong>{item.title}</strong>

                <p>{item.message}</p>

                <small>{item.time}</small>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default NotificationDropdown;