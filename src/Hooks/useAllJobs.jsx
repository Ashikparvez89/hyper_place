import axios from "axios";
import React, { useEffect, useState } from "react";

const useAllJobs = () => {
  const [alljobs, setAlljobs] = useState([]);
  useEffect(() => {
    const fetchedJobs = async () => {
      const response = await axios.get("http://localhost:5000/alljobs");
      setAlljobs(response.data);
    };
    fetchedJobs();
  }, []);
  return [alljobs];
};

export default useAllJobs;
