import React, { useContext } from "react";
import Banner from "./Banner";
import Feature from "./Feature";
import AboutUs from "./AboutUs";
import Newsletter from "./Newsletter";
import ContactUs from "./ContactUs";
import Map from "./Map";
import Register from "../../Authintication/Register";
import LogIn from "../../Authintication/LogIn";
import { AuthContext } from "../../Provider/AuthProvider";
import JobTab from "../Jobs/JobTab";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <Banner></Banner>
      <JobTab></JobTab>
      {/* <Feature></Feature>
      <AboutUs></AboutUs>
      <Newsletter></Newsletter>
      <ContactUs></ContactUs>
      <Map></Map> */}
    </div>
  );
};

export default Home;
