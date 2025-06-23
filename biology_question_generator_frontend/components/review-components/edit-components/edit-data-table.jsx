'use client'

import { useContext, useState, useEffect } from "react"
import { reviewContext } from "../review-context"
import Row from "./row"

export default function EditDataTable() {

    const context = useContext(reviewContext)
    const [title, setTitle] = useState(context.data.title)

    useEffect(() => {

        let data = context.data
        data.title = title
        context.setData(data)

    }, [title])

    return (
        <div className="card card-border lg:w-300 w-90 my-5 mx-2 shadow-sm bg-white">
            <div className="flex flex-col items-start lg:w-290 w-85 m-2">

                <span className="font-bold m-2">Data Table Title</span>

                <input 
                    className="m-2 w-full h-10 border-1 border-gray-400 rounded-md outline-customDarkGreen" 
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />

                <div className="overflow-x-auto border-1 border-gray-400 rounded-sm w-full lg:w-290 w-85 m-2">
                    <Row row={context.data.col_names} />
                    {
                        context.data.row_values.map((row, idx) => {
                            return (
                                <Row row={row} rowIndex={idx} key={idx}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}