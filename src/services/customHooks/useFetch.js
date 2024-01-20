import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (url) => {
    try {
      const response = await axiosInstance.get(url);
      console.log(response);
      setData(response.data["data"]);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        setData({
          code: 400,
          message: `Error, ${error.response.status} | Endpoint Invalid`,
        });
        setIsLoading(false);
        console.log("Request failed with status code", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        setData({
          code: 503,
          message: "HTTP Status Code 503 - Service Unavailable",
        });
        setIsLoading(false);
      } else {
        // Something happened in setting up the request that triggered an Error
        setData({
          code: 500,
          message: `Error, ${error.message}`,
        });
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchData(url);
  }, [url]);

  const reFetchData = (url) => {
    fetchData(url);
  };
  return { data, isLoading, reFetchData };
};
