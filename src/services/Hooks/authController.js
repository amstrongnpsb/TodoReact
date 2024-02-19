import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const useLogin = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body) => {
      const loginResponse = await axiosInstance.post("/login", body);
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("user", loginResponse.data.data.email);
      return loginResponse;
    },
    onSuccess: () => {
      onSuccess({
        toast: toast,
        message: "Welcome Back",
        navigate: navigate("/todolist"),
      });
    },
    onError: () => {
      onError({
        toast: toast,
        message: "Login Failed",
      });
    },
  });
};
export const useLogout = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const logoutResponse = await axiosInstance.get("/logout");
      localStorage.removeItem("token");
      return logoutResponse;
    },
    onSuccess: () => {
      onSuccess({
        toast: toast,
        message: "Goodbye",
        navigate: navigate("/login"),
      });
    },
    onError: () => {
      onError({ toast: toast, message: "Logout Failed" });
    },
  });
};

export const useRegister = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body) => {
      const userResponse = await axiosInstance.post("/register", body);
      return userResponse;
    },
    onSuccess: () => {
      onSuccess({
        toast: toast,
        message: "Please login",
        navigate: navigate("/login"),
      });
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
      onError({ toast: toast, message: ErrorMessage });
    },
  });
};
