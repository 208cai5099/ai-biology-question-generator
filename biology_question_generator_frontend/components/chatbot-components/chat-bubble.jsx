'use client'

import { llmPicURL, humanPicURL } from "./utils"

export default function ChatBubble(props) {

    const startOrEnd = props.role === "llm" ? "chat-start" : "chat-end"

    return (
            <div className={`chat ${startOrEnd} text-sm`}>

                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="face icon"
                            src={props.role === "llm" ? llmPicURL : humanPicURL}
                        />
                    </div>
                </div>

                <div className="chat-header">
                    {props.role === "llm" ? "Bi" : "You"}
                </div>

                <div className="chat-bubble">{props.content}</div>
            </div>
    )
}