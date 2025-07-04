'use client'

import Cell from "./cell"

export default function Row({row, rowIndex}) {

    return (
        <div className="join w-full">
            {
                row.map((val, i) => {
                    return (
                        <Cell cellValue={val} cellIndex={i} rowIndex={rowIndex} key={i}/>
                    )
                })
            }
        </div>
    )
}