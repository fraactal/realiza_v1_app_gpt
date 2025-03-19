import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6005', // URL de tu API
});

// agregar el token a cada petición si existe en localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
