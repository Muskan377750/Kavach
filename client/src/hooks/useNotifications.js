import { useEffect, useState, useCallback } from "react";
import { getNotifications } from "../services/notificationService";
import socket from "../socket";

function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();

      setNotifications(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    socket.on("new-alert", () => {
      console.log("🔔 Notification Updated");
      fetchNotifications();
    });

    const interval = setInterval(fetchNotifications, 15000);

    return () => {
      socket.off("new-alert");
      clearInterval(interval);
    };
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
  };
}

export default useNotifications;