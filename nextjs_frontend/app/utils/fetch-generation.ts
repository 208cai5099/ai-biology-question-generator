'use server'

import { cookies } from "next/headers"
import { UserInputs, GeneratedContent } from "./types"

export async function fetchGeneration({topic, pld, phenomenon, mc_number, open_number}: UserInputs): Promise<GeneratedContent | {}> {

    // sends a POST request to generate content based on user inputs
    // authorized by user access token
    const cookieStore = await cookies()
    const access_cookie = cookieStore.get("ai_bio_access_token")

    if (!access_cookie) return {}
    
    const url = process.env.ENDPOINT + "/generate"
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${access_cookie.value}`
        },
        body: JSON.stringify({
            "topic": topic,
            "performance_level_descriptions": pld,
            "phenomenon": phenomenon,
            "mc_number": mc_number,
            "open_number": open_number
        })
    })

    // return the generated content as JSON
    const resJSON: GeneratedContent = await res.json()
    return resJSON

}