import { createBrowserRouter } from "react-router-dom";
import Layouts from "./Layouts";
import Home from "../Pages/Home/Home";
import Register from "../Authintication/Register";
import LogIn from "../Authintication/LogIn";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <LogIn></LogIn>
      }
    ],
  },
]);
