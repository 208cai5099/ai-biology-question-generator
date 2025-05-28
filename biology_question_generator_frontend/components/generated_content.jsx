'use client'

import DataTable from "./data-table"
import QuestionCards from "./question-cards"
import Reading from "./reading"

export default function GeneratedContent(props) {

    return (

        <div className="flex flex-col items-center">
            <Reading title={props.readingTitle} content={props.readingContent}/>
            <DataTable title={props.dataTitle} colNames={props.colNames} rows={props.rowValues}/>
            <QuestionCards questionsList={props.questionsList}/>
        </div>

    )
}