import api from "../api/api";

export const getAlerts = async () => {
  const response = await api.get("/alerts");
  return response.data;
};