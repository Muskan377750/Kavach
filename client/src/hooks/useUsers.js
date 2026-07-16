import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 const fetchUsers = async () => {
  try {
    const data = await getUsers();

    console.log("API Response:", data);
    console.log("Is Array:", Array.isArray(data));
    console.log("Length:", data.length);

    setUsers(data);
  } catch (err) {
    console.error(err);
    setError("Unable to load employees");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
}

export default useUsers;
