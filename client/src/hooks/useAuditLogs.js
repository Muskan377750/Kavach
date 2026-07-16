import { useEffect,useState } from "react";

import api from "../api/api";


function useAuditLogs(){


const [logs,setLogs]=useState([]);

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");



const fetchLogs=async()=>{


try{


setLoading(true);


const response =
await api.get("/audit");


setLogs(
response.data || []
);



}
catch(err){


console.error(
"Audit fetch error:",
err
);


setError(
err.response?.data?.message ||
"Unable to load audit logs"
);


}
finally{


setLoading(false);


}


};




useEffect(()=>{


fetchLogs();


},[]);




return{

logs,

loading,

error,

fetchLogs

};


}


export default useAuditLogs;