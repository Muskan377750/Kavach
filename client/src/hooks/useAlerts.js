import { useEffect, useState, useCallback } from "react";
import { getAlerts } from "../services/alertService";

function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAlerts();

      setAlerts(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load alerts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    loading,
    error,
    fetchAlerts,
  };
}

export default useAlerts;