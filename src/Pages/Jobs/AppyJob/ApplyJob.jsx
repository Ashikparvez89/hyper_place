import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ApplyJob = ({ card }) => {
  console.log(card);
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const price = parseFloat(data.price);
    const minPrice = card.minPrice;
    const maxPrice = card.maxPrice;

    if (price < parseFloat(minPrice)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your Price should be Must Bigger than Minimum Price",
      });
    }
    if (price > parseFloat(maxPrice)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your Price should be Must smaller than Maximum Price",
      });
    }
    if (user.email === card.authorEmail) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your Price should be Must smaller than Maximum Price",
      });
    }
    const comment = data.comment;
    const userMail = user.email;
    const userName = user.displayName;
    const authourName = card.authorName;
    const authourEmail = card.authorEmail;
    const jobid = card._id;
    const category = card.category;
    const jobName = card.jobName;

    const deadline = card.deadline;
    const status = "pending";
    const bidData = {
      price,
      comment,
      userMail,
      userName,
      authourEmail,
      authourName,
      jobid,
      category,
      jobName,
      minPrice,
      maxPrice,
      deadline,
      status,
    };
    console.table(bidData);

    try {
      const { data } = await axiosPublic.post("/bids", bidData);
      console.log(data);
      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your Successsfully applied this job",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto px-8 py-14">
        <div className="bg-white rounded-lg shadow-lg px-10 py-10">
          <h2 className="text-lg font-medium mb-6">Payment Information</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="How Much You Want?"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("price", { required: "Price Is Required" })}
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="expiration-date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="expiration-date"
                  placeholder={user.email}
                  defaultValue={user.email}
                  disabled
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("email", {})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Comment
                </label>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Have Any comment"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("comment")}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  DeadLine
                </label>

                <div className="">
                  <DatePicker
                    className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
