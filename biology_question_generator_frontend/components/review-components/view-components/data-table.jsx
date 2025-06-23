'use client'

import { useContext } from "react"
import { reviewContext } from "../review-context"

export default function DataTable() {

    const context = useContext(reviewContext)

    return (
        <div className="card card-border lg:w-300 w-90 mb-5 mx-2 shadow-sm bg-white">
            <div className="card-body">
                <div className="mx-2">
                    <h1 className="text-left text-lg">{context.data.title}</h1>
                    <div className="overflow-x-auto rounded-box border-1 border-gray-300">
                        <table className="table">
                            <thead>
                                <tr>
                                    {context.data.col_names.map((col, idx) => {
                                        return (
                                            <th key={idx} className="text-black">{col}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {context.data.row_values.map((row, idx) => {
                                    return (
                                        <tr key={idx}>
                                            {row.map((val, idx) => {
                                                return (
                                                    <td key={idx}>{val}</td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}