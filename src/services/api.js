import axios from 'axios';

const API_URL = 'https://api.fitlife.com/registro&#39;,';

const api = axios.create({
    baseURL: API_URL,
});

// Interceptar las solicitudes para incluir el token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;