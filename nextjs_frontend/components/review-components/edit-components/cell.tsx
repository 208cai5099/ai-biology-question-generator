'use client'

import { useContext, useState, useEffect } from "react"
import { reviewContext } from "../review-context"
import { CellType } from "../types"

export default function Cell({cellValue, cellIndex, rowIndex}: CellType) {

    const context = useContext(reviewContext)
    const [value, setValue] = useState(cellValue)

    // update the values in the data table
    useEffect(() => {

        if (context && context.data) {
            
            let data = context.data

            // this block updates the data table values (not the header values)
            if (rowIndex !== undefined && data.row_values?.[rowIndex]) {
                data.row_values[rowIndex][cellIndex] = value

            // this block updates the table headers
            } else if (rowIndex === undefined && data.col_names) {
                data.col_names[cellIndex] = value

            }

            context.setData(data)
        }

    }, [value])

    return (
        <input
            className="join-item w-full outline-customDarkGreen"
            value={value}
            onChange={(e) => {setValue(e.target.value)}}
        />
    )
}