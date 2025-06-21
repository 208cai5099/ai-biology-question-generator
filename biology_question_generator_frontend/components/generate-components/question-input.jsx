import { useContext } from "react"
import { formContext } from "./context"

export default function QuestionInput() {

    const context = useContext(formContext)

    return (
        <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title font-semibold lg:text-xl text-lg">Select Number of Questions:</div>
            <div className="flex flex-col items-center justify-center collapse-content">

            <p className="lg:text-xl text-lg my-2">
                Select the number of questions to generate.
            </p>

            <div className="flex lg:flex-row flex-col">
                <div className="py-3">
                    <label className={"w-68 text-lg input mx-2"}>
                        <span className="font-bold">Multiple-Choice Questions: </span> 
                        <input type="text" placeholder="1" onChange={(e) => {context.setMCQuestions(parseInt(e.target.value))}} disabled={context.isGenerating}/>
                    </label>
                </div>

                <div className="py-3">
                    <label className={"w-68 text-lg input mx-2"}>
                        <span className="font-bold">Open-Ended Questions: </span> 
                        <input type="text" placeholder="3" onChange={(e) => {context.setOpenQuestions(parseInt(e.target.value))}} disabled={context.isGenerating}/>
                    </label>
                </div>
            </div>

            </div>
        </div>
    )
}