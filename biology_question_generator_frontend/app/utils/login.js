'use server'

import { cookies } from "next/headers"

export async function login(props) {

    const url = process.env.ENDPOINT + "/login"

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": props.usernameFirst + props.usernameSecond,
            "password": props.password
        })
    })

    const resJSON = await res.json()

    const cookieStore = await cookies()

    const accessCookieAge = 120
    const refreshCookieAge = 3600
    const ageBuffer = 30

    if (resJSON.status === "success") {

        cookieStore.set({
            name: "ai_bio_access_token",
            value: resJSON.access_token,
            httpOnly: true,
            path: '/',
            maxAge: accessCookieAge - ageBuffer,
            secure: true
        })

        cookieStore.set({
            name: "ai_bio_refresh_token",
            value: resJSON.refresh_token,
            httpOnly: true,
            path: '/',
            maxAge: refreshCookieAge - ageBuffer,
            secure: true
        })

    }
    
    return resJSON

}