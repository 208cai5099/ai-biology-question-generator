'use client'

import Input from "./text-input";

export default function IntakeForm(props) {

    return (
      <div className="flex flex-col items-center">

          <p className="text-center text-xl px-5 py-5"><span className="font-bold">Instructions: </span> Enter a topic and learning standard to generate a set of standard-aligned questions about the given topic.</p>

          <div className="join join-vertical">
            <span className="label join-item text-xl text-black font-bold">Real-Life Topic: </span>
            <textarea className="textarea join-item text-lg lg:w-250 w-100 h-20" onChange={(i) => {props.setTopic(i.target.value)}} placeholder="Hunting down the Burmese python population in Florida" />
          </div>

          <div className="join join-vertical">
            <span className="label join-item text-xl text-black font-bold">NGSS Standard: </span>
            <textarea className="textarea join-item text-lg lg:w-250 w-100 h-20" onChange={(i) => {props.setStandards(i.target.value)}} placeholder="Design, evaluate, and refine a solution for reducing the impacts of human activities on the environment and biodiversity" />
          </div>

          <Input onChange={(i) => {props.setNumQuestions(parseInt(i.target.value))}} name="Number of Questions " placeholder="5" class="w-60 text-lg input"/>

      </div>
    )
}