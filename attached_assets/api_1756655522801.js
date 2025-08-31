import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://main-website-7au1.onrender.com/api' || 'https://xpr-backend.onrender.com/api',
});

