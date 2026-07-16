import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Alerts from "./pages/Alerts";
import AuditLogs from "./pages/AuditLogs";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { SearchProvider } from "./context/SearchContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";

function App() {


return (
<ThemeProvider>
    <SidebarProvider>
<SearchProvider>
  <NotificationProvider>

<BrowserRouter>

<Routes>


{/* Default Login */}

<Route
path="/"
element={<Login />}
/>



{/* Dashboard */}

<Route
path="/dashboard"
element={<Dashboard />}
/>



{/* Security Pages */}

<Route
path="/alerts"
element={<Alerts />}
/>


<Route
path="/audit"
element={<AuditLogs />}
/>


<Route
path="/users"
element={<Users />}
/>


<Route
path="/reports"
element={<Reports />}
/>


<Route
path="/settings"
element={<Settings />}
/>



</Routes>

</BrowserRouter>

</NotificationProvider>
</SearchProvider>
</SidebarProvider>
</ThemeProvider>
);

}


export default App;