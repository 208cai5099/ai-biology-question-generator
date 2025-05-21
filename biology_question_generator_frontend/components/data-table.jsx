'use client'

import jsonData from '/Users/zhuobiaocai/Desktop/ai-biology-question-generator/test_result.json' assert { type: 'json' };

export default function DataTable(props) {

    const title = jsonData.data.title
    const colNames = jsonData.data.col_names
    const rows = jsonData.data.row_values

    return (
        <div className="card card-border bg-slate-800 mb-5 lg:w-200 md:w-200 sm:50 shadow-sm">
            <div className="card-body">
                <div className="mx-10">
                    <h1 className="text-left text-lg">{title}</h1>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    {colNames.map((col, idx) => {
                                        return (
                                            <th key={idx}>{col}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, idx) => {
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