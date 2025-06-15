"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { checkLogin } from "@/app/middleware/check-login"
import { logout } from "@/app/middleware/logout"

export default function LoginRouteButton() {

    const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        const callCheckLogin = async() => {
            const status = await checkLogin()
            setIsLoggedIn(status)
        }

        callCheckLogin()

    }, [])

    return (
        <div>
            {
                isLoggedIn ?
                <button
                    className="btn btn-ghost border-0 shadow-none bg-customMediumGreen text-lg max-w-30"
                    onClick={async() => {
                        await logout()
                        setIsLoggedIn(false)
                        router.push("/")
                    }}
                >
                    Logout
                </button> :
                <button
                    className="btn btn-ghost border-0 shadow-none bg-customMediumGreen text-lg max-w-30"
                    onClick={() => {router.push("/login")}}
                >
                    Login
                </button>
            }
        </div>
    )
}