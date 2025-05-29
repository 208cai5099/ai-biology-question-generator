'use client'

import IntakeForm from "./intake-form"
import { checkLogin } from "@/app/middleware/check-login"
import GeneratedContent from "./generated_content"
import { useState, useEffect } from "react"
import { fetchGeneration } from "@/app/middleware/fetch-generation"

export default function GeneratePage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [topic, setTopic] = useState("")
    const [standards, setStandards] = useState("")
    const [MCQuestions, setMCQuestions] = useState(null)
    const [openOuestions, setOpenQuestions] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isGenerated, setIsGenerated] = useState(false)
    const [reading, setReading] = useState({})
    const [data, setData] = useState({})
    const [questionsList, setQuestionsList] = useState([])

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

            const res = await fetchGeneration({mc_number: MCQuestions, open_number: openOuestions, topic: topic, standards: standards})

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
                    <IntakeForm setTopic={setTopic} setStandards={setStandards} setMCQuestions={setMCQuestions} setOpenQuestions={setOpenQuestions}/>
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
                                (topic !== "" && standards !== "" && MCQuestions !== null && openOuestions !== null) ?
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