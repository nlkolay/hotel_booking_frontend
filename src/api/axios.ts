import axios from "axios";

const axiosInstance = axios.create({
baseURL: "https://booking-app-7ug2.onrender.com/",
// "http://localhost:8000/" // for local development
// "https://booking-app-7ug2.onrender.com/"  // for production
withCredentials: true,
headers: {
"Content-Type": "application/json",
},
});

export default axiosInstance;