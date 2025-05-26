'use server'

import { cookies } from "next/headers"

export async function checkLogin() {

    const cookieStore = await cookies()
    const jwt_cookie = cookieStore.get("jwt_token")

    if (jwt_cookie === undefined) {
        return false
    } else {
        return true
    }

}