import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchTasks = () => {
  return useQuery({
    queryFn: async () => {
      const tasks = await axiosInstance.get("/tasks");
      return tasks.data.data;
    },
    queryKey: ["get.tasks"],
    onError: (error) => {
      throw error;
    },
  });
};
