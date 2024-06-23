import React from "react";

const Title = ({ heading, sHeading }) => {
  return (
    <div className="py-10">
      <div className="flex flex-col gap-5 text-center items-center">
        <h1 className="text-blue-600 text-4xl font-bold">{heading}</h1>
        <h1 className="text-red-600 font-bold">
          ----------- {sHeading} -----------
        </h1>
      </div>
    </div>
  );
};

export default Title;
