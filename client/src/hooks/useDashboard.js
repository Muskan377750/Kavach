import { useEffect, useState, useCallback } from "react";
import { getDashboardData } from "../services/dashboardService";

function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      const data = await getDashboardData();

      console.log("Dashboard API Response:", data);

      setDashboard(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(fetchDashboard, 15000);

    return () => clearInterval(interval);
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
  };
}

export default useDashboard;