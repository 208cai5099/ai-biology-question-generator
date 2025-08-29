'use client'

import { createContext } from "react"

type FormContext = {
    updateTopic: (topic: string) => void,
    topic: string,
    updatePLD: (newPLD: string) => void,
    isGenerating: boolean,
    updatePhenomenon: (phenomenon: string) => void,
    setMCQuestions: React.Dispatch<React.SetStateAction<number>>
    setOpenQuestions: React.Dispatch<React.SetStateAction<number>>
}

// this formContext is used in GenerateForm() to pass down variables and functions
// for keeping track of user inputs 
export const formContext = createContext<FormContext | undefined>(undefined)