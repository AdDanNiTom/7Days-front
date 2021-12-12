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