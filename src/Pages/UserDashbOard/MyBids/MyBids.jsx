import React, { useContext } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyBids = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["biddata", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mybids/${email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="mt-36">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-36">Error fetching data</div>;
  }

  const handleJob = (job) => {
    console.log(job);
  };

  const handleStatus = async (id, prevStatus, status) => {
    console.log(id, prevStatus, status);
    const response = await axiosPublic.patch(`/bidreq/${id}`, { status });
    refetch();
    console.log(response);
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

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((job) => (
            <tr key={job._id}>
              <td className="px-6 py-4 whitespace-nowrap">{job.jobName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{job.authourEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap">{job.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-black ${
                    job.status === "pending"
                      ? "bg-yellow-300 "
                      : job.status === "complated"
                      ? "bg-green-500  "
                      : job.status === "Rejected"
                      ? "bg-red-500 "
                      : job.status === "canceled"
                      ? "bg-black text-white "
                      : job.status === "Inprogress"
                      ? "bg-blue-300 "
                      : ""
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleStatus(job._id, job.status, "canceled")}
                  disabled={job.status == "complated"}
                  className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatus(job._id, job.status, "complated")}
                  disabled={job.status !== "Inprogress"}
                  className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
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
