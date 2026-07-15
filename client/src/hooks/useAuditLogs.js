import { useEffect, useState } from "react";
import api from "../api/api";

function useAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get("/audit");
        setLogs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load audit logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return { logs, loading, error };
}

export default useAuditLogs;