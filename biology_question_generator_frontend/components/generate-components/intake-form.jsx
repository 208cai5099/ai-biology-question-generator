'use client'

import Input from "./text-input"
import { useState } from "react"
import { ngssLifeScience } from "../utils"

export default function IntakeForm(props) {

  const [standards, setStandards] = useState(new Set())

  const updateStandards = (newStandard) => {

    let current = new Set()

    standards.forEach((standard) => {{current.add(standard)}})

    if (current.has(newStandard)) {
      current.delete(newStandard)
    } else {
      current.add(newStandard)
    }

    setStandards(current)

  }

    return (
      <div className="flex flex-col items-center">

          <p className="text-center text-lg mx-5 my-5">
            <span className="font-bold">Instructions: </span> 
            Enter a topic and learning standard to generate a set of Next Generation Science Standards-aligned questions about the given topic.
          </p>

          <div className="join join-vertical">
            <span className="label join-item text-xl text-black font-bold">Real-Life Topic: </span>
            <textarea className="textarea join-item text-lg lg:w-250 w-90 h-20" onChange={(i) => {props.setTopic(i.target.value)}} placeholder="Hunting down the Burmese python population in Florida" />
          </div>

          <div className="join join-vertical">
            <span className="label join-item text-xl text-black font-bold">NGSS Standards: </span>
            <div className="dropdown lg:w-250 w-90">
              <div tabIndex={0} role="button" className="btn lg:w-250 lg:text-lg w-90 text-md h-10 bg-white">
                Choose up to 2 standards
              </div>
              <ul tabIndex={0} className="dropdown-content rounded-box lg:w-250 lg:text-lg w-90 bg-white">
                {
                  ngssLifeScience.map((standard, idx) => {
                    return (
                      <div key={idx} className="grid grid-cols-20 card lg:w-250 lg:text-lg text-md my-1">
                        <div className="col-span-1">
                          <input type="checkbox" className="checkbox checkbox-accent lg:checkbox-md checkbox-xs" onClick={() => {updateStandards(standard)}}/>
                        </div>
                        <p className="col-span-19 lg:text-lg text-sm">{`${standard}`}</p>
                      </div>
                    )

                  })
                }
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <Input updateInput={(i) => {props.setMCQuestions(parseInt(i.target.value))}} name="Multiple-Choice Questions" placeholder="1" class="w-68 text-lg input m-0"/>
            <Input updateInput={(i) => {props.setOpenQuestions(parseInt(i.target.value))}} name="Open-Ended Questions" placeholder="3" class="w-60 text-lg input m-0"/>
          </div>

      </div>
    )
}