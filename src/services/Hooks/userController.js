import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useToast } from "@/components/ui/use-toast";

export const useFetchUsers = () => {
  return useQuery({
    queryFn: async () => {
      const users = await axiosInstance.get("/users");
      return users;
    },
    queryKey: ["fetchUsers"],
  });
};
export const useFetchOnlineUsers = () => {
  return useQuery({
    queryFn: async () => {
      const onlineUsers = await axiosInstance.get("/online-users");
      return onlineUsers;
    },
    queryKey: ["fetchOnlineUsers"],
  });
};
export const usePostUser = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (body) => {
      const userResponse = await axiosInstance.post("/users", body);
      return userResponse;
    },
    onSuccess: () => {
      onSuccess({ toast: toast, message: "User created successfully" });
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
export const useDeleteUser = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id) => {
      const userResponse = await axiosInstance.delete(`/users/${id}`);
      return userResponse;
    },
    onSuccess: () => {
      onSuccess({ toast: toast, message: "User deleted successfully" });
    },
    onError: () => {
      onError({ toast: toast, message: "Delete User Failed" });
    },
  });
};
export const useRestoreUser = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id) => {
      const userResponse = await axiosInstance.get(`/users/restore/${id}`);
      return userResponse;
    },
    onSuccess: () => {
      onSuccess({ toast: toast, message: "User restored successfully" });
    },
    onError: () => {
      onError({ toast: toast, message: "Restoring User Failed" });
    },
  });
};
export const useEditUser = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (body) => {
      const id = body.get("id");
      body.append("_method", "PATCH");
      // for (let pair of body.entries()) {
      //   console.log(pair[0], pair[1], pair[1] == "");
      // }
      const userResponse = await axiosInstance.post(`/users/${id}`, body);
      return userResponse;
    },
    onSuccess: () => {
      onSuccess({ toast: toast, message: "User edit successfully" });
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
