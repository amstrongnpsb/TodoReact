import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useToast } from "@/components/ui/use-toast";

export const useFetchTasks = () => {
  return useQuery({
    queryFn: async () => {
      const tasks = await axiosInstance.get("/tasks");
      return tasks;
    },
    queryKey: ["fetchTasks"],
  });
};
export const usePostTask = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (body) => {
      const tasksResponse = await axiosInstance.post("/tasks", body);
      return tasksResponse;
    },
    onSuccess: () => {
      onSuccess({ toast: toast, message: "Task created successfully" });
    },
    onError: () => {
      onError({ toast: toast, message: "Create Task Failed" });
    },
  });
};
export const useDeleteTask = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id) => {
      const tasksResponse = await axiosInstance.delete(`/tasks/${id}`);
      return tasksResponse;
    },
    onSuccess: () => {
      onSuccess({ toast: toast, message: "Task deleted successfully" });
    },
    onError: () => {
      onError({ toast: toast, message: "Delete Task Failed" });
    },
  });
};
export const useEditTask = ({ onSuccess, onError }) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (body) => {
      const tasksResponse = await axiosInstance.patch(
        `/tasks/${body.id}`,
        body
      );
      return tasksResponse;
    },
    onSuccess: () => {
      onSuccess({ toast: toast, message: "Task edited successfully" });
    },
    onError: () => {
      onError({ toast: toast, message: "Edit Task Failed" });
    },
  });
};
