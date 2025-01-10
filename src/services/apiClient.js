import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://127.0.0.1:5001/api",
  // baseURL: "http://127.0.0.1:5001/api",
  baseURL: "https://mamaput-api.onrender.com/api/",
  headers: {
    // "ngrok-skip-browser-warning":  "69420",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("site_token"); // Adjust this to your token storage method
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
