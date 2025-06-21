'use client'

export default function Reading({title, content}) {

    return (
        <div className="card card-border lg:w-300 w-90 my-5 mx-2 shadow-sm bg-white">
            <div className="card-body">
                <div className="mx-2">
                    <h1 className="text-left text-lg">{title}</h1>

                    {content.includes('\n') ?
                        <div>
                            {content.split('\n').map((p, idx) => {
                                return (
                                    <p key={idx}>{p.trim()}</p>
                                )
                            })}
                        </div>
                        :
                        <div>
                            <p>{content}</p>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}