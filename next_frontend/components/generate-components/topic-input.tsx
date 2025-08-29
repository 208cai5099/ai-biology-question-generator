import { AllPLD } from "./content"
import { useContext } from "react"
import { formContext } from "./context"

export default function TopicInput() {

    const context = useContext(formContext)

    return (
        <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion" defaultChecked />
            <div className="collapse-title font-semibold lg:text-xl text-lg">Select a Topic:</div>
            <div className="flex flex-col items-center justify-center collapse-content">

            <p className="lg:text-xl text-lg my-2">
                NY life science standards are split into multiple topics. Which one are you interested in?
            </p>

            <select 
                defaultValue="Structure and Function" 
                className="select lg:text-lg lg:w-130 text-md w-70 my-2"
                onChange={(i) => {context?.updateTopic(i.target.value)}}
                disabled={context?.isGenerating}
            >                  
                <option disabled={true}>Pick a topic</option>
                {
                    Object.keys(AllPLD).map((topic, idx) => {
                        return (
                            <option key={idx}>{topic}</option>
                        )
                        })
                }
            </select>                
            </div>
        </div>
    )
}