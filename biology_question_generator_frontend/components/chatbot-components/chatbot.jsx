'use client'

import ChatBubble from "./chat-bubble"
import { useReducer, useState, useEffect } from "react"
import { startConnection, receiveMessage, sendMessage } from "@/app/middleware/socket"

export default function Chatbot() {

    const [visible, setVisible] = useState(false)
    const [chatHistory, setChatHistory] = useState([])
    const [sessionID, setSessionID] = useState("")
    const [humanMessage, setHumanMessage] = useState("")

    receiveMessage((data) => {
        setChatHistory([...chatHistory, {role: "llm", content: data.content}])
        setSessionID(data.session_id)
    })

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const sendChatHistory = () => {
        
        sendMessage({sessionID: sessionID, human_message: humanMessage})
        setChatHistory([...chatHistory, {role: "human", content: humanMessage}])
        setHumanMessage("")
    }

    useEffect(() => {
        startConnection()
    }, [])

    return (
        <div>

            {
                visible ? 
                <div className="card bg-customBackground w-80 h-150 shadow-md">

                    <div className="navbar flex flex-row justify-between items-center h-10 bg-customMediumGreen shadow-sm">
                        <label className="text-sm">Assistant Chatbot</label>
                        <button className="btn btn-sm bg-customMediumGreen rounded-full w-10 h-10 border-1 shadow-none" onClick={toggleVisibility}>
                            <img src="https://openmoji.org/data/color/svg/E24E.svg" alt="close chatbot icon"></img>
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
                    </div>

                    <div className="absolute bottom-0 flex flex-col w-full">
                        <textarea 
                            className="h-20 textarea text-sm border-0" 
                            placeholder="Enter your message"
                            onChange={(e) => {setHumanMessage(e.target.value)}}
                            />
                        <div className="h-7 flex flex-row justify-end">
                            <button className="btn btn-xs bg-customBackground border-0 shadow-none m-0" onClick={sendChatHistory}>
                                <img className="h-5 w-5" src="https://upload.wikimedia.org/wikipedia/commons/2/22/VK_icons_send_outline_28.svg" alt="send icon"></img>
                            </button>
                        </div>
                    </div>


                </div>

                :
                <div> 
                    <button className="btn bg-customBackground w-15 h-15 rounded-full shadow-md" onClick={toggleVisibility}>
                        <img src="https://openmoji.org/data/black/svg/E263.svg" alt="chatbot icon"></img>
                    </button>
                </div>

            }
        </div>

    )


}