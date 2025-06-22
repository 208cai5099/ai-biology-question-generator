'use client'

import { useState, useEffect } from "react"
import { reviewContext } from "./review-context"
import EditContent from "./edit-components/edit-content"
import ViewContent from "./view-components/view-content"

export default function ReviewContent() {

    const [reading, setReading] = useState(undefined)
    const [data, setData] = useState(undefined)
    const [questions, setQuestions] = useState(undefined)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {

        if (reading === undefined) {
            const content = JSON.parse(sessionStorage.getItem("generated_content"))

            setReading(content.reading)
            setData(content.data)
            setQuestions(content.question_list)
        }


    }, [editMode])

    return (
        <div>

            <fieldset className="fieldset flex flex-row justify-start items-center fixed top-20 right-1 z-10 bg-customBackground rounded-lg border-gray-300 border-1 w-32 h-10">
                <input
                    type="checkbox"
                    className="toggle outline-none border-gray-300 bg-gray-300 checked:border-customMediumGreen checked:bg-customMediumGreen mx-1"
                    onClick={() => {setEditMode(!editMode)}}
                />
                <label className="text-[15px]">
                    Edit Mode
                </label>
            </fieldset>

            <reviewContext.Provider value={{
                reading: reading,
                data: data,
                question_list: questions,
                setReading: setReading,
                setQuestions: setQuestions
            }}
            >
            {
                editMode ?
                <EditContent /> :
                <ViewContent />
            }
            </reviewContext.Provider>
            

        </div>

    )
}