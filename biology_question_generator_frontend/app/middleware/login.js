'use server'

import { cookies } from "next/headers"

export async function login(props) {

    const url = props.signUp === true ? (process.env.ENDPOINT + "/signup") : (process.env.ENDPOINT + "/login")

    const res = await fetch(url, {
        method: props.signUp === true ? "PUT" : "POST",
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
    cookieStore.set({
        name: "jwt_token",
        value: resJSON.jwt_token,
        httpOnly: true,
        path: '/',
        maxAge: 1170,
        secure: true
    })

    return resJSON.msg

}