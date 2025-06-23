'use client'

import { logout } from "@/app/middleware/logout"
import { useEffect, useState } from "react"

export default function LogoutNotice() {

    const [loginStatus, setLoginStatus] = useState(true)

    useEffect(() => {

        sessionStorage.removeItem("generated_content")
        
        const runLogout = async() => {
            const res = await logout()
            setLoginStatus(false)
        }

        runLogout()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center lg:mt-30 md:mt-30 mt-20">
            <div className="card shadow-sm w-100 h-50 pt-5">
                {
                    loginStatus ?
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="card-title">You're being logged out...</h1>
                        <span className="card-body loading loading-spinner my-10"></span>
                    </div> :
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="card-title">Thanks for dropping by!</h1>
                        <p className="card-body">You're logged out.</p>
                    </div>
                }
            </div>
        </div>
    )

}