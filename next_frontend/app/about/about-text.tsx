import * as content from "./content"

export default function AboutText() {
    
    return (
        <div className="flex flex-col justify-center items-center">

            {/* display a description of the website */}
            <div className="card bg-base-100 w-4/5 shadow-sm mt-5">
                <div className="card-body">
                    <h2 className="card-title">What is This Website?</h2>
                    {content.websiteDescription}
                </div>
            </div>


            <div className="card bg-base-100 w-4/5 shadow-sm mt-5">
                <div className="card-body">
                    <h2 className="card-title">What are the P-12 Science Standards?</h2>

                    {/* display a description of the standards */}
                    <p>
                        {content.standardsDescription + 'For more info about NGSS, click '}
                        <a className="text-customDarkGreen" href={content.ngssURL} title="Link to NGSS website" target="_blank" rel="noopener noreferrer"> here</a>
                        .
                    </p>


                    {/* list out the topics */}
                    <p>In the set of new P-12 standards, a handful of them are Life Science standards. The high school Life Science Standards are categorized under 5 topics:</p>
                    
                    <ul>
                        {content.topics.slice(0, 5).map((idea, idx) => {
                            return (
                                <li key={idx}>{"•  " + idea}</li>
                            )
                        })}
                    </ul>

                    <p>The Life Science: Biology exam assesses two extra topics: </p>
                    
                    <ul>
                        {content.topics.slice(5, 7).map((idea, idx) => {
                            return (
                                <li key={idx}>{"•  " + idea}</li>
                            )
                        })}
                    </ul>

                    {/* link to additional info about the standards */}
                    <p>
                        For more info about the NY P-12 standards, click 
                        <a className="text-customDarkGreen" href={content.nysScienceURL} title="Link to NY P-12 science standards" target="_blank" rel="noopener noreferrer"> here</a>
                        .
                    </p>
                </div>
            </div>

            <div className="card bg-base-100 w-4/5 shadow-sm mt-5">
                <div className="card-body">
    
                    {/* display a description of the exam */}
                    <h2 className="card-title">How is the New Life Science: Biology Exam Different?</h2>

                        {
                            content.examDescription.split("\n\n").map((text, idx) => {
                                return (
                                    <p key={idx}>{text}</p>
                                )
                            })
                        }

                        {/* link to additional info about exam */}
                        <p>
                            For more information about the new exam, click 
                            <a className="text-customDarkGreen" href={content.nysLifeScienceURL} title="Link to info about the NY Life Science: Biology exam" target="_blank" rel="noopener noreferrer"> here</a>
                            .
                        </p>

                </div>
            </div>

            <div className="card bg-base-100 w-4/5 shadow-sm mt-5">
                <div className="card-body">

                    {/* display bio of myself */}
                    <h2 className="card-title">Who Made This Website?</h2>

                    <div className="flex lg:flex-row md:flex-row flex-col lg:justify-start lg:items-center">
                        
                        <div className="w-30 h-30 mr-2 lg:block hidden">
                            <img src={content.picURL}></img>
                        </div>

                        <div className="lg:w-4/5 w-full">
                            {
                                content.bio.split("\n\n").map((text, idx) => {
                                    return (
                                        <p key={idx}>{text}</p>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}