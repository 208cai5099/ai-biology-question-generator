'use client'

import { createContext } from "react"
import { ReviewContext } from "./types"

export const reviewContext = createContext<ReviewContext | undefined>(undefined)