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

export const useRegister = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const userResponse = await axiosInstance.post("/register", body);
      return userResponse;
    },
    onSuccess: () => {
      onSuccess("Please login");
    },
    onError: (error) => {
      const errorObject = error.response.data;
      const objectKeys = Object.keys(errorObject)[0];
      function extractErrorMessage(errorObject, key) {
        if (errorObject[key] && errorObject[key].length > 0) {
          return errorObject[key][0];
        }
        return null;
      }
      const ErrorMessage = extractErrorMessage(errorObject, objectKeys);
      onError(ErrorMessage);
    },
  });
};
