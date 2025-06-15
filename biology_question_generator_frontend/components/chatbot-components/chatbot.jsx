'use client'

import ChatBubble from "./chat-bubble"
import { useReducer, useState, useEffect } from "react"

export default function Chatbot() {

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>

            {
                visible ? 
                <div className="card bg-customBackground w-80 h-100 overflow-y-auto shadow-md">

                    <div className="navbar flex flex-row justify-between items-center h-10 bg-customBackground shadow-sm">
                        <label className="text-sm">Assistant Chatbot</label>
                        <button className="btn btn-sm bg-customBackground rounded-full w-10 h-10 border-2" onClick={toggleVisibility}>
                            <img src="https://openmoji.org/data/color/svg/E24E.svg" alt="close chatbot icon"></img>
                        </button>
                    </div>

                    <ChatBubble 
                        startOrEnd="chat-start"
                        imageURL="https://openmoji.org/data/color/svg/1F916.svg"
                        message="Hi there!"
                        name="Bi"
                    />

                    <ChatBubble 
                        startOrEnd="chat-end"
                        imageURL="https://openmoji.org/data/color/svg/E011.svg"
                        message="Hi there!"
                        name="Violet"
                    />

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