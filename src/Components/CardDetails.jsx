import React, { useState } from "react";
import { FaGithub, FaStar, FaYoutube } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ApplyJob from "../Pages/Jobs/AppyJob/ApplyJob";
const CardDetails = () => {
  const location = useLocation();
  const card = location.state;

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <section className="container mx-auto p-10 md:p-20 antialiased mt-10">
        <article className=" flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-7xl group cursor-pointer">
          <img className="w-1/2 object-cover" src={card?.image} alt="" />
          <div className="w-1/2">
            <div className="p-5 pb-10">
              <h1 className="text-2xl font-semibold text-gray-800 mt-4">
                {card.jobName}
              </h1>
              <p className="text-lg text-black mt-4 leading-relaxed">
                {card.jobDescription}
              </p>
            </div>
            <div className="bg-blue-50 p-5">
              <div className="sm:flex sm:justify-between">
                <div>
                  <div className="text-lg text-gray-700">
                    <span className="text-gray-900 font-bold">
                      Posted On :{" "}
                    </span>{" "}
                    {card.postedDate}
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                    </div>
                    <div className="text-gray-600 ml-2 text-sm md:text-base mt-1 gap-5 inline-flex items-center">
                      <span> Min Price: {card.minPrice} $</span>
                      <span> Max Price: {card.maxPrice} $</span>
                    </div>
                  </div>
                </div>

                {/* Modal Compononets */}
                <button
                  className="btn btn-outline btn-secondary"
                  onClick={onOpenModal}
                >
                  Apply Job
                </button>
                <Modal open={open} onClose={onCloseModal} center>
                  <ApplyJob card={card}></ApplyJob>
                </Modal>
              </div>

              <div className=" w-full dark:bg-gray-900">
                <div className="relative w-full max-w-2xl my-8 md:my-16  sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">
                  <span className="text-xl font-semibold ml-8">
                    About Authour :
                  </span>
                  <div className="flex flex-col items-center space-y-4 sm:flex-row justify-between">
                    <div className="w-full flex justify-center sm:justify-start sm:w-auto">
                      <img
                        className="object-cover w-20 h-20 mt-3 mr-3 rounded-full"
                        src={card.authorImage}
                      />
                    </div>
                    <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
                      <p
                        className="font-display mb-2 text-xl font-semibold dark:text-gray-200"
                        itemProp="author"
                      >
                        {card.authorName}{" "}
                      </p>
                      <div className="flex gap-4">
                        <a
                          title="youtube url"
                          href="https://www.youtube.com/@mcqmate"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>
                            <FaYoutube></FaYoutube>
                          </span>
                        </a>
                        <a
                          title="website url"
                          href="https://mcqmate.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>
                            <FaGithub></FaGithub>
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="">
                      <h1 className="font-bold">
                        {" "}
                        Apply Before :
                        {new Date(card.deadline).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default CardDetails;
