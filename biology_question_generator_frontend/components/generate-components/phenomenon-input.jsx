import { useContext } from "react"
import { formContext } from "./context"

export default function PhenomenonInput() {

    const context = useContext(formContext)

    return (
        <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title font-semibold lg:text-xl text-lg">Provide Phenomenon (Recommended):</div>
            <div className="flex flex-col items-center justify-center collapse-content">

            <p className="lg:text-xl text-lg my-2 text-wrap">
                The NY Life Science: Biology exam grounds the questions on real-world biological phenomenon or event.
            </p>

            <div className="py-3">

                <label className={"lg:w-150 w-80 text-lg input"}>
                    <span className="font-bold">Enter your phenomenon: </span> 
                    <input type="text" onChange={(e) => {context.updatePhenomenon(e.target.value)}} disabled={context.isGenerating}/>
                </label>

            </div>
            </div>
        </div>
    )
}