'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { fetchGeneration } from "@/app/utils/fetch-generation"
import { formContext } from "./context"
import { checkLogin } from "@/app/utils/check-login"
import TopicInput from "./topic-input"
import PLDInput from "./pld-input"
import PhenomenonInput from "./phenomenon-input"
import QuestionInput from "./question-input"
import { refreshToken } from "@/app/utils/refresh-token"

export default function GenerateForm() {
  
  const router = useRouter()
  const [loginStatus, setLoginStatus] = useState(false)
  const [topic, setTopic] = useState("Structure and Function")
  const [PLD, setPLD] = useState(new Set())
  const [phenomenon, setPhenomenon] = useState("not provided")
  const [MCQuestions, setMCQuestions] = useState(NaN)
  const [openOuestions, setOpenQuestions] = useState(NaN)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  useEffect(() => {

      const runCheckLogin = async() => {
        
        let status = await checkLogin()

        if (!status) {
          status = await refreshToken()
        }

        if (!status) {
          router.push("/login")
        }

        setLoginStatus(status)
      }

      runCheckLogin()

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

          sessionStorage.removeItem("generated_content")

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

          sessionStorage.setItem("generated_content", JSON.stringify(res))

          setIsGenerating(false)
          setIsGenerated(true)

      } catch (error) {
          console.log("Error: " + error)
      }
  }

  // records the selected topic and clears the selected PLDs
  const updateTopic = (topic) => {
    setTopic(topic)
    setPLD(new Set())
  }

  // records the selected PLDs
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

  // records the inputted phenomenon, if any
  const updatePhenomenon = (phenomenon) => {
    if (phenomenon.trim() === "") {
      setPhenomenon("not provided")
    } else {
      setPhenomenon(phenomenon.trim())
    }
  }

  return (

    <div className="flex flex-col justify-center items-center">
      {
          loginStatus ?
          <div className="flex flex-col items-center">

            {
              isGenerating ?
              <div className="absolute top-20 alert alert-info bg-customLightGreen shadow-sm border-none">
                <span className="loading loading-spinner loading-xs"></span>
                <span>Your content is being generated (takes around 30 to 60 seconds).</span>
              </div> :
              <div></div>
            }

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
                    disabled={topic === "" || PLD.size === 0 || isNaN(MCQuestions) || isNaN(openOuestions) || isGenerating}
                >
                    Generate
                </button>
            </div>
          </div>
          :
          <div></div>
          
      }
    </div>

    

  )
}