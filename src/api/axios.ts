import axios from "axios";

const axiosInstance = axios.create({
baseURL: "http://103.13.211.15/",
// "http://localhost:8000/" // for local development
// "https://booking-app-7ug2.onrender.com/"  // for production on render
// "http://103.13.211.15/" // for production on seege
withCredentials: true,
headers: {
"Content-Type": "application/json",
},
});

export default axiosInstance;