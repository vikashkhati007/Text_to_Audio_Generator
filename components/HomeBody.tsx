import { sendTextToAPI } from "./TextToAudio/text2audio";
import { getVoicesApi } from "./TextToAudio/getvoices";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAudiosApi } from "./TextToAudio/getaudios";
const HomeBody = ({ text }: any) => {
  let [link, setlink] = useState("");
  let [refesh, setRefresh] = useState(false);
  let [getVoices, setVoices] = useState([]);
  let [getAudios, setAudios] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setloading(true);
      if (!text) {
        const getvoice = await getVoicesApi();
        setVoices(getvoice.results);
        const getaudios = await getAudiosApi();
        setAudios(getaudios.results);
      } else {
        try {
          const response = await sendTextToAPI(
            text,
            selectedVoiceID,
            selectedAudioID
          );
          setlink(response);
          setRefresh(true);
          setloading(false);
        } catch (error) {
          // Handle any errors that occur durting the API call
          console.error(error);
        }
      }
    }

    fetchData();
  }, [text]);

  const [selectedVoiceID, setselectedVoiceID] = useState(""); // Initialize the state variable

  const getSelectedVoice = (event: any) => {
    // Update the selectedVoice state when the user selects an option
    setselectedVoiceID(event.target.value);
  };
  const [selectedAudioID, setselectedAudioID] = useState(""); // Initialize the state variable

  const getAudioVoice = (event: any) => {
    // Update the selectedVoice state when the user selects an option
    setselectedAudioID(event.target.value);
  };

  const handlesetting = (event: any) => {
    setRefresh(false);
  };

  return (
    <div className="homecontainer flex justify-center items-center w-full h-[75%]">
      <div className="filecontainer text-center text-white p-2 lg:w-1/2 w-[95%] h-[90%] bg-[#09090A] rounded-md overflow-hidden shadow-md">
        <h1>Text To Audio Convertor</h1>
        <hr className="opacity-20 m-1 w-full" />
        {!refesh ? (
          <>
            <div className="w-full h-full flex-col justify-center">
              <label htmlFor="standard-select">Choose Voice</label>
              <div className="select">
                {getVoices.length > 0 ? (
                  <select
                    id="standard-select"
                    className="text-black rounded-full p-1 border border-white cursor-pointer "
                    onChange={getSelectedVoice}
                  >
                    {getVoices.map((d: any) => (
                      <option key={d.id} value={d.id}>
                        {d.language + " " + d.ssml_gender}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="w-full flex justify-center items-center">
                  <Image width={50} height={20} src={"/circle.gif"} alt="loader" />
                  </div>
                )}
              </div>
              <label htmlFor="standard-select">Choose Audio</label>
              <div className="select">
                {getAudios.length > 0 ? (
                  <select
                    id="standard-select"
                    className="text-black rounded-full p-1 border border-white cursor-pointer "
                    onChange={getAudioVoice}
                  >
                    {getAudios.map((d: any) => (
                      <option key={d.id} value={d.id}>
                        {d.id}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="w-full flex justify-center items-center">
                  <Image width={50} height={20} src={"/circle.gif"} alt="loader" />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}

        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Image width={150} height={100} src={"/loader.gif"} alt="loader" />
          </div>
        ) : (
          <>
            <div className=" w-full flex justify-between p-10 items-center ">
              <div className="font-bold text-lg text-start">
                <h2>File Name: {text.substring(0, 20) + " ..."}</h2>
                <h2>Audio Format: MP3</h2>
              </div>
              <div>
                <Image
                  className="border-2 rounded-full border-[#3085FE]"
                  width={120}
                  height={50}
                  src={"/audio.png"}
                  alt="audio"
                />
              </div>
            </div>
            <div className=" w-full flex justify-between p-10 items-center ">
              <div className="audiocontainer">
                <audio controls className="w-72">
                  {!text ? null : <source src={`${link}`} />}
                </audio>
              </div>
              <div className="downloadcontainer flex space-x-5">
                <a href={`${link}`} download>
                  <Image
                    width={50}
                    height={35}
                    src={"/down.png"}
                    alt="setting"
                    className="bg-[#CDE9FF] rounded-full cursor-pointer"
                  />
                </a>
                <Image
                  width={50}
                  height={30}
                  src={"/settings.png"}
                  alt="setting"
                  className="bg-[#CDE9FF] rounded-full cursor-pointer p-2 border-2 border-[#3085FE]"
                  onClick={handlesetting}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default HomeBody;
