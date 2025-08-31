import axios from "axios";

const API = axios.create({
    baseURL: 'https://main-website-7au1.onrender.com/api' || 'http://localhost:5000/api',
    timeout: 20000,
});

API.interceptors.request.use((cfg) => {
    const token = localStorage.getItem("token");
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

export default API;



