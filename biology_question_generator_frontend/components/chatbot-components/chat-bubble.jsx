'use client'

export default function ChatBubble(props) {
    return (
            <div className={`chat ${props.startOrEnd} text-sm`}>

                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="face icon"
                            src={props.imageURL}
                        />
                    </div>
                </div>

                <div className="chat-header">
                    {props.name}
                </div>

                <div className="chat-bubble">{props.message}</div>
            </div>
    )
}