'use client'

import { llmPicURL, humanPicURL } from "./content"

// Input: props with role and message content
// Output: a chat bubble message
export default function ChatBubble(props) {

    const startOrEnd = props.role === "AI" ? "chat-start" : "chat-end"

    return (
            <div className={`chat ${startOrEnd} text-sm`}>

                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="face icon"
                            src={props.role === "AI" ? llmPicURL : humanPicURL}
                        />
                    </div>
                </div>

                <div className="chat-header">
                    {props.role === "AI" ? "Celine" : "You"}
                </div>

                <div className="chat-bubble">{props.content}</div>
            </div>
    )
}