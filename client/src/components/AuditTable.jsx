import { useState } from "react";

import {
FaDownload,
FaSearch,
FaShieldAlt,
FaCheckCircle,
FaTimesCircle,
FaExclamationTriangle
} from "react-icons/fa";


import useAuditLogs from "../hooks/useAuditLogs";

import "../styles/auditlogs.css";



function AuditTable(){


const {
logs,
loading,
error
}=useAuditLogs();



const [search,setSearch]=useState("");

const [risk,setRisk]=useState("All");




const filteredLogs = logs.filter((log)=>{


const text =
search.toLowerCase();



const matchesSearch =

(log.user?.name || "")
.toLowerCase()
.includes(text)

||

(log.action || "")
.toLowerCase()
.includes(text)

||

(log.ipAddress || "")
.toLowerCase()
.includes(text);



const matchesRisk =

risk==="All"

||

log.riskLevel===risk;



return matchesSearch && matchesRisk;


});





const exportLogs=()=>{


const file =
JSON.stringify(
filteredLogs,
null,
2
);



const blob =
new Blob(
[file],
{
type:"application/json"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;

link.download=
"KAVACH-Audit-Logs.json";


link.click();


};





if(loading)

return(

<div className="audit-loading">

Loading Audit Logs...

</div>

);



if(error)

return(

<div className="audit-error">

{error}

</div>

);




return(


<div className="audit-container">



<div className="audit-summary">



<div className="audit-card">

<div className="audit-icon blue">
<FaShieldAlt/>
</div>

<div>

<h2>
{logs.length}
</h2>

<p>
Total Logs
</p>

</div>

</div>





<div className="audit-card">

<div className="audit-icon green">
<FaCheckCircle/>
</div>


<div>

<h2>
{
logs.filter(
l=>l.status==="Success"
).length
}
</h2>

<p>
Successful
</p>


</div>

</div>





<div className="audit-card">

<div className="audit-icon red">
<FaTimesCircle/>
</div>


<div>

<h2>
{
logs.filter(
l=>l.status==="Failed"
).length
}
</h2>

<p>
Failed
</p>


</div>

</div>





<div className="audit-card">

<div className="audit-icon orange">
<FaExclamationTriangle/>
</div>


<div>

<h2>
{
logs.filter(
l=>l.riskLevel==="Critical"
).length
}
</h2>

<p>
Critical
</p>


</div>

</div>



</div>






<div className="audit-top">


<div>

<h1>
📋 Security Audit Center
</h1>


<p>
Track privileged user activities and system events
</p>


</div>




<div className="audit-tools">



<div className="audit-search">


<FaSearch/>


<input

placeholder="Search user, action, IP..."

value={search}

onChange={
(e)=>setSearch(e.target.value)
}

/>


</div>





<select

value={risk}

onChange={
(e)=>setRisk(e.target.value)
}

>

<option>
All
</option>

<option>
Critical
</option>

<option>
High
</option>

<option>
Medium
</option>

<option>
Low
</option>


</select>





<button
onClick={exportLogs}
>

<FaDownload/>

Export

</button>



</div>



</div>







<div className="audit-table-box">


<table>


<thead>

<tr>

<th>
Employee
</th>


<th>
Action
</th>


<th>
Status
</th>


<th>
Risk
</th>


<th>
IP Address
</th>


<th>
Time
</th>


</tr>

</thead>




<tbody>


{

filteredLogs.length===0 ?


<tr>

<td colSpan="6"
className="empty-row">

No audit records found

</td>

</tr>



:


filteredLogs.map(
(log)=>(


<tr key={log._id}>


<td>

{
log.user?.name ||
"Unknown"
}

</td>



<td>

{
log.action ||
"N/A"
}

</td>




<td>

<span

className={
`status-pill ${
(log.status||"unknown")
.toLowerCase()
}`
}

>

{
log.status ||
"Unknown"
}

</span>


</td>





<td>

<span

className={
`risk-pill ${
(log.riskLevel||"low")
.toLowerCase()
}`
}

>


{
log.riskLevel ||
"Low"
}


</span>


</td>




<td>

{
log.ipAddress ||
"N/A"
}

</td>



<td>

{
log.createdAt ?

new Date(
log.createdAt
)
.toLocaleString()

:

"Unknown"

}

</td>


</tr>


)

)


}


</tbody>


</table>


</div>




</div>


);


}


export default AuditTable;