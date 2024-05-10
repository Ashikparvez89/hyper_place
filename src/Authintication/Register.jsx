import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, handleGoogle } = useContext(AuthContext);
  const [password, setPassword] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    const { email, password } = data;
    console.log(email, password);
    createUser(email, password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Logout Successfully",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  const handlepassword = () => {
    setPassword(!password);
  };

  return (
    <div className="">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl  ">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 mx-auto justify-center items-center">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://i.ibb.co/2YR0WVP/eugene-golovesov-e4-JOx-6-Mn-A-unsplash.jpg"
              alt=""
            />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome to DreamLuxe !
          </p>

          <div className="">
            <form onSubmit={handleSubmit(onsubmit)} action="">
              <div className="">
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    name="name"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    name="email"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="email"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    Photo URL
                  </label>
                  <input
                    name="photoURL"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    {...register("photoURL", { required: true })}
                  />
                </div>

                <div className="mt-4 relative">
                  <div className="flex justify-between">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                      Password
                    </label>
                  </div>

                  <input
                    id="loggingPassword"
                    name="password"
                    className="block relative w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type={password ? "password" : "text"}
                    {...register("password", { required: true })}
                  />
                  <span
                    className="cursor-pointer absolute top-10 right-4"
                    onClick={handlepassword}
                  >
                    {password ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                  </span>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <p className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">
              Sign in With
            </p>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>

          <div className="px-4 py-2">
            <SocialLogin></SocialLogin>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                Already Have an Account?
              </a>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>
            <div className="text-center py-5">
              <Link to="/login" className="underline text-blue-400">
                Please Log In Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
