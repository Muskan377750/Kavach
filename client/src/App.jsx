import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuditLogs from "./pages/AuditLogs";
import Alerts from "./pages/Alerts";
import Users from "./pages/Users";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Other Pages */}
        <Route path="/alerts" element={<Alerts />} />

        <Route path="/audit" element={<AuditLogs />} />

        <Route path="/users" element={<Users />} />

        <Route path="/reports" element={<Reports />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;