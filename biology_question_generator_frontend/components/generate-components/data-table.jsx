'use client'

export default function DataTable(props) {

    return (
        <div className="card card-border mb-5 mx-40 shadow-sm bg-white">
            <div className="card-body">
                <div className="mx-10">
                    <h1 className="text-left text-lg">{props.title}</h1>
                    <div className="overflow-x-auto rounded-box border border-base-content/5">
                        <table className="table">
                            <thead>
                                <tr>
                                    {props.colNames.map((col, idx) => {
                                        return (
                                            <th key={idx} className="text-black">{col}</th>
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