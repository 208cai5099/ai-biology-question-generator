'use server'

import { cookies } from "next/headers"

export async function fetchGeneration(props) {

    const cookieStore = await cookies()
    const jwt_cookie = cookieStore.get("jwt_token")

    const url = process.env.NEXT_PUBLIC_ENDPOINT + "/generate"
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${jwt_cookie.value}`
        },
        body: JSON.stringify({
            "topic": props.topic,
            "mc_number": props.mc_number,
            "open_number": props.open_number,
            "standards": props.standards
        })
    })

    const resJSON = await res.json()
    
    return resJSON
}