'use client'

import { llmPicURL, humanPicURL } from "./content"
import { ChatMessage } from "./types"

// Input: props with role and message content
// Output: a chat bubble message
export default function ChatBubble({role, content}: ChatMessage) {

    const startOrEnd = role === "AI" ? "chat-start" : "chat-end"

    return (
            <div className={`chat ${startOrEnd} text-sm`}>

                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="face icon"
                            src={role === "AI" ? llmPicURL : humanPicURL}
                        />
                    </div>
                </div>

                <div className="chat-header">
                    {role === "AI" ? "Celine" : "You"}
                </div>

                <div className="chat-bubble">{content}</div>
            </div>
    )
}