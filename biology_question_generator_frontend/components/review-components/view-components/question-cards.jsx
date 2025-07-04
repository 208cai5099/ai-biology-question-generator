'use client'

import { useContext } from "react"
import { reviewContext } from "../review-context"

export default function QuestionCards() {

    const context = useContext(reviewContext)

    return (
        <div className="lg:w-300 w-90 my-5 mx-2">
            {context.question_list.map((question, idx) => {

                if (question.question_type === "multiple choice") {

                    const choices = [question.choice_a, question.choice_b, question.choice_c, question.choice_d]

                    return (
                        <div className="card card-border my-5 shadow-sm bg-white" key={idx}>
                            <div className="card-body">
                                <div>
                                    <h1 className="text-left text-lg">{`Question Number ${question.question_num}`}</h1>
                                    <p>{question.question}</p>
                                    <p></p>
                                    {choices.map((choice, idx) => {
                                        return (
                                            <div key={idx}>
                                                <p>{choice}</p>
                                                <p></p>
                                            </div>
                                        )
                                    })}
                                    <p>{`Answer: ${question.answer}`}</p>
                                </div>
                            </div>
                        </div> 
                    )
                } else {

                    return (
                        <div className="card card-border my-5 shadow-sm bg-white" key={idx}>
                            <div className="card-body">
                                <div>
                                    <h1 className="text-left text-lg">{`Question Number ${question.question_num}`}</h1>
                                    <p>{question.question}</p>
                                    <p></p>
                                    <p>{`Answer: ${question.answer}`}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}

        </div>

    )
}