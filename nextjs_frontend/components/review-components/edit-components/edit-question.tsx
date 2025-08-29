'use client'

import { useContext } from "react"
import { reviewContext } from "../review-context"
import MCQuestion from "./mc-question"
import OpenQuestion from "./open-question"

export default function EditQuestion() {

    const context = useContext(reviewContext)

    return (
        <div className="lg:w-300 w-90 my-5 mx-2">

            {context?.question_list?.map((question, idx) => {

                if (question.question_type === "multiple choice") {

                    return (
                        <MCQuestion question={question} idx={idx} key={idx} />
                    )

                } else {

                    return (
                        <OpenQuestion question={question} idx={idx} key={idx} />
                    )
                }
            })}

        </div>
    )
}