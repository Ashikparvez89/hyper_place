import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import Title from "../../Components/Shared/Title";
import useAxiosPublic from "..//../Hooks/useAxiosPublic";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const Alljobs = () => {
  const axiosPublic = useAxiosPublic();
  const [alljobs, setAlljobs] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState();
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  // -----------------------------------//
  // 1.Fetch Total job number from dsatabase for pagination
  // --------------------------------//

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axiosPublic.get(
          `/alljobs-count?filter=${selectedCategory}&search=${search}`
        );
        setCount(response.data.count);
      } catch (error) {
        console.log("error fetching count", error);
      }
    };
    fetchCount();
  }, [axiosPublic, selectedCategory, search]);

  // -----------------------------------//
  // 2.Fetch All Jobs Here from db
  // --------------------------------//

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosPublic.get(
          `all-jobs?size=${currentPage}&page=${itemsPerPage}&filter=${selectedCategory}&sort=${sort}&search=${search}`
        );
        setAlljobs(response.data);
      } catch (error) {
        console.log("error fetching job", error);
      }
    };
    fetchJobs();
  }, [axiosPublic, currentPage, itemsPerPage, selectedCategory, sort, search]);

  // -----------------------------------//
  // 2. Set the pages elemnt by usinfg dependency
  // --------------------------------//
  useEffect(() => {
    if (count > 0) {
      const totalPages = Math.ceil(count / itemsPerPage);
      setNumberOfPages(totalPages);
      const pagination = [...Array(totalPages).keys()].map(
        (element) => element + 1
      );
      setPages(pagination);
    }
  }, [count, itemsPerPage]);

  // const handleSelectChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectedCategory(selectedValue);
  // };

  const handleBtnNumber = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };
  console.log(search);
  return (
    <div className="my-36 container mx-auto">
      <div className="flex gap-5 items-center justify-center">
        {/* -------------------------------------- */}
        {/* ------------Sort By Category ----------*/}
        {/* -------------------------------------- */}

        <div className="w-1/4">
          <select
            // onChange={(handleSelectChange, setCurrentPage(1))}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            id="pricingType"
            name="pricingType"
            value={selectedCategory}
            className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          >
            <option value="All" selected="">
              Select Category
            </option>
            <option value="digitalMarketing">digitalMarketing</option>
            <option value="graphics">graphics</option>
            <option value="seo">seo</option>
            <option value="web">web</option>
          </select>
        </div>

        {/* -------------------------------------- */}
        {/* ------------Search Bar ----------------*/}
        {/* -------------------------------------- */}

        <div className=" w-2/4 mx-auto flex justify-center gap-3">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3"
          >
            <div className="flex">
              <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                placeholder="Search for the tool you like"
                name="searchTxt"
                className="w-2/3 md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {/* ------------------------------------------------------------- */}
        {/* ------------Sort By Accesding and discending order -----------*/}
        {/* ------------------------------------------------------------- */}
        <div className="w-1/4">
          <select
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
            id="pricingType"
            name="pricingType"
            value={sort}
            className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          >
            <option value="All" selected="">
              Sort By DeadLine
            </option>
            <option value="asc">Sort by Ascesding</option>
            <option value="dsc">Sort By Descending</option>
          </select>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* ------------Filter Reset Button-----------*/}
        {/* ------------------------------------------------------------- */}

        <div className="flex max-w-sm rounded-xl bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg">
          <button
            onClick={handleReset}
            className="flex-1 font-bold text-xl bg-white px-6 py-2 rounded-xl"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ------------All Job Card here----------*/}
      {/* ------------------------------------------------------------- */}

      <div className="my-5">
        <Title
          heading={"Browse all Jobs"}
          sHeading={"Take a look Of our exiting Job"}
        ></Title>
      </div>

      <div className="container mx-auto grid grid-cols-3 gap-5">
        {alljobs?.map((job, idx) => (
          <Card key={idx} job={job}></Card>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ------------Pagination Part here----------*/}
      {/* ------------------------------------------------------------- */}

      <div className="flex justify-center">
        <nav
          className="mb-4 flex justify-center space-x-4"
          aria-label="Pagination"
        >
          <button
            onClick={() => handleBtnNumber(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-teal-500 px-2 py-2 text-gray-700"
          >
            <span className="sr-only">Previous</span>
            <MdOutlineKeyboardArrowLeft />
          </button>

          {pages?.map((page) => (
            <button
              onClick={() => handleBtnNumber(page)}
              // disabled={currentPage === numberOfPages}
              key={page}
              className={`"rounded-lg ${
                currentPage === page ? "bg-teal-500 text-white" : ""
              } border border-teal-500 px-4 py-2 text-gray-700 rounded-lg hover:bg-teal-500 hover:text-white"`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handleBtnNumber(currentPage + 1)}
            disabled={currentPage === numberOfPages}
            className="rounded-lg border border-teal-500 px-2 py-2 text-gray-700"
            href="/page/2"
          >
            <span className="sr-only">Next</span>
            <MdOutlineKeyboardArrowRight />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Alljobs;
