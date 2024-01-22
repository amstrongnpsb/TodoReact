import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchTasks = ({ onError }) => {
  return useQuery({
    queryFn: async () => {
      const tasks = await axiosInstance.get("/tasks");
      return tasks;
    },
    onError,
    queryKey: ["fetchTasks"],
  });
};
export const usePostTask = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const tasksResponse = await axiosInstance.post("/tasks", body);
      return tasksResponse;
    },
    onSuccess,
    onError,
  });
};
export const useDeleteTask = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      const tasksResponse = await axiosInstance.delete(`/tasks/${id}`);
      return tasksResponse;
    },
    onSuccess,
    onError,
  });
};
export const useEditTask = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const tasksResponse = await axiosInstance.patch(
        `/tasks/${body.id}`,
        body
      );
      return tasksResponse;
    },
    onSuccess,
    onError,
  });
};
