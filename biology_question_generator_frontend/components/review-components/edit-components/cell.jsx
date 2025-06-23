'use client'

import { useContext, useState, useEffect } from "react"
import { reviewContext } from "../review-context"

export default function Cell({cellValue, cellIndex, rowIndex}) {

    const context = useContext(reviewContext)
    const [value, setValue] = useState(cellValue)

    useEffect(() => {

        let data = context.data

        if (rowIndex !== undefined) {
            data.row_values[rowIndex][cellIndex] = value
        } else {
            data.col_names[cellIndex] = value
        }

        context.setData(data)

    }, [value])

    return (
        <input
            className="join-item w-full outline-customDarkGreen"
            value={value}
            onChange={(e) => {setValue(e.target.value)}}
        />
    )
}