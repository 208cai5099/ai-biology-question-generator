'use server'

import { cookies } from "next/headers"

export async function refreshToken() {

    const cookieStore = await cookies()

    // if the refresh token has not expired, 
    // use the refresh token to get a new access token
    if (cookieStore.has("ai_bio_refresh_token")) {

        const refresh_token = cookieStore.get("ai_bio_refresh_token")

        const url = process.env.ENDPOINT + "/refresh"

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${refresh_token.value}`
            }
        })

        const resJSON = await res.json()

        if (resJSON.status === "success") {

            const accessCookieAge = 300
            const ageBuffer = 30

            cookieStore.set({
                name: "ai_bio_access_token",
                value: resJSON.access_token,
                httpOnly: true,
                path: '/',
                maxAge: accessCookieAge - ageBuffer,
                secure: true
            })
        }

        return resJSON.status === "success"
    }

    return false

}