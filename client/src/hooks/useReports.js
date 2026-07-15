import { useEffect,useState } from "react";

import { getReports } from "../services/reportService";

function useReports(){

const [reports,setReports]=useState(null);

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");

const fetchReports=async()=>{

try{

const data=await getReports();

setReports(data);

}
catch(err){

setError("Unable to load reports");

}
finally{

setLoading(false);

}

}

useEffect(()=>{

fetchReports();

},[]);

return{

reports,

loading,

error,

fetchReports

}

}

export default useReports;