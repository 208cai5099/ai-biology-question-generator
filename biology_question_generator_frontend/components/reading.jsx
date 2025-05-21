'use client'

export default function Reading(props) {

    return (
        <div className="card card-border bg-slate-800 my-5 lg:w-200 md:w-200 sm:50 shadow-sm">
            <div className="card-body">
                <div className="mx-10">
                    <h1 className="my-5 text-left text-lg">{props.title}</h1>
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    )
}