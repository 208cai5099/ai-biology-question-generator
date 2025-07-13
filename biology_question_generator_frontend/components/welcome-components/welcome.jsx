'use client'

import { URLs, labels } from "./content"

export default function Welcome() {

    return (

        <div className="flex flex-col items-center">

            <h1 className="font-bold lg:text-5xl text-4xl mt-20 mb-[20px] text-center">
                Generate questions about <em className="text-customDarkGreen">any</em> biology topic
            </h1>

            <div className="w-4/5 min-w-[300px] max-w-[1000px] h-[300px] relative mt-10 mx-auto overflow-hidden mask-l-from-97% mask-l-to-100% mask-r-from-97% mask-r-to-100%">

                {
                    URLs.map((imgURL, idx) => {

                        return (
                            <div key={idx} className="flex flex-col justify-center items-center absolute w-[300px] h-[300px] left-full animate-scroll-marquee" 
                            style={{animationDelay: `${-1 * 20 / URLs.length * (URLs.length - (idx + 1))}s`}}>
                                <div className="h-[100px]">
                                    <p className="text-center font-bold lg:text-3xl md:text-3xl text-xl lg:w-[300px] md:w-[300px] w-[100px]">{labels[idx]}</p>
                                </div>
                                <img className="lg:h-[200px] md:h-[200px] h-1/2" src={imgURL}></img>
                            </div>
                        )

                    })

                }

            </div>
        </div>

    )
}