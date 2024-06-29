import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Title from "../../Components/Shared/Title";
import useAllJobs from "../../Hooks/useAllJobs";
import { Link } from "react-router-dom";
import Card from "../../Components/Card";

const JobTab = () => {
  const [alljobs] = useAllJobs();

  const webJobs = alljobs.filter((jobs) => jobs.category === "web");
  const graficsJobs = alljobs.filter((jobs) => jobs.category === "graphics");
  const seoJobs = alljobs.filter((jobs) => jobs.category === "seo");
  const digitalMarketing = alljobs.filter(
    (jobs) => jobs.category === "digitalMarketing"
  );

  return (
    <div>
      <div className="">
        <Title
          heading={"Browse Jobs Here"}
          sHeading={"Take a Look of premium jobs here"}
        ></Title>
      </div>
      <div className="text-center ">
        <Tabs>
          <TabList>
            <Tab>All Jobs</Tab>

            <Tab>Graphics</Tab>
            <Tab>Web Development</Tab>
            <Tab>SEO</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>

          <TabPanel>
            <div className="container mx-auto grid grid-cols-3 gap-5">
              {alljobs?.map((job, idx) => (
                <Card key={idx} job={job}></Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container mx-auto grid grid-cols-3 gap-5">
              {graficsJobs?.map((job, idx) => (
                <Card key={idx} job={job}></Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container mx-auto grid grid-cols-3 gap-5">
              {webJobs?.map((job, idx) => (
                <Card key={idx} job={job}></Card>
              ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="container mx-auto grid grid-cols-3 gap-5">
              {seoJobs?.map((job, idx) => (
                <Card key={idx} job={job}></Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container mx-auto grid grid-cols-3 gap-5">
              {digitalMarketing?.map((job, idx) => (
                <Card key={idx} job={job}></Card>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobTab;
