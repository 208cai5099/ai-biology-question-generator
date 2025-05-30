'use client'

import DataTable from "./data-table"
import QuestionCards from "./question-cards"
import Reading from "./reading"

export default function GeneratedContent(props) {

    return (

        <div className="flex flex-col items-center">
            <p className="text-center text-lg my-5">
                The following content are generated using an AI model. The data values in the table are hypothetical.
                Please keep in mind that the AI model can make mistakes.
            </p>
            <Reading title={props.readingTitle} content={props.readingContent}/>
            <DataTable title={props.dataTitle} colNames={props.colNames} rows={props.rowValues}/>
            <QuestionCards questionsList={props.questionsList}/>
        </div>

    )
}