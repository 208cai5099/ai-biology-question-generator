'use client'

import DataTable from "../content-components/data-table"
import QuestionCards from "../content-components/question-cards"
import Reading from "../content-components/reading"
import { useState, useEffect } from "react"

export default function Content() {

    const [reading, setReading] = useState(undefined)
    const [data, setData] = useState(undefined)
    const [questions, setQuestions] = useState(undefined)

    useEffect(() => {
        const content = JSON.parse(sessionStorage.getItem("generated_content"))

        setReading(content.reading)
        setData(content.data)
        setQuestions(content.question_list)

    }, [])

    return (
        <div>
            {
                reading && data && questions ?
                <div className="flex flex-col items-center">
                    <p className="text-center text-lg lg:w-300 w-90 my-5">
                        The following content are generated using an AI model. The data values in the table are hypothetical.
                        Please keep in mind that the AI model can make mistakes.
                    </p>

                    <div>
                        <Reading title={reading.title} content={reading.content}/>
                        <DataTable title={data.title} colNames={data.col_names} rows={data.row_values}/>
                        <QuestionCards questionsList={questions}/>
                    </div>

                </div> :
                <div></div>
            }
        </div>

    )
}