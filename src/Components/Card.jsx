import React from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ job }) => {
  return (
    <div>
      <div>
        <div>
          <div className="max-w-screen-xl mx-auto py-8 px-5">
            <Link to={`/jobs/${job?._id}`} state={job}>
              <div className="rounded overflow-hidden shadow-lg">
                <div className="relative">
                  <div>
                    <img
                      className="w-full h-[300px]"
                      src={job?.image}
                      alt="Sunset in the mountains"
                    />
                    <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                  </div>
                  <div>
                    <div className="absolute capitalize bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                      {job.category}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                      <h1>Avialble</h1>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 text-left m-3">
                  <div className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
                    {job.jobName}
                  </div>
                  <p className="text-gray-500 text-sm">{job.jobDescription}</p>
                </div>
                <div className="px-6 py-4 flex flex-row items-center">
                  <span
                    href="#"
                    className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center"
                  >
                    <FaClock />
                    <div className="flex justify-evenly gap-10 items-center">
                      <span className="ml-1">
                        {" "}
                        Posted On : {job.postedDate}
                      </span>
                      <div className="flex justify-center items-center gap-2">
                        <h1>Min Price: {job.minPrice}</h1>
                        <h1>Max Price: {job.maxPrice}</h1>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
