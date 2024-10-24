import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5001/api',
  // baseURL: 'https://mamaput-api.onrender.com/api/', 
  headers: {
    // "ngrok-skip-browser-warning": "69420",
    'Content-Type': 'application/json',
  },
});

export default apiClient;
