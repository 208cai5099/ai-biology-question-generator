'use client'

import { useContext } from "react"
import { reviewContext } from "../review-context"
import EditReading from "./edit-reading"
import EditQuestion from "./edit-question"
import EditDataTable from "./edit-data-table"

export default function EditContent() {

    const context = useContext(reviewContext)

    return (
        <div>
            
            {
                context.reading && context.data && context.question_list ?
                <div className="flex flex-col items-center">
                    <p className="text-left text-lg lg:w-300 w-90 mt-5">
                        Instructions: You can edit the content by switching to Edit Mode. Turn off Edit Mode to see your changes.
                    </p>
                    <p className="text-left text-md lg:w-300 w-90">
                        Note: The following content are generated using an AI model. The data values in the table are hypothetical.
                        Please keep in mind that the AI model can make mistakes.
                    </p>

                    <div>
                        <EditReading />
                        <EditDataTable />
                        <EditQuestion />
                    </div>

                </div> :
                <div></div>
            }
        </div>

    )
}