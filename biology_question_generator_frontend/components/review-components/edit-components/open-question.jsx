'use client'

import { useContext, useState, useEffect } from "react"
import { reviewContext } from "../review-context"

export default function OpenQuestion({question, idx}) {

    const context = useContext(reviewContext)
    const [openQuestion, setOpenQuestion] = useState(question.question)
    const [answer, setAnswer] = useState(question.answer)

    useEffect(() => {

        let currentQuestionList = [...context.question_list]
        currentQuestionList[idx].question = openQuestion
        currentQuestionList[idx].answer = answer
        context.setQuestions(currentQuestionList)

    }, [openQuestion, answer])

    return (
        <div className="card card-border my-5 shadow-sm bg-white" key={idx}>
            <div className="flex flex-col items-start lg:w-290 w-85 m-2">
                <span className="font-bold m-2">{`Question ${question.question_num}:`}</span>

                <textarea 
                    className="m-2 w-full h-20 border-1 border-gray-400 rounded-md outline-customDarkGreen" 
                    value={openQuestion}
                    onChange={(e) => {setOpenQuestion(e.target.value)}}
                />

                <span className="font-bold m-2">Answer:</span>

                <textarea 
                    className="m-2 w-full h-20 border-1 border-gray-400 rounded-md outline-customDarkGreen" 
                    value={answer}
                    onChange={(e) => {setAnswer(e.target.value)}}
                />
            </div>
        </div>
    )
}