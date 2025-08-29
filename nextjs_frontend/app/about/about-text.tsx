import * as content from "./content"

export default function AboutText() {
    
    return (
        <div className="flex flex-col justify-center items-center">

            {/* display a description of the website */}
            <div className="w-4/5 mt-10">
                <div>
                    <h2 className="card-title">What is this Website?</h2>
                    <p className="mt-3">{content.websiteDescription}</p>
                </div>
            </div>


            <div className="w-4/5 mt-10">
                <div>
                    <h2 className="card-title">What are the NYS P-12 Science Standards?</h2>

                    {/* display a description of the standards */}
                    <p className="my-3">
                        {content.standardsDescription + 'For more info about NGSS, click '}
                        <a className="text-customDarkGreen" href={content.ngssURL} title="Link to NGSS website" target="_blank" rel="noopener noreferrer"> here</a>
                        .
                    </p>


                    {/* list out the topics */}
                    <p>Among the NYS P-12 standards, a handful of them are Life Science standards. The high school Life Science Standards are categorized under 5 topics:</p>
                    
                    <ul className="indent-5">
                        {content.topics.slice(0, 5).map((idea, idx) => {
                            return (
                                <li key={idx}>{"•  " + idea}</li>
                            )
                        })}
                    </ul>

                    <p className="mt-3">The NYS Life Science: Biology exam assesses two extra topics: </p>
                    
                    <ul className="indent-5">
                        {content.topics.slice(5, 7).map((idea, idx) => {
                            return (
                                <li key={idx}>{"•  " + idea}</li>
                            )
                        })}
                    </ul>

                    {/* link to additional info about the standards */}
                    <p className="mt-3">
                        For more info about the NYS P-12 standards, click 
                        <a className="text-customDarkGreen" href={content.nysScienceURL} title="Link to NY P-12 science standards" target="_blank" rel="noopener noreferrer"> here</a>
                        .
                    </p>
                </div>
            </div>

            <div className="w-4/5 mt-10">
                <div>
    
                    {/* display a description of the exam */}
                    <h2 className="card-title">How is the New Life Science: Biology Exam Different?</h2>

                        {
                            content.examDescription.split("\n\n").map((text, idx) => {
                                return (
                                    <p className="my-3" key={idx}>{text}</p>
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

            <div className="w-4/5 mt-10">
                <div>

                    {/* display bio of myself */}
                    <h2 className="card-title">Who Made This Website?</h2>

                    <div className="flex lg:flex-row md:flex-row flex-col lg:justify-start lg:items-center">
                        
                        <div className="w-30 h-30 mr-2 lg:block hidden">
                            <img src={content.picURL} alt="hand waving Hi"></img>
                        </div>

                        <div className="lg:w-4/5 w-full">
                            {
                                content.bio.split("\n\n").map((text, idx) => {
                                    return (
                                        <p className="my-3" key={idx}>{text}</p>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>


            <footer className="text-lg mt-10">Made with 💚 in NYC</footer>

        </div>
    )
}