import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const EditJob = ({ currentJob, refetch, onCloseModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic();

  //   useEffect(() => {}, [currentJob]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { jobName, minPrice, maxPrice, jobDescription } = currentJob || {};

  const onSubmit = async (data) => {
    const jobName = data.name;
    const minPrice = data.minPrice;
    const maxPrice = data.maxPrice;
    const jobDescription = data.description;
    const updateInfo = { jobName, jobDescription, minPrice, maxPrice };
    const id = currentJob?._id;

    try {
      const response = await axiosPublic.put(`/alljobs/${id}`, updateInfo);

      if (response.data.modifiedCount === 1) {
        refetch();
        onCloseModal();
        Swal.fire({
          icon: "success",
          title: "Edited Done Successfully...",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div>
        <div className="bg-white  border-4 rounded-lg shadow relative m-10">
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Edit Job </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="product-modal"
            ></button>
          </div>

          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Job Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Job name”"
                    required=""
                    defaultValue={jobName}
                    {...register("name", {
                      required: "Job Name Is Required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Job DeadLine
                  </label>
                  <DatePicker
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full py-2.5 px-12 cursor-pointer"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="minPrice"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Minimum Price
                  </label>
                  <input
                    defaultValue={minPrice}
                    type="text"
                    name="minPrice"
                    id="minPrice"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="0"
                    {...register("minPrice", {
                      required: "Job Name Is Required",
                    })}
                  />
                  {errors.minPrice && (
                    <p className="text-red-500">{errors.minPrice.message}</p>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="maxPrice"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Maximum Price
                  </label>
                  <input
                    type="text"
                    name="maxPrice"
                    defaultValue={maxPrice}
                    id="maxPrice"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="0"
                    {...register("maxPrice", {
                      required: "maxPrice Name Is Required",
                    })}
                  />
                  {errors.minPrice && (
                    <p className="text-red-500">{errors.maxPrice.message}</p>
                  )}
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="product-details"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Job Details
                  </label>
                  <textarea
                    id="description"
                    defaultValue={jobDescription}
                    rows="6"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                    placeholder="Details"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 rounded-b">
                <button
                  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  type="submit"
                >
                  Save all
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
