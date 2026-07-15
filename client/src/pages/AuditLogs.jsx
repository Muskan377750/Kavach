import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AuditTable from "../components/AuditTable";

function AuditLogs() {

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <AuditTable />

      </div>

    </div>

  );

}

export default AuditLogs;