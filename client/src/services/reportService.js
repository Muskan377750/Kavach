import axios from "axios";

const API = "http://localhost:5000/api/reports";

export const getReports = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(API,{

        headers:{

            Authorization:`Bearer ${token}`

        }

    });

    return res.data;

}