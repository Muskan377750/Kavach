import api from "./api";


// GET ALL ALERTS

export const getAlerts = async () => {

    const response = await api.get("/alerts");

    return response.data;

};



// INVESTIGATE ALERT

export const investigateAlert = async(id)=>{

    const response = await api.put(
        `/alerts/${id}/investigate`
    );

    return response.data;

};



// RESOLVE ALERT

export const resolveAlert = async(id)=>{

    const response = await api.put(
        `/alerts/${id}/resolve`
    );

    return response.data;

};