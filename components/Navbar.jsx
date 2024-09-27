import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="px-20 max-sm:px-5  py-10">
      <div className=" flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="text-white font-Grotesk font-extrabold text-[30px]">
              No Copy Left
            </h1>
          </Link>
        </div>
        <div>
          <Link href="/Filesharer">
            <button className="text-white border border-white font-Grotesk font-normal text-[18px] px-4 py-2 rounded-full hover:bg-white hover:text-black duration-300 ease-in-out">
              Upload
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
