import NavBar from "@/components/navbar-components/navbar"
import Chatbot from "@/components/chatbot-components/chatbot"
import { websiteDescription, standardsDescription, coreIdeas, examDescription, bio} from "./utils"

export default function About() {

    return (
        <div className="bg-customBackground min-h-screen">

            <NavBar />

            <div className="fixed right-5 bottom-5 z-10">
                <Chatbot />
            </div>

            <div className="flex flex-col justify-center items-center">
                <div className="card bg-base-100 w-4/5 shadow-sm mt-5">
                    <div className="card-body">
                        <h2 className="card-title">What is This Website?</h2>
                        {websiteDescription}
                    </div>
                </div>


                <div className="card bg-base-100 w-4/5 shadow-sm mt-5">
                    <div className="card-body">
                        <h2 className="card-title">What are the P-12 Science Standards?</h2>
                        
                        <p>
                            {standardsDescription + 'For more info about NGSS, click '}
                            <a className="text-customDarkGreen" href="https://www.nextgenscience.org/" title="Link to NGSS website" target="_blank" rel="noopener noreferrer"> here</a>
                            .
                        </p>

                        <p>In the set of new P-12 standards, a handful of them are Life Science standards. The high school Life Science Standards are categorized under 5 core ideas:</p>
                        
                        <ul>
                            {coreIdeas.slice(0, 5).map((idea, idx) => {
                                return (
                                    <li key={idx}>{"•  " + idea}</li>
                                )
                            })}
                        </ul>

                        <p>The Life Science: Biology exam assesses two extra core ideas: </p>
                        
                        <ul>
                            {coreIdeas.slice(5, 7).map((idea, idx) => {
                                return (
                                    <li key={idx}>{"•  " + idea}</li>
                                )
                            })}
                        </ul>

                        <p>
                            For more info about the NY P-12 standards, click 
                            <a className="text-customDarkGreen" href="https://www.nysed.gov/standards-instruction/science" title="Link to NY P-12 science standards" target="_blank" rel="noopener noreferrer"> here</a>
                            .
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 w-4/5 shadow-sm mt-5">
                    <div className="card-body">
                        <h2 className="card-title">How is the New Life Science: Biology Exam Different?</h2>

                            {
                                examDescription.split("\n\n").map((text, idx) => {
                                    return (
                                        <p key={idx}>{text}</p>
                                    )
                                })
                            }

                            <p>
                                For more information about the new exam, click 
                                <a className="text-customDarkGreen" href="https://www.nysed.gov/state-assessment/life-science-biology" title="Link to info about the NY Life Science: Biology exam" target="_blank" rel="noopener noreferrer"> here</a>
                                .
                            </p>

                    </div>
                </div>

                <div className="card bg-base-100 w-4/5 shadow-sm mt-5">
                    <div className="card-body">
                        <h2 className="card-title">Who Made This Website?</h2>

                        <div className="flex lg:flex-row md:flex-row flex-col lg:justify-start lg:items-center">
                            
                            <div className="w-1/5 w-30 h-30 mr-2 lg:block hidden">
                                <img src="https://openmoji.org/data/color/svg/1F44B-1F3FB.svg"></img>
                            </div>

                            <div className="lg:w-4/5 w-full">
                                {
                                    bio.split("\n\n").map((text, idx) => {
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

        </div>
    )
}