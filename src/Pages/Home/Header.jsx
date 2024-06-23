import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { GiArrowWings } from "react-icons/gi";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
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
  return (
    <div className="">
      <div className="navbar bg-base-100 fixed top-0 z-20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink>Browse</NavLink>
              </li>
              <li>
                <NavLink>Manage</NavLink>
              </li>
              <li>
                <NavLink>Groups</NavLink>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl ">
            <span className="flex items-center justify-center gap-2 text-blue-500 text-4xl">
              {" "}
              <GiArrowWings />
              <h1 className="text-black text-xl italic">Hyperss</h1>
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <NavLink>Browse</NavLink>
            </li>
            <li>
              <NavLink>Manage</NavLink>
            </li>
            <li>
              <NavLink>Groups</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <Link to={"/addjob"}>Add Jobs</Link>
                </li>
                <li>
                  <Link to="/myjobs">My Jobs</Link>
                </li>
                <li>
                  <Link to="/mybids">My Bids</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div className="">
                <Link to="/login">Log In</Link>
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
