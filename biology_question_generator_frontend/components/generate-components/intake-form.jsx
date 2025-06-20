'use client'

import Input from "./text-input"
import { PLD } from "./content"

export default function IntakeForm(props) {

  const updateCore = (core) => {
    props.setCore(core)
    props.setPLD(new Set())
  }

  const updatePLD = (newPLD) => {

    let current = new Set()

    props.PLD.forEach((pld) => {{current.add(pld)}})

    if (current.has(newPLD)) {
      current.delete(newPLD)
    } else {
      current.add(newPLD)
    }

    props.setPLD(current)

  }

  const updatePhenmenon = (phenomenon) => {
    if (phenomenon.trim() === "") {
      props.setPhenomenon("not provided")
    } else {
      props.setPhenomenon(phenomenon.trim())
    }
  }

    return (
      <div className="flex flex-col items-center">

          <p className="text-center text-lg lg:w-300 w-90 mx-5 my-5">
            <span className="font-bold">Instructions: </span> 
            Fill out the form to generate exam preparation content.
          </p>

          <div className="join join-vertical bg-base-100 lg:w-300 w-90 mb-5">

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion" defaultChecked />
              <div className="collapse-title font-semibold lg:text-xl text-lg">Select a Core Idea:</div>
              <div className="flex flex-col items-center justify-center collapse-content">

                <p className="lg:text-xl text-lg my-2">
                  NY life science standards are split into multiple core ideas. Which one are you interested in?
                </p>

                <select 
                  defaultValue="Structure and Function" 
                  className="select lg:text-lg lg:w-130 text-md w-70 my-2"
                  onChange={(i) => {updateCore(i.target.value)}}
                  disabled={props.isGenerating === true ? true : false}
                >                  
                  <option disabled={true}>Pick a core idea</option>
                  {
                    Object.keys(PLD).map((core, idx) => {
                        return (
                          <option key={idx}>{core}</option>
                        )
                      })
                  }
                </select>                
                </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion" />
              <div className="collapse-title font-semibold lg:text-xl text-lg">Select Skills and Knowledge:</div>
              <div className="flex flex-col items-center justify-center collapse-content">

                <p className="lg:text-xl text-lg my-2">
                  The NY Life Science: Biology exam assesses the following skills for your Core Idea. Which one are you interested in?
                </p>

                <ul className="list bg-base-100 rounded-box my-3">

                  {
                    PLD[props.core].map((pld, idx) => {
                      return (
                        <li key={idx.toString() + props.core} className="list-row shadow-sm my-2">
                            <input 
                              type="checkbox" 
                              className="checkbox checkbox-accent lg:checkbox-md checkbox-sm" 
                              onClick={() => {updatePLD(pld)}}
                              disabled={props.isGenerating === true ? true : false}
                            />
                            <p>{pld}</p>
                        </li>
                      )
                    })
                  }
                  
                </ul>

                <p className="text-md max-w-250">
                  Note: These skills and knowledge are the Level 5 Performance Level Descriptions released by the NY Education Department in Fall 2023.
                  Click <a className="text-customDarkGreen" href="https://www.nysed.gov/sites/default/files/programs/state-assessment/life-science-biology-pld.pdf" title="Link to Performance Level Descriptions" target="_blank" rel="noopener noreferrer">here</a> for more info.
                </p>          
                </div>
            </div>
  
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion" />
              <div className="collapse-title font-semibold lg:text-xl text-lg">Provide Phenomenon (Recommended):</div>
              <div className="flex flex-col items-center justify-center collapse-content">

                <p className="lg:text-xl text-lg my-2">
                  The NY Life Science: Biology exam grounds the questions on real-world biological phenomenon or event.
                </p>

                <Input updateInput={(i) => {updatePhenmenon(i.target.value)}} name="Phenomenon" placeholder="" disabled={props.isGenerating === true ? true : false}></Input>      
                </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion" />
              <div className="collapse-title font-semibold lg:text-xl text-lg">Select Number of Questions:</div>
              <div className="flex flex-col items-center justify-center collapse-content">

                <p className="lg:text-xl text-lg my-2">
                  Select the number of questions to generate.
                </p>

                <div className="flex lg:flex-row flex-col">
                  <Input updateInput={(i) => {props.setMCQuestions(parseInt(i.target.value))}} name="Multiple-Choice Questions" placeholder="1" class="w-68 text-lg input mx-2" disabled={props.isGenerating === true ? true : false}/>
                  <Input updateInput={(i) => {props.setOpenQuestions(parseInt(i.target.value))}} name="Open-Ended Questions" placeholder="3" class="w-60 text-lg input mx-2" disabled={props.isGenerating === true ? true : false}/>
                </div>

                </div>
            </div>

          </div>

      </div>
    )
}