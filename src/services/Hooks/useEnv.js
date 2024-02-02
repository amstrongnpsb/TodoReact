import { useEffect, useState } from "react";

export const useEnv = () => {
  const [baseURL, setBaseURL] = useState("");

  useEffect(() => {
    const updateBaseURL = () => {
      import.meta.env.VITE_ENV === "laragon"
        ? setBaseURL(import.meta.env.VITE_LARAGON_URL)
        : setBaseURL(import.meta.env.VITE_UBUNTU_URL);
    };

    updateBaseURL();
  }, []);

  return baseURL;
};
