import { AllPLD, PLDURL } from "./content"
import { useContext } from "react"
import { formContext } from "./context"

export default function PLDInput() {

    const context = useContext(formContext)

    return (
        <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title font-semibold lg:text-xl text-lg">Select Skills and Knowledge:</div>
            <div className="flex flex-col items-center justify-center collapse-content">

            <p className="lg:text-xl text-lg my-2">
                The NY Life Science: Biology exam assesses the following skills for your topic. Which one are you interested in?
            </p>

            <ul className="list bg-base-100 rounded-box my-3">

                {/* display the PLDs as a checkbox menu */}
                {
                AllPLD.find((e) => e.topic === context?.topic)?.pldList.map((pld, idx) => {
                    return (
                    <li key={idx.toString() + context?.topic} className="list-row shadow-sm my-2">
                        <input 
                            type="checkbox" 
                            className="checkbox checkbox-accent lg:checkbox-md checkbox-sm" 
                            onClick={() => {context?.updatePLD(pld)}}
                            disabled={context?.isGenerating}
                        />
                        <p>{pld}</p>
                    </li>
                    )
                })
                }
                
            </ul>

            <p className="text-md max-w-250">
                Note: These skills and knowledge are the Level 5 Performance Level Descriptions released by the NY Education Department in Fall 2023.
                Click <a className="text-customDarkGreen" href={PLDURL} title="Link to Performance Level Descriptions" target="_blank" rel="noopener noreferrer">here</a> for more info.
            </p>          
            </div>
        </div>
    )
}