import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const initialNotifications = [
  {
    id: 1,
    title: "Privilege Escalation",
    message: "Raj Sharma requested admin privileges.",
    time: "2 min ago",
    severity: "critical",
    read: false,
  },
  {
    id: 2,
    title: "Multiple Failed Logins",
    message: "5 failed login attempts detected.",
    time: "5 min ago",
    severity: "warning",
    read: false,
  },
  {
    id: 3,
    title: "Backup Completed",
    message: "Nightly backup completed successfully.",
    time: "1 hour ago",
    severity: "success",
    read: true,
  },
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        open,
        setOpen,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () =>
  useContext(NotificationContext);