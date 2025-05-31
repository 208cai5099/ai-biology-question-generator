'use client'

import DataTable from "./data-table"
import QuestionCards from "./question-cards"
import Reading from "./reading"

export default function GeneratedContent(props) {

    return (

        <div className="flex flex-col items-center">
            <p className="text-center text-lg lg:w-300 w-90 my-5">
                The following content are generated using an AI model. The data values in the table are hypothetical.
                Please keep in mind that the AI model can make mistakes.
            </p>

            {
                (props.reading !== undefined && props.data !== undefined && props.questionsList !== undefined) ?
                <div>
                    <Reading title={props.reading.title} content={props.reading.content}/>
                    <DataTable title={props.data.title} colNames={props.data.col_names} rows={props.data.row_values}/>
                    <QuestionCards questionsList={props.questionsList}/>
                </div> :
                <div></div>
            }

        </div>

    )
}