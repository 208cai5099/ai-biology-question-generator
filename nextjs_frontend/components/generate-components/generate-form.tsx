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
  const [PLD, setPLD] = useState<Set<string>>(new Set<string>())
  const [phenomenon, setPhenomenon] = useState("not provided")
  const [MCQuestions, setMCQuestions] = useState(NaN)
  const [openOuestions, setOpenQuestions] = useState(NaN)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const runCheckLogin = async() => {
    
    // check whether an access token is available
    let status = await checkLogin()
    
    // if access token is unavailable, try to use refresh token to get new access token
    if (!status) {
      status = await refreshToken()
    }

    // if refresh token is unavailable, re-route to login page
    if (!status) {
      router.push("/login")
    }

    setLoginStatus(status)
  }

  // check the login status
  useEffect(() => {

      runCheckLogin()

  }, [])


  // redirect to the page for reviewing the generated content
  useEffect(() => {

      if (isGenerated) {
          setIsGenerated(false)
          router.push("/review")
      }

  }, [isGenerated])


  // send user inputs to the backend for generating the desired content
  const generateQuestions = async() => {

    try {

      await runCheckLogin()

      // clear any previously generated content
      sessionStorage.removeItem("generated_content")

      setIsGenerating(true)

      // concatenate the selected PLDs into a numbered list
      let concatPLD = ""
      let cnt = 1
      PLD.forEach((pld) => {
          concatPLD += (cnt.toString() + ". " + pld + "\n")
          cnt += 1
      })
      
      // perform a POST request to the backend to start generating content
      const res = await fetchGeneration({
          topic: topic,
          pld: concatPLD,
          phenomenon: phenomenon,
          mc_number: MCQuestions, 
          open_number: openOuestions
      })

      // if content was generated successfully, store the generated content in session storage
      if (res.reading && res.data && res.question_list) {
        sessionStorage.setItem("generated_content", JSON.stringify(res))
        setIsGenerated(true)

      }

      setIsGenerating(false)

    } catch (error) {
        console.log("Error: " + error)
    }
  }

  // keep track of the selected topic
  const updateTopic = (topic: string) => {
    setTopic(topic)
    setPLD(new Set<string>()) // must clear any previously selected PLDs
  }

  // keep track of the selected PLDs
  const updatePLD = (newPLD: string) => {

    const current: Set<string> = new Set()

    PLD.forEach((pld) => {{current.add(pld)}})

    if (current.has(newPLD)) {
      current.delete(newPLD)
    } else {
      current.add(newPLD)
    }

    setPLD(current)

  }

  // keep track of the user-inputted phenomenon, if any
  const updatePhenomenon = (phenomenon: string) => {
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

            {/* message bar indicating content is being generated */}
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


                {/* use the formContext to pass down variables and functions for keeping track of user inputs */}
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

                {/* user can only submit inputs for generating if sufficient portions of the form are filled out */}
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