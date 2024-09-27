"use client";

import React, { useState } from "react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const [file, setFile] = useState();
  const router = useRouter();
  const [error, setError] = useState("");

  const uploadFile = async (e) => {
    e.preventDefault();

    const newFileId = nanoid();
    const newSessionId = nanoid();

    if (!file || file.length === 0) {
      setError("Please Select a File");
      return;
    }

    if (!file || file[0].size > 2 * 1042 * 1042) {
      setError("File Size should be less than 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("sessionId", newSessionId);
    formData.append("fileId", newFileId);
    formData.append("data", file[0]);

    try {
      const res = await fetch("/api/filehandle", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("File Uploaded");
        localStorage.setItem("sessionId", newSessionId);
        router.push(`/Filesharer/${newFileId}`);
      }

      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-black">
      <div className="px-20 max-sm:px-5  py-10">
        <div className=" flex items-center justify-between">
          <div>
            <Link href="/">
              <h1 className="text-white font-Grotesk font-extrabold text-[30px]">
                No Copy Left
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex  items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="  ">
          {error && (
            <div className="text-white font-Grotesk font-normal text-[18px] mb-5">
              {error}
            </div>
          )}
          <form
            onSubmit={uploadFile}
            className="flex flex-col items-center gap-20"
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files)}
              className="text-white  border-white border rounded-lg p-2 font-Grotesk font-normal text-[18px] "
            />

            <button
              type="sumbit"
              className="text-white border border-white font-Grotesk font-normal text-[18px] px-4 py-2 rounded-full hover:bg-white hover:text-black duration-300 ease-in-out"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
