'use client'

export default function Reading(props) {

    return (
        <div className="card card-border my-5 mx-40 shadow-sm bg-white">
            <div className="card-body">
                <div className="mx-10">
                    <h1 className="text-left text-lg">{props.title}</h1>

                    {props.content.includes('\n') ?
                        <div>
                            {props.content.split('\n').map((p, idx) => {
                                return (
                                    <p key={idx}>{p.trim()}</p>
                                )
                            })}
                        </div>
                        :
                        <div>
                            <p>{props.content}</p>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}