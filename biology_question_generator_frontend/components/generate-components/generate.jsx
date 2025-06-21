'use client'

import IntakeForm from "./generate-form"
import { checkLogin } from "@/app/middleware/check-login"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { fetchGeneration } from "@/app/middleware/fetch-generation"

export default function Generate() {

    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [topic, setTopic] = useState("Structure and Function")
    const [PLD, setPLD] = useState(new Set())
    const [phenomenon, setPhenomenon] = useState("not provided")
    const [MCQuestions, setMCQuestions] = useState(NaN)
    const [openOuestions, setOpenQuestions] = useState(NaN)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isGenerated, setIsGenerated] = useState(false)

    // only allow use of generation if user is logged in
    useEffect(() => {

      const callCheckLogin = async() => {
        const status = await checkLogin()
        setIsLoggedIn(status)
      }

      callCheckLogin()

    }, [])


    // redirect to page for reviewing the generated content
    useEffect(() => {

        if (isGenerated) {
            router.push("/review")
        }

    }, [isGenerated])


    // sends inputs to generate the readings, table, and questions
    const generateQuestions = async() => {

        try {
            setIsGenerating(true)

            // concatenate the selected PLDs into a numbered list
            let concatPLD = ""
            let cnt = 1
            PLD.forEach((pld) => {
                concatPLD += (cnt.toString() + ". " + pld + "\n")
                cnt += 1
            })

            const res = await fetchGeneration({
                topic: topic,
                pld: concatPLD,
                phenomenon: phenomenon,
                mc_number: MCQuestions, 
                open_number: openOuestions
            })

            sessionStorage.setItem("generated_content", JSON.stringify(res))

            setIsGenerating(false)
            setIsGenerated(true)

        } catch (error) {
            console.log("Error: " + error)
        }
    }

    return (
        <div className="flex flex-col items-center">
            {
                isLoggedIn ?
                <div className="flex flex-col items-center">
                    <IntakeForm 
                        topic={topic} 
                        PLD={PLD} 
                        isGenerating={isGenerating}
                        setTopic={setTopic} 
                        setPLD={setPLD} 
                        setPhenomenon={setPhenomenon} 
                        setMCQuestions={setMCQuestions} 
                        setOpenQuestions={setOpenQuestions}
                    />
                    {
                        isGenerating ?
                        <button className="btn btn-success text-lg" disabled={true}>
                            <span className="loading loading-spinner"></span>
                            Generating...
                        </button> :
                        <button 
                            onClick={() => {generateQuestions()}} 
                            className={"btn btn-success text-lg"}
                            disabled={topic === "" || PLD.size === 0 || isNaN(MCQuestions) || isNaN(openOuestions)}
                            >
                            Generate
                        </button>
                    }
                </div> :
                <div role="alert" className="alert alert-warning mt-5">
                    <img src="https://openmoji.org/data/color/svg/270B.svg" width="30" height="30" alt="stop icon"/>
                    <span>Please log in to generate questions.</span>
                </div>
            }

        </div>
    )

}