import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Select from "react-select";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const img_Hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const options = [
  { value: "digitalMarketing", label: "digitalMarketing" },
  { value: "seo", label: "seo" },
  { value: "graphics", label: "graphics" },
  { value: "web", label: "web" },
];

const AddJobForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const jobName = data.name;
    const minPrice = data.minPrice;
    const maxPrice = data.maxPrice;
    const deadline = startDate;
    const postedDate = new Date();
    const authorName = user?.displayName;
    const authorImage = user?.photoURL;
    const authorEmail = user?.email;
    const jobDescription = data.description;
    const imageFIle = { image: data.jobImage[0] };
    const res = await axiosPublic.post(img_Hosting_api, imageFIle, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data.data.display_url);

    if (res.data.success) {
      const jobInfo = {
        jobName,
        minPrice,
        maxPrice,
        postedDate,
        deadline,
        category: selectedOption.value,
        authorName,
        authorImage,
        authorEmail,
        jobDescription,
        image: res.data.data.display_url,
      };
      console.table(jobInfo);
      const jobs = await axiosPublic.post("/addjobs", jobInfo);
      console.log(jobs.data);
      if (jobs.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Job added successfully",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    }
  };

  return (
    <div>
      <div class="bg-white  border-4 rounded-lg shadow relative m-10">
        <div class="flex items-start justify-between p-5 border-b rounded-t">
          <h3 class="text-xl font-semibold">Add Job </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="product-modal"
          ></button>
        </div>

        <div class="p-6 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="name"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Job Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Job name”"
                  required=""
                  {...register("name", {
                    required: "Job Name Is Required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="category"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Category
                </label>

                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={options}
                />
                {errors.category && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="minPrice"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Minimum Price
                </label>
                <input
                  type="text"
                  name="minPrice"
                  id="minPrice"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="0"
                  {...register("minPrice", {
                    required: "Job Name Is Required",
                  })}
                />
                {errors.minPrice && (
                  <p className="text-red-500">{errors.minPrice.message}</p>
                )}
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="maxPrice"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Maximum Price
                </label>
                <input
                  type="text"
                  name="maxPrice"
                  id="maxPrice"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="0"
                  {...register("maxPrice", {
                    required: "maxPrice Name Is Required",
                  })}
                />
                {errors.minPrice && (
                  <p className="text-red-500">{errors.maxPrice.message}</p>
                )}
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="date"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Job DeadLine
                </label>
                <DatePicker
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full py-2.5 px-12 cursor-pointer"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <div class="mx-auto max-w-xs">
                  <label
                    for="example1"
                    class="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Upload file
                  </label>
                  <input
                    id="example1"
                    type="file"
                    class="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                    {...register("jobImage")}
                  />
                </div>
              </div>
              <div class="col-span-full">
                <label
                  for="product-details"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Job Details
                </label>
                <textarea
                  id="description"
                  rows="6"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
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
            <div class="p-6 border-t border-gray-200 rounded-b">
              <button
                class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Save all
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
