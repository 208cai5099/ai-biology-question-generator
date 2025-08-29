'use server'

import { cookies } from "next/headers"
import { LoginResponse, AccountInfo } from "./types"

export async function login({usernameFirst, usernameSecond, password}: AccountInfo): Promise<LoginResponse> {

    // sends a POST request with username and password to login
    const url = process.env.ENDPOINT + "/login"
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": usernameFirst + usernameSecond,
            "password": password
        })
    })

    // store the access token for 5 min and the refresh token for 1 hr
    // with a time buffer of 30 sec
    const resJSON: LoginResponse = await res.json()
    const cookieStore = await cookies()
    const accessCookieAge = 300
    const refreshCookieAge = 3600
    const ageBuffer = 30

    if (resJSON.status === "success" && resJSON.access_token && resJSON.refresh_token) {

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