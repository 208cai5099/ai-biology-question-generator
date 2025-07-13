'use client'

import { URLs, labels } from "./content"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function Welcome() {

    const [motion, setMotion] = useState(true)
    const [showDescription, setShowDescription] = useState(false)
    const [showSteps, setShowSteps] = useState(true)
    const websiteDescriptionRef = useRef(null)
    const stepsDescriptionRef = useRef(null)

    const options = {
        root: null,
        rootMargin: "50px",
        threshold: 1.0
    }

    const animateDescription = (entries) => {

        if (entries[0].isIntersecting) {
            setShowDescription(true)
        }
    }

    const animateSteps = (entries) => {

        if (entries[0].isIntersecting) {
            setShowSteps(true)
        }
    }

    useEffect(() => {

        const descriptionObserver = new IntersectionObserver(animateDescription, options)
        const stepsObserver = new IntersectionObserver(animateSteps, options)

        if (websiteDescriptionRef.current !== null) {
            descriptionObserver.observe(websiteDescriptionRef.current)
        }

        if (stepsDescriptionRef.current !== null) {
            stepsObserver.observe(stepsDescriptionRef.current)
        }

    }, [websiteDescriptionRef, stepsDescriptionRef, options])

    return (

        <div className="flex flex-col items-center">

            <h1 className="font-bold lg:text-5xl text-4xl lg:mt-20 md:mt-20 mt-10 text-center">
                Generate questions about <em className="text-customDarkGreen">any</em> biology topic
            </h1>

            <div className="w-4/5 min-w-[300px] max-w-[1000px] h-[350px] relative mt-10 mx-auto overflow-hidden mask-l-from-97% mask-l-to-100% mask-r-from-97% mask-r-to-100%">

                {
                    URLs.map((imgURL, idx) => {

                        return (
                            <div 
                                key={idx} className="flex flex-col justify-center items-center absolute transition duration-200 w-[300px] h-[300px] mt-[20px] lg:border-[1px] md:border-[1px] border-gray-100 lg:shadow-md md:shadow-md rounded-md hover:scale-110 animate-scroll-marquee" 
                                style={{animationDelay: `${-1 * 20 / URLs.length * (URLs.length - (idx + 1))}s`, animationPlayState: motion ? "running" : "paused"}} 
                                onMouseEnter={() => {setMotion(false)}}
                                onMouseLeave={() => {setMotion(true)}}
                            >
                                <div className="h-[100px] p-5">
                                    <p className="text-center font-bold lg:text-3xl md:text-3xl text-xl lg:w-[300px] md:w-[300px] w-[100px]">{labels[idx]}</p>
                                </div>
                                <img className="lg:h-[200px] md:h-[200px] h-1/2" src={imgURL}></img>
                            </div>
                        )

                    })

                }

            </div>

            <h1 ref={websiteDescriptionRef} className="font-bold lg:text-5xl text-4xl lg:mt-20 md:mt-20 my-10">
                What is this website?
            </h1>

            <div className="w-4/5 min-w-[300px] max-w-[1000px]">
                <div
                    className="relative w-full border-[1px] border-black rounded-md shadow-md right-[150%] animate-left-slide-in"
                    style={{animationPlayState: showDescription ? "running" : "paused"}}
                >
                    <p className="p-[10px] text-xl">
                        This website is designed to be a tool for New York State (NYS) teachers to create practice questions for the NYS 
                        Life Science: Biology Regents exam.
                        First implemented in June 2025, the exam replaces the old Living Environment exam and assesses students' understanding of 
                        the NYS P-12 Science Learning Standards for high school life science. Because the exam is relatively new, 
                        some teachers need support in preparing their students for the exam. This tool uses an LLM to generate practice questions 
                        aligned to the life science standards. The goal is to provide an online resource to support NYS biology teachers.
                    </p>
                    <p className="p-[10px] text-lg">
                        <em>
                            Disclaimer: This website is not endorsed by the New York State Education Department or any organization. 
                            Any generated content does not reflect the opinion or view of any individual or organization.
                        </em>
                    </p>
                </div>

            </div>

            <h1 ref={stepsDescriptionRef} className="font-bold lg:text-5xl text-4xl lg:mt-20 md:mt-20 my-10">
                How does this work?
            </h1>

            <div className="flex flex-col gap-[20px] w-4/5 min-w-[300px] max-w-[1000px]">

                <div
                    className="relative w-full border-[1px] border-black rounded-md right-[150%] shadow-md animate-left-slide-in"
                    style={{animationDelay: "0s", animationPlayState: showSteps ? "running" : "paused"}}
                >
                    <h1 className="text-xl font-bold m-[10px]">1. Create an account (free!)</h1>
                    <p className="text-xl m-[10px]">
                        Make an account by inputting a username and password. Once logged in, you'll be able to generate exam questions 
                        that resemble the NYS Life Science: Biology exam. 
                    </p>
                </div>

                <div 
                    className="relative w-full border-[1px] border-black rounded-md right-[150%] shadow-md animate-left-slide-in"
                    style={{animationDelay: "2s", animationPlayState: showSteps ? "running" : "paused"}}                
                >
                    <h1 className="text-xl font-bold m-[10px]">2. Specify what kinds of questions to create</h1>
                    <p className="text-xl m-[10px]">
                        Fill out a brief input form asking for the topic, skills, and knowledge assessed by the questions.
                        All content are generated using a LLM (this site currently uses OpenAI's GPT-4o).
                    </p>
                </div>

                <div 
                    className="relative w-full border-[1px] border-black rounded-md right-[150%] shadow-md animate-left-slide-in"
                    style={{animationDelay: "4s", animationPlayState: showSteps ? "running" : "paused"}}
                >
                    <h1 className="text-xl font-bold m-[10px]">3. Edit the generated content</h1>
                    <p className="text-xl m-[10px]">
                        You are able to modify the content as you see fit. Feel free to use the site's edit functionality or 
                        copy and paste the results to your preferred word processor.
                    </p>
                </div>

            </div>

            <h1 className="font-bold lg:text-5xl text-4xl lg:mt-10 md:mt-10 my-10">
                Ready to try it out?
            </h1>
            
            <Link 
                className="btn rounded-md text-lg text-gray-800 bg-customMediumGreen hover:bg-customDarkGreen animate-left-slide-in" 
                href="/login"
            >
                Yep!
            </Link>

            <div className="w-[1px] h-[30px]"></div>

        </div>

    )
}