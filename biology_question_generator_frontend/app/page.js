'use client'

import Navbar from "@/components/navbar";
import Welcome from "@/components/welcome-components/welcome";
import { useState, useEffect } from "react";
import { startConnection, receiveMessage, sendMessage } from "./middleware/socket";

export default function Home() {

  const [sessionID, setSessionID] = useState(999999)
  const [message, setMessage] = useState("")

  receiveMessage((mes) => {console.log(mes)})

  const sendHumanMessage = () => {
    sendMessage(sessionID, message)
  }

  console.log(message)

  useEffect(() => {

    startConnection(sessionID)

  }, [])

  return (
    <div className="min-h-screen">
      <Navbar/>
      <Welcome/>
      <input onChange={(e) => {setMessage(e.target.value)}} placeholder="Random Message"></input>
      <button onClick={() => {sendHumanMessage()}}>Send</button>
    </div>
  );
}