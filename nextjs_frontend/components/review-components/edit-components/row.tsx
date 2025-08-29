'use client'

import { RowType } from "../types"
import Cell from "./cell"

export default function Row({row, rowIndex} : RowType) {

    return (
        <div className="join w-full">

            {/* iterate through each value in a row and display it in a data table cell */}
            {
                row?.map((val, idx) => {
                    return (
                        <Cell cellValue={val} cellIndex={idx} rowIndex={rowIndex} key={idx}/>
                    )
                })
            }
        </div>
    )
}