'use client'

export default function DataTable(props) {

    return (
        <div className="card card-border bg-slate-800 mb-5 lg:w-200 md:w-200 sm:50 shadow-sm">
            <div className="card-body">
                <div className="mx-10">
                    <h1 className="text-left text-lg">{props.title}</h1>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    {props.colNames.map((col, idx) => {
                                        return (
                                            <th key={idx}>{col}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {props.rows.map((row, idx) => {
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