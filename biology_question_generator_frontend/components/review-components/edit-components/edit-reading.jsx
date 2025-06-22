'use client'

import { useContext, useState, useEffect } from "react"
import { reviewContext } from "../review-context"

export default function EditReading() {

    const context = useContext(reviewContext)
    const [title, setTitle] = useState(context.reading.title)
    const [content, setContent] = useState(context.reading.content)

    useEffect(() => {

        context.setReading({
            title: title,
            content: content
        })

    }, [title, content])

    return (
        <div className="card card-border lg:w-300 w-90 my-5 mx-2 shadow-sm bg-white">

            <div className="join join-vertical lg:w-290 w-85 m-2">
                <label className="join-item">
                    <span className="font-bold m-2">Reading Title</span>
                    <input 
                        className="m-2 w-full h-10 border-1 border-gray-200" 
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                    />
                </label>

                <label className="join-item">
                    <span className="font-bold m-2">Reading Content</span>
                </label>

                <div className="join-item">
                    <textarea 
                        className="join-item m-2 w-full h-80 border-1 border-gray-200" 
                        value={content}
                        onChange={(e) => {setContent(e.target.value)}}
                    />
                </div>
            </div>

        </div>
    )
}