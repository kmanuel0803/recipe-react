import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: API_BASE_URL
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
  
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
            localStorage.removeItem('token')
      }
      return Promise.reject(error);
    }
  );

export default axiosClient;