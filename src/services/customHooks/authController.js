import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useLogin = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const loginResponse = await axiosInstance.post("/login", body);
      localStorage.setItem("token", loginResponse.data.token);
      return loginResponse;
    },
    onSuccess: () => {
      onSuccess("Welcome Back");
    },
    onError: () => {
      onError("Login Failed");
    },
  });
};
export const useLogout = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async () => {
      const logoutResponse = await axiosInstance.get("/logout");
      localStorage.removeItem("token");
      return logoutResponse;
    },
    onSuccess: () => {
      onSuccess("Goodbye");
    },
    onError: () => {
      onError("Logout Failed");
    },
  });
};
