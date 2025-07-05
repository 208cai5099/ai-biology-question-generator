'use server'

import { cookies } from "next/headers"

export async function logout() {

    try {
        const cookieStore = await cookies()
        cookieStore.delete('jwt_token')
    } catch(e) {
        console.log(e)
    }

}