'use client'

import { useContext, useState, useEffect } from "react"
import { reviewContext } from "../review-context"

export default function EditMCQuestion({question, idx}) {

    const context = useContext(reviewContext)
    const [mcQuestion, setMCQuestion] = useState(question.question)
    const [choices, setChoices] = useState([question.choice_a, question.choice_b, question.choice_c, question.choice_d])
    const [answer, setAnswer] = useState(question.answer)

    const updateChoices = (event, index) => {

        let current = [...choices]
        current[index] = event.target.value
        setChoices(current)

    }

    useEffect(() => {

        let currentQuestionList = [...context.question_list]
        currentQuestionList[idx].question = mcQuestion
        currentQuestionList[idx].answer = answer
        currentQuestionList[idx].choice_a = choices[0]
        currentQuestionList[idx].choice_b = choices[1]
        currentQuestionList[idx].choice_c = choices[2]
        currentQuestionList[idx].choice_d = choices[3]
        context.setQuestions(currentQuestionList)

    }, [mcQuestion, choices, answer])

    const letters = {0 : "A", 1 : "B", 2 : "C", 3 : "D"}

    return (
        <div className="card card-border my-5 shadow-sm bg-white" key={idx}>
            <div className="join join-vertical lg:w-290 w-85 m-2">
                <label className="join-item">
                    <span className="font-bold m-2">{`Question ${question.question_num}:`}</span>
                </label>
                <div className="join-item">
                    <textarea 
                        className="join-item m-2 w-full h-20 border-1 border-gray-200"
                        value={mcQuestion}
                        onChange={(e) => {setMCQuestion(e.target.value)}}
                    />
                </div>
                {
                    choices.map((choice, index) => {
                        return (
                            <label className="join-item my-4" key={index}>
                                <span className="font-bold mx-2">{`Choice ${letters[index]}: `}</span>
                                <input 
                                    className="mx-2 w-full h-10 border-1 border-gray-200" 
                                    value={choice}
                                    onChange={(event) => {updateChoices(event, index)}}
                                />
                            </label>
                        )
                    })
                }
                <label className="join-item">
                    <span className="font-bold m-2">Answer:</span>
                </label>

                <div className="join-item">
                    <input 
                        className="join-item m-2 w-full h-10 border-1 border-gray-200" 
                        value={answer}
                        onChange={(e) => {setAnswer(e.target.value)}}
                    />
                </div>
            </div>
        </div>
    )
}