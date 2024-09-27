import React from "react";
import MainHeader from "@/components/MainHeader";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div className=" bg-black">
      <div className=" ">
        <Navbar />
      </div>
      <div className=" pb-20">
        <MainHeader />
      </div>
    </div>
  );
};

export default page;
