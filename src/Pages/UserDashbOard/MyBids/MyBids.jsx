import React, { useContext } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyBids = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["biddata", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/mybids/${email}`);
      return res.data;
    },
  });
  console.log("Email:", email);
  console.log(data);
  console.log("Loading:", isLoading);
  console.log("Error:", isError);

  if (isLoading) {
    return <div className="mt-36">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-36">Error fetching data</div>;
  }

  const handleJob = (job) => {
    console.log(job);
  };
  return (
    <div className="mt-36 w-[90%] mx-auto">
      <h1>My Bids Page</h1>
      <div>
        {data ? (
          <div>
            <p>Data content: {data.length}</p>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {data.map((job) => (
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">{job.jobName}</td>
              <td class="px-6 py-4 whitespace-nowrap">{job.authourEmail}</td>
              <td class="px-6 py-4 whitespace-nowrap">{job.price}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 ${
                    job.status === "pending"
                      ? "bg-red-100 text-green-800 "
                      : job.status === "complated"
                      ? "bg-red-100 text-red-800 "
                      : job.status === "inprogress"
                      ? "bg-red-100 text-blue-800 "
                      : ""
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                  Cancel
                </button>
                <button
                  disabled={job.status !== "inprogress"}
                  onClick={() => handleJob(job)}
                  class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                >
                  submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBids;
