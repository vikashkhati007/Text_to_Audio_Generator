"use client"
import Input from "@/components/Input"
import Navbar from "@/components/Navbar"
import HomeBody from "@/components/HomeBody"
import { useState } from "react"
export default function Home() {
  const [userinput, setUserInput] = useState("");

  const handleUserInput = (inputValue:any) => {
    setUserInput(inputValue);
  };
  return (
    <div className="pagecontainer">
    <Navbar/>
    <HomeBody text={userinput} />
    <Input onUserInput={handleUserInput} />
    </div>
  )
}
