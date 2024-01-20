import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const usePostTask = (body) => {
  return useQuery({
    queryFn: async () => {
      const tasks = await axiosInstance.get("/tasks", body);
      return tasks.data.data;
    },
    queryKey: ["post.tasks"],
    onError: (error) => {
      throw error;
    },
  });
};
