'use client'

import { checkLogin } from "@/app/middleware/check-login"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { fetchGeneration } from "@/app/middleware/fetch-generation"
import { formContext } from "./context"
import LoginReminder from "./login-reminder"
import TopicInput from "./topic-input"
import PLDInput from "./pld-input"
import PhenomenonInput from "./phenomenon-input"
import QuestionInput from "./question-input"

export default function GenerateForm() {
  
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [topic, setTopic] = useState("Structure and Function")
  const [PLD, setPLD] = useState(new Set())
  const [phenomenon, setPhenomenon] = useState("not provided")
  const [MCQuestions, setMCQuestions] = useState(NaN)
  const [openOuestions, setOpenQuestions] = useState(NaN)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  // only allow use of generation if user is logged in
  useEffect(() => {

    const callCheckLogin = async() => {
      const status = await checkLogin()
      setIsLoggedIn(status)
    }

    callCheckLogin()

  }, [])


  // redirect to page for reviewing the generated content
  useEffect(() => {

      if (isGenerated) {
          setIsGenerated(false)
          router.push("/review")
      }

  }, [isGenerated])

  // sends inputs to generate the readings, table, and questions
  const generateQuestions = async() => {

      try {
          setIsGenerating(true)

          // concatenate the selected PLDs into a numbered list
          let concatPLD = ""
          let cnt = 1
          PLD.forEach((pld) => {
              concatPLD += (cnt.toString() + ". " + pld + "\n")
              cnt += 1
          })

          const res = await fetchGeneration({
              topic: topic,
              pld: concatPLD,
              phenomenon: phenomenon,
              mc_number: MCQuestions, 
              open_number: openOuestions
          })

          console.log(res)

          sessionStorage.setItem("generated_content", JSON.stringify(res))

          setIsGenerating(false)
          setIsGenerated(true)

      } catch (error) {
          console.log("Error: " + error)
      }
  }

  const updateTopic = (topic) => {
    setTopic(topic)
    setPLD(new Set())
  }

  const updatePLD = (newPLD) => {

    let current = new Set()

    PLD.forEach((pld) => {{current.add(pld)}})

    if (current.has(newPLD)) {
      current.delete(newPLD)
    } else {
      current.add(newPLD)
    }

    setPLD(current)

  }

  const updatePhenomenon = (phenomenon) => {
    if (phenomenon.trim() === "") {
      setPhenomenon("not provided")
    } else {
      setPhenomenon(phenomenon.trim())
    }
  }

  return (
    <div className="flex flex-col items-center">
    {
      isLoggedIn ? 
      <div className="flex flex-col items-center">

          <p className="text-center text-lg lg:w-300 w-90 mx-5 my-5">
            <span className="font-bold">Instructions: </span> 
            Fill out the form to generate exam preparation content.
          </p>

          <div className="join join-vertical bg-base-100 lg:w-300 w-90 mb-5">
          
          <formContext.Provider value={{
            updateTopic: updateTopic,
            topic: topic,
            updatePLD: updatePLD,
            isGenerating: isGenerating,
            updatePhenomenon: updatePhenomenon,
            setMCQuestions: setMCQuestions,
            setOpenQuestions: setOpenQuestions
            }}
          >
            <TopicInput/>
            <PLDInput />
            <PhenomenonInput />
            <QuestionInput />
          </formContext.Provider>

          </div>

          <button 
              onClick={() => {generateQuestions()}} 
              className={"btn btn-success text-lg"}
              disabled={topic === "" || PLD.size === 0 || isNaN(MCQuestions) || isNaN(openOuestions || isGenerating)}
          >
              Generate
          </button>

      </div> :
      <LoginReminder />
    }
    </div>

  )
}