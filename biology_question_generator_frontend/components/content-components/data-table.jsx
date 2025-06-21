'use client'

export default function DataTable({title, colNames, rows}) {

    return (
        <div className="card card-border lg:w-300 w-90 mb-5 mx-2 shadow-sm bg-white">
            <div className="card-body">
                <div className="mx-2">
                    <h1 className="text-left text-lg">{title}</h1>
                    <div className="overflow-x-auto rounded-box border border-base-content/5">
                        <table className="table">
                            <thead>
                                <tr>
                                    {colNames.map((col, idx) => {
                                        return (
                                            <th key={idx} className="text-black">{col}</th>
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