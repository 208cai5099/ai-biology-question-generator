"use client"

import { checkLogin } from "@/app/utils/check-login"
import { useEffect, useState } from "react"
import Topbar from "./topbar"
import Sidebar from "./sidebar"

export default function Navbar() {

    const [loginStatus, setLoginStatus] = useState(false)

    useEffect(() => {

        const runCheckLogin = async() => {
            const status = await checkLogin()
            setLoginStatus(status)
        }

        runCheckLogin()

    }, [loginStatus])

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <Topbar loginStatus={loginStatus} />
            <Sidebar loginStatus={loginStatus} />

        </div>
    )
}
