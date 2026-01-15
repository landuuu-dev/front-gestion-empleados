import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/remuneraciones',
  auth: {
    username: import.meta.env.VITE_API_USER,
    password: import.meta.env.VITE_API_PASS
  }
});

export default api;