'use client'

import Input from "./text-input";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function IntakeForm() {

    const router = useRouter()

    const [topic, setTopic] = useState("Hunting down the Burmese python population in Florida")
    const [standards, setStandards] = useState("Design, evaluate, and refine a solution for reducing the impacts of human activities on the environment and biodiversity")
    const [numQuestions, setNumQuestions] = useState(3)

    const redirectToView = () => {
        router.push(`/view?topic=${topic}&standards=${standards}&numQuestions=${numQuestions}`)
    }

    return (
      <div className="flex flex-col items-center">

        <Input updateInput={(i) => {setTopic(i.target.value)}} name="Real-Life Topic" placeholder="Hunting down the Burmese python population in Florida" />

        <Input updateInput={(i) => {setStandards(i.target.value)}} name="NGSS Standard" placeholder="Design, evaluate, and refine a solution for reducing the impacts of human activities on the environment and biodiversity" />

        <Input updateInput={(i) => {setNumQuestions(parseInt(i.target.value))}} name="Number of Questions " placeholder="5" class="w-60 text-lg input"/>

        <button onClick={() => {redirectToView()}} className="btn btn-success">Generate</button>

      </div>
    )
}