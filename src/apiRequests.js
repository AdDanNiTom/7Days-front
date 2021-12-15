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

export const fetchOneEvent = async (key) => {
    const res = await api.get(`/api/events/${key.queryKey[1]}`);
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

// GET THE IMAGES FROM CLOUDINARY
const errorHandler = (err) => {
    throw err;
}

export const getUser = () => {
    return api
    .get("/api/users")
    .then((res) => res.data)
    .catch(errorHandler)
}

export const uploadImage = (file) => {
  return api
    .post("/api/users/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};
 
export const editUser = (editedUser) => {
  return api
    .put("/api/users/edit", editedUser)
    .then(res => res.data)
    .catch(errorHandler);
};