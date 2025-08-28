'use client'

import { logout } from "@/app/utils/logout"
import { useEffect, useState } from "react"

export default function LogoutNotice() {

    const [loginStatus, setLoginStatus] = useState(true)

    // remove all session storage data upon logging out
    useEffect(() => {

        sessionStorage.removeItem("generated_content")
        sessionStorage.removeItem("login_status")
        
        const runLogout = async() => {
            await logout()
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