import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchTasks = () => {
  return useQuery({
    queryFn: async () => {
      const tasks = await axiosInstance.get("/tasks");
      return tasks;
    },
    queryKey: ["fetchTasks"],
  });
};
