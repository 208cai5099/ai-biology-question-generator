'use client'

import { urlAndLabel } from "@/components/utils"
import { useState } from "react"
import Link from "next/link"

export default function Welcome() {

    const [index, setIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [imageURL, setImageURL] = useState(urlAndLabel[0][0])    
    const [label, setLabel] = useState(urlAndLabel[0][1])

    const handleTransition = () => {

        if (index === urlAndLabel.length - 1) {
            setIndex(0)
            setImageURL(urlAndLabel[0][0])
            setLabel(urlAndLabel[0][1])
            setProgress(0)
        } else {

            setIndex(index + 1)
            setImageURL(urlAndLabel[index + 1][0])
            setLabel(urlAndLabel[index + 1][1])

            setProgress(Math.floor(progress + (100 / urlAndLabel.length)))
        }
    }

    // setInterval(handleTransition, 10000)

    return (
        <div>
            <div className="hero sm:my-20">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2">
                        <p className="text-center font-bold text-5xl">Generate questions about</p>
                        <p className="text-center font-bold text-5xl text-customMediumGreen">
                            {label}
                        </p>
                        <p></p>
                        <p className="text-center font-bold text-3xl my-10">
                            <Link className="text-customDarkGreen underline" href="/login">Sign up</Link> to get started
                        </p>

                    </div>
                    <div className="w-1/3 max-h-sm">
                        <img src={imageURL} alt="cartoon image" className="animate-bounce"/>
                        <ul className="steps">
                            {urlAndLabel.map((i, idx) => {
                                if (idx === index) {
                                    return <li key={idx} className="step step-accent"></li>
                                } else {
                                    return <li key={idx} className="step"></li>
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}