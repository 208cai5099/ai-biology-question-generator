'use client'

import { URLs, labels } from "./content"
import { useState } from "react"
import Link from "next/link"

export default function Welcome() {

    const [motion, setMotion] = useState(true)

    return (

        <div className="flex flex-col items-center">

            <h1 className="font-bold lg:text-5xl text-4xl lg:mt-20 md:mt-20 mt-10 text-center">
                Generate questions about <em className="text-customDarkGreen">any</em> biology topic
            </h1>

            <div className="w-4/5 min-w-[300px] max-w-[1000px] h-[350px] relative mt-10 mx-auto overflow-hidden mask-l-from-97% mask-l-to-100% mask-r-from-97% mask-r-to-100%">

                {
                    URLs.map((imgURL, idx) => {

                        return (
                            <div key={idx} className="flex flex-col justify-center items-center absolute transition duration-150 w-[300px] h-[300px] mt-[20px] left-full lg:border-[1px] md:border-[1px] border-gray-100 lg:shadow-md md:shadow-md rounded-md hover:scale-110 animate-scroll-marquee" 
                            style={{animationDelay: `${-1 * 20 / URLs.length * (URLs.length - (idx + 1))}s`, animationPlayState: motion ? "running" : "paused"}} 
                            onMouseEnter={() => {setMotion(false)}}
                            onMouseLeave={() => {setMotion(true)}}>
                                <div className="h-[100px] p-5">
                                    <p className="text-center font-bold lg:text-3xl md:text-3xl text-xl lg:w-[300px] md:w-[300px] w-[100px]">{labels[idx]}</p>
                                </div>
                                <img className="lg:h-[200px] md:h-[200px] h-1/2" src={imgURL}></img>
                            </div>
                        )

                    })

                }

            </div>

            <Link className="btn rounded-md lg:mt-10 md:mt-10 text-lg text-gray-800 bg-customMediumGreen hover:bg-customDarkGreen" href="/login">
                Get Started
            </Link>
        </div>

    )
}