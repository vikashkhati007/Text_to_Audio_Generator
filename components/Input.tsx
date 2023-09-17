"use client";
import { useState } from "react";
import Image from "next/image";

const Input = ({ onUserInput }: any) => {
  const [clickvalue, setclickvalue] = useState("");
  const [loading, setloading] = useState(false);

  function getInputValueFunction(e: any) {
    setclickvalue(e.target.value);
  }

  function userClickFunction(e: any) {
    setloading(true);
    e.preventDefault();
    onUserInput(clickvalue);
    setclickvalue("");
    setInterval(()=>{
      setloading(false);
    },2000)

  }

  return (
    <>
      <form onSubmit={userClickFunction}>
        <div className="absolute bottom-0 w-full flex flex-row justify-center space-y-5 mb-5">
          <input
          autoComplete="off"
            value={clickvalue}
            autoFocus
            onChange={getInputValueFunction}
            name="usertext"
            className="inputcontainer lg:w-[48%] w-[90%] rounded-md outline-none p-2 text-white bg-black text-md"
            placeholder="Enter Your Message Here"
          />
          <div className="iconcontainer w-5 ml-2 relative bottom-2 ">
            {!loading ? (
              <svg
                onClick={userClickFunction}
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                  fill="white"
                ></path>
              </svg>
            ) : (
                <div className="w-full flex justify-center items-center">
                  <Image
                    width={100}
                    height={100}
                    src={"/enterloader.gif"}
                    alt="loader"
                  />
                </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Input;
