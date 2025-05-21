'use client'

import jsonData from '/Users/zhuobiaocai/Desktop/ai-biology-question-generator/test_result.json' assert { type: 'json' };

export default function Reading(props) {

    const title = jsonData.reading.title
    const content = jsonData.reading.content

    return (
        <div className="card card-border bg-slate-800 my-5 lg:w-200 md:w-200 sm:50 shadow-sm">
            <div className="card-body">
                <div className="mx-10">
                    <h1 className="my-5 text-left text-lg">{title}</h1>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}