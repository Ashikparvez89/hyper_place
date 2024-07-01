import { createBrowserRouter } from "react-router-dom";
import Layouts from "./Layouts";
import Home from "../Pages/Home/Home";
import Register from "../Authintication/Register";
import LogIn from "../Authintication/LogIn";
import Card from "../Components/Card";
import CardDetails from "../Components/CardDetails";
import AddJob from "../Pages/UserDashbOard/AddJob/AddJob";
import MyJobs from "../Pages/UserDashbOard/MyJobs/MyJobs";
import MyBids from "../Pages/UserDashbOard/MyBids/MyBids";
import Private from "../Provider/Private";
import BidRequests from "../Pages/UserDashbOard/BidRequests/BidRequests";
import Alljobs from "../Pages/AllJobs/Alljobs";

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
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/jobcard",
        element: <Card></Card>,
      },
      {
        path: "/jobs/:id",
        element: (
          <Private>
            <CardDetails></CardDetails>,
          </Private>
        ),
      },
      {
        path: "/addjob",
        element: (
          <Private>
            <AddJob></AddJob>
          </Private>
        ),
      },
      {
        path: "/myjobs",
        element: (
          <Private>
            <MyJobs></MyJobs>
          </Private>
        ),
      },
      {
        path: "/mybids",
        element: (
          <Private>
            <MyBids></MyBids>
          </Private>
        ),
      },
      {
        path: "/bidreq",
        element: (
          <Private>
            <BidRequests></BidRequests>
          </Private>
        ),
      },
      {
        path: "/alljobs",
        element: <Alljobs></Alljobs>,
      },
    ],
  },
]);
