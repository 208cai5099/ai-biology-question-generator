'use client'

import { useContext, useState, useEffect } from "react"
import { reviewContext } from "../review-context"

export default function EditOpenQuestion({question, idx}) {

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
            <div className="join join-vertical lg:w-290 w-85 m-2">
                <label className="join-item">
                    <span className="font-bold m-2">{`Question ${question.question_num}:`}</span>
                </label>

                <div className="join-item">
                    <textarea 
                        className="join-item m-2 w-full h-20 border-1 border-gray-200" 
                        value={openQuestion}
                        onChange={(e) => {setOpenQuestion(e.target.value)}}
                    />
                </div>

                <label className="join-item">
                    <span className="font-bold m-2">Answer:</span>
                </label>

                <div className="join-item">
                    <textarea 
                        className="join-item m-2 w-full h-20 border-1 border-gray-200" 
                        value={answer}
                        onChange={(e) => {setAnswer(e.target.value)}}
                    />
                </div>
            </div>
        </div>
    )
}