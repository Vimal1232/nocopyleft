import React from "react";
import Link from "next/link";

const MainHeader = () => {
  return (
    <div>
      <div className="h-[500px] w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex  items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className=" flex flex-col items-center gap-10 ">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl sm:text-7xl font-Grotesk font-extrabold  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
              "Share Without a Trace"
            </h1>

            <p className=" font-Grotesk font-medium text-[18px] z-20 text-neutral-300 ">
              Private, Time-Limited File Sharing with Absolute Security.
            </p>
          </div>
          <Link href="/Filesharer">
            <button className="text-white border border-white font-Grotesk font-normal text-[18px] px-4 py-2 rounded-full  hover:bg-white hover:text-black duration-300 ease-in-out  z-20">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
