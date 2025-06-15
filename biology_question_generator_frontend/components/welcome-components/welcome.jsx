'use client'

import { urlAndLabel } from "./utils"
import TypewriterEffect from "./typewriter-effect"
import { useState } from "react"

export default function Welcome() {

    const [index, setIndex] = useState(0)
    const [imageURL, setImageURL] = useState(urlAndLabel[0][0])    
    const [labels, setLabels] = useState(urlAndLabel[0][1])


    const updateImage = (idx) => {
        setIndex(idx)
        setImageURL(urlAndLabel[idx][0])
        setLabels(urlAndLabel[idx][1])
    }

    return (
        <div className="grid place-items-center lg:mt-30 md:mt-30 mt-20">
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-left lg:text-5xl xl:text-5xl 2xl:text-5xl text-4xl w-1/2">
                        <p className="font-bold">Generate questions about</p>
                        <p></p>
                        <TypewriterEffect labels={labels}></TypewriterEffect>
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/3 max-h-sm">
                        <img src={imageURL} alt="cartoon image"/>
                        <div className="join">
                            {
                                urlAndLabel.map((i, idx) => {
                                    return (
                                        <input 
                                            key={idx}
                                            className={index === idx ? "join-item btn btn-square btn-success" : "join-item btn btn-square"}
                                            type="radio"
                                            name="options" 
                                            aria-label={`${idx+1}`}
                                            checked={index === idx}
                                            onChange={() => {updateImage(idx)}}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}