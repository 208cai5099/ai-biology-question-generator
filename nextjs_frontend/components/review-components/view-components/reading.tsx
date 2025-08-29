'use client'

import { useContext } from "react"
import { reviewContext } from "../review-context"

export default function Reading() {

    const context = useContext(reviewContext)

    return (
        <div className="card card-border lg:w-300 w-90 my-5 mx-2 shadow-sm bg-white">
            <div className="card-body">
                <div className="mx-2">
                    <h1 className="text-left text-lg">{context?.reading?.title}</h1>
                        <p>{context?.reading?.content?.trim()}</p>
                </div>
            </div>
        </div>
    )
}