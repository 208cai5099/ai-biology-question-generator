'use server'

import { cookies } from "next/headers"

export async function logout(): Promise<void> {

    // delete access and refresh tokens to logout
    try {
        const cookieStore = await cookies()
        cookieStore.delete('ai_bio_access_token')
        cookieStore.delete('ai_bio_refresh_token')
    } catch(e) {
        console.log(e)
    }

}