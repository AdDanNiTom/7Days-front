import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;
const storedToken = localStorage.getItem("authToken");


// WE CREATE THE BASE URL
const api = axios.create({baseURL: API_URI, 
    headers: { Authorization: `Bearer ${storedToken}` }})

// GET ALL EVENTS
export const fetchAllEvents = async () => {
    const res = await api.get(`/api/events`);
    return res.data.data
}

// GET SELECTED DAY'S EVENTS
export const fetchSelectedDayEvents = async (key) => {
    try {
        if (key.queryKey[2]) {
        const res = await api.get(`/api/events/?day=${key.queryKey[1]}&category=${key.queryKey[2]}`);
        return res.data.data}
        
        else{
        const res = await api.get(`/api/events/?day=${key.queryKey[1]}`);
        return res.data.data}
    } catch (error) {
        console.log(error)
    }
}