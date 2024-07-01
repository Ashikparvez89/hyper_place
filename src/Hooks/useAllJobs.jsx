import axios from "axios";
import React, { useEffect, useState } from "react";

const useAllJobs = () => {
  const [alljobs, setAlljobs] = useState([]);
  useEffect(() => {
    const fetchedJobs = async () => {
      const response = await axios.get("https://hypers-server.vercel.app/alljobs");
      setAlljobs(response.data);
    };
    fetchedJobs();
  }, []);
  return [alljobs];
};

export default useAllJobs;
