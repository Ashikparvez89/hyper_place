import React, { useContext, useState } from "react";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const LogIn = () => {
  const [password, setPassword] = useState(true);
  const { logInUser } = useContext(AuthContext);
  const location = useLocation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    const { email, password } = data;
    console.log(email, password);
    logInUser(email, password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Logout Successfully",
        });
        navigate(navigate?.state? navigate?.state : '/')
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
  console.log(password);
  return (
    <div>
      <div className="py-20">
        <div className="flex h-full items-center justify-center">
          <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
            <div className="flex h-full flex-col justify-center gap-4 p-6">
              <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                <form
                  onSubmit={handleSubmit(onsubmit)}
                  className="flex flex-col gap-4 pb-4"
                >
                  <h1 className="mb-4 text-2xl font-bold  dark:text-white">
                    Login
                  </h1>
                  <div>
                    <div className="mb-2">
                      <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                        Email:
                      </label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <div className="relative w-full">
                        <input
                          className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          id="email"
                          type="email"
                          name="email"
                          placeholder="email@example.com"
                          {...register("email", { required: true })}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        data-testid="flowbite-label"
                      >
                        Password
                      </label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1 relative">
                      <div className="relative w-full">
                        <input
                          className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          id="password"
                          type={password ? "password" : "text"}
                          name="password"
                          {...register("password", { required: true })}
                        />
                      </div>
                      <div className="absolute top-4 right-4">
                        <span
                          className="cursor-pointer"
                          onClick={handlepassword}
                        >
                          {password ? (
                            <FaEye></FaEye>
                          ) : (
                            <FaEyeSlash></FaEyeSlash>
                          )}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">
                      Forgot password?
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                    >
                      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                        Login
                      </span>
                    </button>
                  </div>
                </form>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                  <p className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">
                    Sign in With
                  </p>

                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
                <SocialLogin></SocialLogin>
                <div className="min-w-[270px]">
                  <div className="mt-4 text-center dark:text-gray-200">
                    New user?
                    <Link
                      to="/register"
                      className="text-blue-500 underline hover:text-blue-600"
                      href="/signup"
                    >
                      Create account here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
