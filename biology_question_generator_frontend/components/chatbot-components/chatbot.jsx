'use client'

import ChatBubble from "./chat-bubble"
import { useState, useEffect, useRef } from "react"
import { chatURL, sendURL } from "./content"
import { startChat } from "@/app/utils/start-chat"
import { sendChat } from "@/app/utils/send-chat"

export default function Chatbot() {

    const chatMessagesRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const [sessionID, setSessionID] = useState("")
    const [chatHistory, setChatHistory] = useState([])
    const [humanMessage, setHumanMessage] = useState("")

    // gets initial chatbot greeting to start the chat history
    useEffect(() => {

        const runStartChat = async() => {
            const res = await startChat()
            setSessionID(res.sessionID)
            setChatHistory([{role: "AI", content: res.msg}])
        }

        runStartChat()

    }, [])

    // once user submits a message, calls for chatbot response
    useEffect(() => {
        chatMessagesRef.current?.scrollIntoView()

        if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role == "Human") {

            const runSendChat = async() => {
                const res = await sendChat(sessionID, chatHistory[chatHistory.length - 1].content)
                setChatHistory([...chatHistory,  {role: "AI", content: res.msg}])
            }

            runSendChat()
        }
    }, [chatHistory])

    // adds the submitted human message to the chat history
    const addHumanMessage = () => {
        setChatHistory([...chatHistory, {role: "Human", content: humanMessage}])
        setHumanMessage("")
    }

    // opens and closes the chatbot
    const toggleVisibility = () => {
        setVisible(!visible)
    }

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
                            onKeyDown={(e) => {if (e.key === "Enter") {addHumanMessage()}}}
                            value={humanMessage}
                        />
                        <div className="h-7 flex flex-row justify-end">
                            <button 
                                className="btn btn-xs bg-customBackground border-0 shadow-none m-0" 
                                onClick={addHumanMessage}
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