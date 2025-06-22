'use client'

import { useContext } from "react"
import { reviewContext } from "../review-context"
import EditMCQuestion from "./edit-mc-question"
import EditOpenQuestion from "./edit-open-question"

export default function EditQuestion() {

    const context = useContext(reviewContext)

    return (
        <div className="lg:w-300 w-90 my-5 mx-2">

            {context.question_list.map((question, idx) => {

                if (question.question_type === "multiple choice") {

                    return (
                        <EditMCQuestion question={question} idx={idx} key={idx} />
                    )

                } else {

                    return (
                        <EditOpenQuestion question={question} idx={idx} key={idx} />
                    )
                }
            })}

        </div>
    )
}