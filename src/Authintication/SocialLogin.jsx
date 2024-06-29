import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleGoogle, handleGithub } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const googleLogIn = async () => {
    handleGoogle()
      .then(async (result) => {
        navigate(navigate?.state ? navigate?.state : "/");
        const email = result?.user?.email;
        const response = await axiosPublic.post(
          "/jwt",
          { email },
          { withCredentials: true }
        );
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Log In Successfully",
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
  const githubLogin = () => {
    handleGithub()
      .then((result) => {
        navigate(navigate?.state ? navigate?.state : "/");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Log In Successfully",
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
  return (
    <div>
      <div className="">
        <a
          onClick={googleLogIn}
          className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <span className="text-2xl">
            <FcGoogle />
          </span>
          <span className="w-5/6 px-4 py-3 font-bold text-center">
            Sign in with Google
          </span>
        </a>
        <a
          onClick={githubLogin}
          className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <span className="text-2xl">
            <FaGithub />
          </span>
          <span className="w-5/6 px-4 py-3 font-bold text-center">
            Sign in with Github
          </span>
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
