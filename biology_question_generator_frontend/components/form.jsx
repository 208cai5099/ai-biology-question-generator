'use client'

import { endpoint } from "@/utils";
import Input from "./text-input";
import { useState } from "react";

export default function IntakeForm() {

    const [topic, setTopic] = useState("")
    const [standards, setStandards] = useState("")
    const [numQuestions, setNumQuestions] = useState(3)
    const [click, setClick] = useState(false)

    const generateQuestions = async () => {

        let generateURL = endpoint + "/generate?"

        generateURL += ("question_number=" + numQuestions + "&")
        generateURL += ("topic=" + topic + "&")
        generateURL += ("standards=" + standards)

        try {
            // const questions = await fetch(generateURL).then((response) => {return response.json()})
            
            setClick(false)

        } catch (error) {
            console.log("Error: " + error)
        }
    }

    return (
      <div className="flex flex-col items-center">

        <Input updateInput={(i) => {setTopic(i.target.value)}} name="Topic" placeholder="Hunting down the Burmese python population in Florida" />

        <Input updateInput={(i) => {setStandards(i.target.value)}} name="NGSS Standard" placeholder="Design, evaluate, and refine a solution for reducing the impacts of human activities on the environment and biodiversity" />

        <Input updateInput={(i) => {setNumQuestions(parseInt(i.target.value))}} name="Number of Questions " placeholder="5" class="w-20 input text-lg"/>


        <div>
            {click ? 
                <div> 
                    <button className="btn">
                        <span className="loading loading-spinner text-green-700"></span>
                        Generating...
                    </button>
                </div> : 
            <button onClick={() => {
                setClick(true)
                generateQuestions()
            }} className="btn btn-outline btn-success">Generate</button>
            }
        </div>

      </div>
    )
}