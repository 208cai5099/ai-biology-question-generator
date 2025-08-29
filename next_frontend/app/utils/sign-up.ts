'use server'

import { AccountInfo, SignUpResponse } from "./types"

export async function signUp({usernameFirst, usernameSecond, password}: AccountInfo): Promise<SignUpResponse> {

    // send a POST request with username and password to register for a new account
    const url = process.env.ENDPOINT + "/signup"
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

    const resJSON: SignUpResponse = await res.json()

    return resJSON


}