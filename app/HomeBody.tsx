import { sendTextToAPI } from "./TextToAudio/text2audio";
import Image from "next/image";
import { useEffect, useState } from "react";
const HomeBody = ({ text }: any) => {
  let [link, setlink] = useState("");
  let [refesh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setRefresh(false);
      if (!text) {
        // Handle the case when 'text' is empty if needed
      } else {
        try {
          const response = await sendTextToAPI(text);
          setlink(response);
          setRefresh(true);
        } catch (error) {
          // Handle any errors that occur durting the API call
          console.error(error);
        }
      }
    }

    fetchData();
  }, [text]);

  return (
    <div className="homecontainer flex justify-center items-center w-full h-[75%]">
      <div className="filecontainer text-center text-white p-2 lg:w-1/2 w-[95%] h-[90%] bg-[#09090A] rounded-md overflow-hidden shadow-md">
        <h1>Text To Audio Convertor</h1>
        <hr className="opacity-20 m-1 w-full" />
        {!refesh ? null : (
          <>
            <div className="w-full flex justify-around items-center space-y-10">
              <div className="float-left flex-col text-start font-bold">
                <h2>File Name: {text.substring(0, 30) + " ..."}</h2>
                <h2>Audio Format: MP3</h2>
              </div>
              <Image
                className="border-2 rounded-full border-[#3085FE]"
                width={150}
                height={80}
                src={"/audio.png"}
                alt="audio"
              />
            </div>
            <div className="flex w-full justify-around items-center mt-10">
              <audio controls>
                {!text ? null : <source src={`${link}`} />}
              </audio>
              <a
                href={`${link}`}
                className="css-button-sliding-to-top--sky"
                download
              >
                Download
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default HomeBody;
