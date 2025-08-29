'use server'

import { ChatbotResponse } from "./types"

export async function startChat(): Promise<ChatbotResponse> {

    // send a GET request to receive default greeting message from the chatbot
    const url = process.env.ENDPOINT + "/chat/start"
    const res = await fetch(url, {
        method: "GET"
    })

    const resJSON: ChatbotResponse = await res.json()
    
    return resJSON
}