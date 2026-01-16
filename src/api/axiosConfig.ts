import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-gestion-empleados.onrender.com/api/remuneraciones',
  auth: {
    username: import.meta.env.VITE_API_USER,
    password: import.meta.env.VITE_API_PASS
  },
  withCredentials: true // 🔹 Importante si usas cookies/sesiones
});

export default api;
