'use client'

import DataTable from "./data-table"
import QuestionCards from "./question-cards"
import Reading from "./reading"
import { useState, useEffect } from "react"
import { endpoint } from "@/utils"
import { useSearchParams } from 'next/navigation'

export default function GeneratedContent() {

    const [isGenerated, setIsGenerated] = useState(false)
    const [questionsList, setQuestionsList] = useState([])
    const [reading, setReading] = useState({})
    const [data, setData] = useState({})

    const searchParams = useSearchParams()

    const generateQuestions = async () => {

        let generateURL = endpoint + "/generate?"

        generateURL += ("question_number=" + searchParams.get("numQuestions") + "&")
        generateURL += ("topic=" + searchParams.get("topic") + "&")
        generateURL += ("standards=" + searchParams.get("standards"))

        try {
            const res = await fetch(generateURL).then((response) => {return response.json()})

            setQuestionsList(res.question_list)
            setReading(res.reading)
            setData(res.data)
            setIsGenerated(true)
            
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    useEffect(() => {
        generateQuestions()
    }, [])

    return (

        <div className="flex flex-col items-center">
            { isGenerated ?
            <div>
                <Reading title={reading.title} content={reading.content}/>
                <DataTable title={data.title} colNames={data.col_names} rows={data.row_values}/>
                <QuestionCards questionsList={questionsList}/>
            </div> :
            <div role="alert" className="alert alert-success lg:w-120 md:w-90 sm:w-60 my-5">
                <span className="loading loading-spinner loading-lg"></span>
                <span>Your questions are being generated</span>
            </div>
            }
        </div>

    )
}