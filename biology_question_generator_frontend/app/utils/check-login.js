'use server'

import { cookies } from "next/headers"

export async function checkLogin() {

    const cookieStore = await cookies()

    if (cookieStore.has("jwt_token") === false) {
        return false
    } else {
        return true
    }

}