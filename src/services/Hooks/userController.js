import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchUsers = () => {
  return useQuery({
    queryFn: async () => {
      const users = await axiosInstance.get("/users");
      return users;
    },
    queryKey: ["fetchUsers"],
  });
};
export const usePostUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const userResponse = await axiosInstance.post("/users", body);
      return userResponse;
    },
    onSuccess: () => {
      onSuccess("User created successfully");
    },
    onError: () => {
      onError("Create User Failed");
    },
  });
};
export const useDeleteUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      const userResponse = await axiosInstance.delete(`/users/${id}`);
      return userResponse;
    },
    onSuccess: () => {
      onSuccess("User deleted successfully");
    },
    onError: () => {
      onError("Delete User Failed");
    },
  });
};
export const useRestoreUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      const userResponse = await axiosInstance.get(`/users/restore/${id}`);
      return userResponse;
    },
    onSuccess: () => {
      onSuccess("User restored successfully");
    },
    onError: () => {
      onError("Restoring User Failed");
    },
  });
};
// export const useEditTask = ({ onSuccess, onError }) => {
//   return useMutation({
//     mutationFn: async (body) => {
//       const tasksResponse = await axiosInstance.patch(
//         `/tasks/${body.id}`,
//         body
//       );
//       return tasksResponse;
//     },
//     onSuccess: () => {
//       onSuccess("Task edited successfully");
//     },
//     onError: () => {
//       onError("Edit Task Failed");
//     },
//   });
// };
