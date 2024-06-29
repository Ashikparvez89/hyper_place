import React, { useContext } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const BidRequests = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["bidreq", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bidreq/${email}`);
      console.log("API Response:", res.data); // Log the data
      return res.data;
    },
    enabled: !!email, // Ensure query only runs if email is available
  });

  const handleStatus = async (id, prevStatus, status) => {
    if (prevStatus === status) return;
    try {
      const res = await axiosPublic.patch(`/bidreq/${id}`, { status });
      refetch();
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="mt-36">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-36">Error fetching data</div>;
  }

  if (!data) {
    return <div className="mt-36">No data available</div>;
  }

  console.log(data);
  return (
    <div className="my-36 container mx-auto">
      <p>
        Your Total Requests is:{" "}
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          {data.length}
        </span>
      </p>
      <div>
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
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remark
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((job) => (
              <tr key={job._id}>
                <td className="px-6 py-4 whitespace-nowrap">{job.jobName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.userMail}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-black ${
                      job.status === "Inprogress"
                        ? "bg-blue-400  "
                        : job.status === "complated"
                        ? "bg-green-500   "
                        : job.status === "Rejected"
                        ? "bg-red-400 "
                        : job.status === "pending"
                        ? "bg-yellow-300  "
                        : job.status === "canceled"
                        ? "bg-black text-white "
                        : ""
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      handleStatus(job._id, job.status, "Inprogress")
                    }
                    disabled={
                      job.status === "complated" || job.status === "canceled"
                    }
                    className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                  >
                    Accept
                  </button>
                  <button
                    disabled={
                      job.status === "complated" || job.status === "canceled"
                    }
                    onClick={() =>
                      handleStatus(job._id, job.status, "Rejected")
                    }
                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Reject
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {job.status === "canceled" ? (
                    <p>Canceled By User</p>
                  ) : (
                    <p>ata nai</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BidRequests;
