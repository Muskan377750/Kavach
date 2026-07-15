import axios from "axios";

const API = "http://localhost:5000/api/alerts";

const getToken = () => localStorage.getItem("token");

export const investigateAlert = (id) =>
  axios.put(
    `${API}/${id}/investigate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const resolveAlert = (id) =>
  axios.put(
    `${API}/${id}/resolve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );