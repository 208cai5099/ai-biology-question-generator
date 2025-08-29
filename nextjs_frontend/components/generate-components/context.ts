'use client'

import { createContext } from "react"
import { FormContext } from "./types"

// this formContext is used in GenerateForm() to pass down variables and functions
// for keeping track of user inputs 
export const formContext = createContext<FormContext | undefined>(undefined)