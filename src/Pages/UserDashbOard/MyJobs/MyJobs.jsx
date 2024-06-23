import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import EditJob from "./EditJobForm/EditJob";
import Swal from "sweetalert2";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [open, setOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const email = user?.email;

  const {
    data: jobs = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myjobs", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myjobs/${email}`);
      return res.data;
    },
    enabled: !!email, // Only run query if email is available
  });

  const onOpenModal = (job) => {
    setCurrentJob(job);
    setOpen(true);
  };

  const onCloseModal = () => {
    setCurrentJob(null);
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sky-400 text-4xl font-bold">Loading....</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sky-400 text-4xl font-bold">
        <p>{error.message}....</p>
      </div>
    );
  }

  const handleDelete = async (job) => {
    const { value: confirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed) {
      try {
        const res = await axiosPublic.delete(`/alljobs/${job?._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      } catch (error) {
        // Handle any error that occurs during deletion
        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the file.",
          icon: "error",
        });
        console.error("Error deleting file:", error);
      }
    }
  };

  return (
    <div className="mt-32">
      <div className="w-[90%] mx-auto">
        <p className="font-bold">Total Jobs: {jobs.length}</p>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job DeadLine
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="px-6 py-4 whitespace-nowrap">{job.jobName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(job.deadline).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap uppercase font-semibold ${
                    job.category === "seo"
                      ? "text-red-400"
                      : job.category === "web"
                      ? "text-blue-400"
                      : job.category === "digitalMarketing"
                      ? "text-green-400"
                      : job.category === "graphics"
                      ? "text-purple-400"
                      : ""
                  }`}
                >
                  {job.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{job.minPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.maxPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onOpenModal(job)}
                    className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(job)}
                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        {currentJob && (
          <EditJob
            state={"job"}
            currentJob={currentJob}
            onCloseModal={onCloseModal}
            refetch={refetch}
          />
        )}
      </Modal>
    </div>
  );
};

export default MyJobs;
