import axios from 'axios';


const baseUrl = import.meta.env.VITE_APP_API_URL;
console.log(baseUrl)
const axiosInstance = axios.create({
  baseURL:  baseUrl, 
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('token');
      
      window.location.reload();
      
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;