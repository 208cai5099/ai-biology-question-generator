'use client'

import IntakeForm from "./intake-form"
import { checkLogin } from "@/app/middleware/check-login"
import GeneratedContent from "./generated-content"
import { useState, useEffect } from "react"
import { fetchGeneration } from "@/app/middleware/fetch-generation"

export default function GeneratePage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [core, setCore] = useState("Structure and Function")
    const [PLD, setPLD] = useState(new Set())
    const [phenomenon, setPhenomenon] = useState("not provided")
    const [MCQuestions, setMCQuestions] = useState(NaN)
    const [openOuestions, setOpenQuestions] = useState(NaN)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isGenerated, setIsGenerated] = useState(false)
    const [reading, setReading] = useState({})
    const [data, setData] = useState({})
    const [questionsList, setQuestionsList] = useState([])
    console.log(phenomenon)
    useEffect(() => {

      const callCheckLogin = async() => {
        const status = await checkLogin()
        setIsLoggedIn(status)
      }

      callCheckLogin()

    }, [])

    const generateQuestions = async() => {

        try {

            setIsGenerating(true)
            setIsGenerated(false)

            let concatPLD = ""
            let cnt = 1
            PLD.forEach((pld) => {
                concatPLD += (cnt.toString() + ". " + pld + "\n")
                cnt += 1
            })

            const res = await fetchGeneration({
                core_idea: core,
                pld: concatPLD,
                phenomenon: phenomenon,
                mc_number: MCQuestions, 
                open_number: openOuestions
            })

            setQuestionsList(res.question_list)
            setReading(res.reading)
            setData(res.data)
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
                        core={core} 
                        PLD={PLD} 
                        isGenerating={isGenerating}
                        setCore={setCore} 
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
                            disabled={
                                (core !== "" && PLD.size !== 0 && !isNaN(MCQuestions) && !isNaN(openOuestions)) ?
                                false :
                                true
                            }
                            >
                            Generate
                        </button>
                    }
                    {
                        (isGenerating) ?
                        <div className="flex flex-col items-center justify-center">
                            {[1, 1, 1].map((q, idx) => {
                                return (
                                    <div key={idx} className="card flex flex-col items-center justify-center animate-pulse h-50 w-200 bg-gray-100 my-5">
                                        <span className="loading loading-spinner loading-xl"></span>
                                    </div>
                                )
                            })
                            }
                        </div> :
                        <div></div>

                    }
                    {
                        isGenerated ?
                        <GeneratedContent 
                            readingTitle={reading.title}
                            readingContent={reading.content}
                            dataTitle={data.title}
                            colNames={data.col_names}
                            rowValues={data.row_values}
                            questionsList={questionsList}
                        /> :
                        <div></div>
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