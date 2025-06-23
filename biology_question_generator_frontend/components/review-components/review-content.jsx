'use client'

import { useState, useEffect } from "react"
import { reviewContext } from "./review-context"
import { checkLogin } from "@/app/middleware/check-login"
import EditContent from "./edit-components/edit-content"
import ViewContent from "./view-components/view-content"
import LoginReminder from "../generate-components/login-reminder"

export default function ReviewContent() {

    const [loginStatus, setLoginStatus] = useState(false)
    const [reading, setReading] = useState(undefined)
    const [data, setData] = useState(undefined)
    const [questions, setQuestions] = useState(undefined)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {

        const runCheckLogin = async() => {
            const status = await checkLogin()
            setLoginStatus(status)
        }

        runCheckLogin()

    }, [])


    useEffect(() => {

        if (reading !== undefined) {
            
            const newContent = {
                reading: reading,
                data: data,
                question_list: questions
            }

            sessionStorage.setItem("generated_content", JSON.stringify(newContent))
        } else {
            const content = JSON.parse(sessionStorage.getItem("generated_content"))

            if (content !== null) {
                setReading(content.reading)
                setData(content.data)
                setQuestions(content.question_list)
            }
        }


    }, [editMode])

    return (
        <div className="flex flex-col justify-center items-center">
            {
                loginStatus ?
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
                        setQuestions: setQuestions,
                        setData: setData
                    }}
                    >
                    {
                        editMode ?
                        <EditContent /> :
                        <ViewContent />
                    }
                    </reviewContext.Provider>
                </div>
                :
                <LoginReminder />
            }
        </div>

    )
}