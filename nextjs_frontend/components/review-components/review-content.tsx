'use client'

import { useState, useEffect } from "react"
import { reviewContext } from "./review-context"
import { checkLogin } from "@/app/utils/check-login"
import EditContent from "./edit-components/edit-content"
import ViewContent from "./view-components/view-content"
import { refreshToken } from "@/app/utils/refresh-token"
import { useRouter } from "next/navigation"
import { Reading, Data, Question, GeneratedContent } from "./types"

export default function ReviewContent() {

    const router = useRouter()
    const [loginStatus, setLoginStatus] = useState(false)
    const [reading, setReading] = useState<Reading | undefined>(undefined)
    const [data, setData] = useState<Data | undefined>(undefined)
    const [questions, setQuestions] = useState<Question[] | undefined>(undefined)
    const [editMode, setEditMode] = useState(false)

    // check the login status
    useEffect(() => {

        const runCheckLogin = async() => {
    
            // check whether an access token is available
            let status = await checkLogin()

            // if access token is unavailable, try to use refresh token to get new access token
            if (!status) {
                status = await refreshToken()
            }

            // if refresh token is unavailable, re-route to login page
            if (!status) {
                router.push("/login")
            }

            setLoginStatus(status)
        }

        runCheckLogin()

    }, [])

    
    // updates the reading, data, and question states when the user toggles the edit button
    useEffect(() => {

        // this block triggers after the user has made an edit
        // updates the generated content stored in session storage
        if (reading) {

            console.log(data)
            
            const newContent = {
                reading: reading,
                data: data,
                question_list: questions
            }

            sessionStorage.setItem("generated_content", JSON.stringify(newContent))

        // this block triggers in the beginning before any edits
        } else {

            // retrieves the generated content in session storage and stores them as state variables
            const content = sessionStorage.getItem("generated_content")
            
            if (content) {

                const parsedContent: GeneratedContent = JSON.parse(content)
                setReading(parsedContent.reading)
                setData(parsedContent.data)
                setQuestions(parsedContent.question_list)
            
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

                    {/* use reviewContext to pass down variables and functions for updating the generated content */}
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
                <div></div>
            }
        </div>

    )
}