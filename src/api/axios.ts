import axios from "axios";

const axiosInstance = axios.create({
baseURL: "https://booking-app-7ug2.onrender.com/",
withCredentials: true,
headers: {
"Content-Type": "application/json",
},
});

export default axiosInstance;