import axios from "axios";
let baseURL = "";
import.meta.env.VITE_ENV === "laragon"
  ? (baseURL = import.meta.env.VITE_LARAGON_URL)
  : (baseURL = import.meta.env.VITE_UBUNTU_URL);
export const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
