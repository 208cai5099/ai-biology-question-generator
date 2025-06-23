'use client'

import ChatBubble from "./chat-bubble"
import { useState, useEffect, useRef } from "react"
import { startConnection, receiveMessage, sendMessage } from "@/app/middleware/socket"
import { chatURL, sendURL } from "./content"

export default function Chatbot() {

    const [visible, setVisible] = useState(false)
    const [chatHistory, setChatHistory] = useState([])
    const [sessionID, setSessionID] = useState("")
    const [humanMessage, setHumanMessage] = useState("")

    const chatMessagesRef = useRef(null)

    receiveMessage((data) => {
        setChatHistory([...chatHistory, {role: "llm", content: data.content}])
        setSessionID(data.session_id)
    })

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const sendChatHistory = () => {
        
        if (humanMessage.length > 0) {
            sendMessage({sessionID: sessionID, human_message: humanMessage})
            setChatHistory([...chatHistory, {role: "human", content: humanMessage}])
            setHumanMessage("")
        }

    }

    useEffect(() => {
        startConnection()
    }, [])

    useEffect(() => {
        chatMessagesRef.current?.scrollIntoView()
    }, [chatHistory])

    return (
        <div>

            {
                visible ? 
                <div className="card rounded-none bg-customBackground lg:w-100 w-80 h-150 shadow-md">

                    <div className="card flex flex-row rounded-none justify-end items-center h-10 bg-customMediumGreen shadow-sm">
                        <button className="btn btn-sm text-[15px] hover:opacity-50 bg-customMediumGreen border-0 shadow-none" onClick={toggleVisibility}>
                            X
                        </button>
                    </div>

                    <div className="h-113 overflow-y-auto mb-30"> 
                        {
                            chatHistory.map((chat, idx) => {
                                return (
                                    <ChatBubble key={idx} role={chat.role} content={chat.content}/>
                                )
                            })

                        }
                        <div ref={chatMessagesRef}></div>
                    </div>

                    <div className="absolute bottom-0 flex flex-col w-full">
                        <input 
                            className="h-15 lg:w-100 w-80 text-sm p-5 my-1 outline-black" 
                            placeholder="Enter your message"
                            onChange={(e) => {setHumanMessage(e.target.value)}}
                            onKeyDown={(e) => {if (e.key === "Enter") {sendChatHistory()}}}
                            value={humanMessage}
                        />
                        <div className="h-7 flex flex-row justify-end">
                            <button 
                                className="btn btn-xs bg-customBackground border-0 shadow-none m-0" 
                                onClick={sendChatHistory}
                                hidden={humanMessage.length === 0}
                            >
                                <img className="h-8 w-8" src={sendURL} alt="send icon"></img>
                            </button>
                        </div>
                    </div>
                </div>

                :
                <div> 
                    <button className="btn bg-gray-100 w-15 h-15 rounded-full shadow-md" onClick={toggleVisibility}>
                        <img src={chatURL} alt="chat icon"></img>
                    </button>
                </div>

            }
        </div>

    )


}