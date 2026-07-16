import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AuditTable from "../components/AuditTable";

import "../styles/auditlogs.css";


function AuditLogs(){

return(

<div className="dashboard-layout">


<Sidebar/>


<div className="dashboard-main">


<Navbar/>


<div className="dashboard-content">


<div className="audit-page">


<AuditTable/>


</div>


</div>


</div>


</div>

);

}


export default AuditLogs;