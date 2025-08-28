'use server'

import { cookies } from "next/headers"

export async function checkLogin() {

    // checks for presence of access token
    const cookieStore = await cookies()
    return cookieStore.has("ai_bio_access_token")
    
}