"use client";

import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { arrayBufferToBlob } from "blob-util";
import { fileTypeFromBlob } from "file-type";
import { FileIcon, Clock10 } from "lucide-react";

const page = ({ params }) => {
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [download, setDownload] = useState([]);
  const [check, setCheck] = useState(false);
  const [type, setType] = useState("");
  const [error, setError] = useState();
  useEffect(() => {
    const getfile = async () => {
      try {
        const res = await fetch(`/api/fileGet?fileID=${params.fileId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const filedata = await res.json();
        if (filedata.message) {
          setError(filedata.message);
          return;
        }

        if (res.ok && filedata.data) {
          const byteCharacters = atob(filedata.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          const blob = arrayBufferToBlob(byteArray, filedata.type);
          const fileType = fileTypeFromBlob(blob);
          setType((await fileType).ext);
          setDownload(blob);
        }

        if (filedata.sessionId) {
          const check = localStorage.getItem("sessionId");
          if (check === filedata.sessionId) {
            setCheck(true);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getfile();
  }, [params.fileId]);

  const handledownload = () => {
    saveAs(download, `${params.fileId}.${type}`);
  };

  const url = process.env.NEXT_PUBLIC_PATH;

  return (
    <div
      className={` flex flex-col items-center justify-center ${
        loading === true ? "h-screen" : ""
      } `}
    >
      {loading === true ? (
        <div className="text-center  ">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mx-auto"></div>
          <h2 className=" text-white mt-4 font-Grotesk">Loading...</h2>
          <p className=" text-zinc-400 font-Grotesk">
            We Are Making sure Everything is right
          </p>
        </div>
      ) : error ? (
        <div>
          <h1 className="text-white font-Grotesk font-extrabold text-[30px]">
            {error}
          </h1>
        </div>
      ) : (
        <div className="">
          {check === true ? (
            <div className=" flex flex-col items-center justify-center h-screen">
              <div className="relative isolate overflow-hidden bg-black py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                      <h2 className="text-3xl font-bold font-Grotesk tracking-tight text-white sm:text-4xl">
                        Hello, Broski
                      </h2>
                      <p className="mt-4 text-lg leading-8 font-Grotesk  text-gray-300">
                        Thanks for Using Our Service. This Service will Remain
                        free For life Consider Donating to keep it alive
                      </p>
                      <div className="mt-6 flex flex-col max-w-md gap-x-4">
                        <div className="w-full font-Grotesk font-bold  flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          {`${url}/Filesharer/${params.fileId}`}
                        </div>

                        <div className=" text-white font-Grotesk font-medium text-[18px] mt-5">
                          Share this link to The Parter Who is Going to Bring
                          Justice
                        </div>
                      </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                      <div className="flex flex-col items-start">
                        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                          <FileIcon size={24} color="white" />
                        </div>
                        <div className="mt-4 font-Grotesk font-semibold text-white">
                          Download
                        </div>
                        <div className="mt-2 font-Grotesk leading-7 text-gray-400">
                          Download The File And Keep It Safe Bro, Change to the
                          World Bruh
                        </div>
                        <div>
                          <button
                            onClick={handledownload}
                            className="mt-4 font-Grotesk font-semibold text-black bg-white px-4 py-2 rounded-md hover:bg-black hover:text-white duration-300 ease-in-out"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                          <Clock10 size={24} color="white" />
                        </div>
                        <dt className="mt-4 font-semibold text-white font-Grotesk">
                          Timer
                        </dt>
                        <dd className="mt-2 leading-7 text-gray-400 font-Grotesk">
                          The File Will Be Deleted In {10} {""}
                          minutes from the time of Initiation
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
                ></div>
              </div>
            </div>
          ) : (
            <div className=" flex flex-col items-center h-screen justify-center">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <FileIcon size={24} color="white" />
                  </div>
                  <div className="mt-4 font-Grotesk font-semibold text-white">
                    Download
                  </div>
                  <div className="mt-2 font-Grotesk leading-7 text-gray-400">
                    Download The File And Keep It Safe Bro, Change to the World
                    Bruh
                  </div>
                  <div>
                    <button
                      onClick={handledownload}
                      className="mt-4 font-Grotesk font-semibold text-black bg-white px-4 py-2 rounded-md hover:bg-black hover:text-white duration-300 ease-in-out"
                    >
                      Download
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <Clock10 size={24} color="white" />
                  </div>
                  <dt className="mt-4 font-semibold text-white font-Grotesk">
                    Timer
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-400 font-Grotesk">
                    The File Will Be Deleted In 10 minutes from the time of
                    Initiation
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
