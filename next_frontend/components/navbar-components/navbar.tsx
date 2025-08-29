"use client"

import { useEffect, useState } from "react"
import Topbar from "./topbar"
import Sidebar from "./sidebar"

// Input: None
// Output: a top navigation bar and a side navigation bar
export default function Navbar() {

    const [loginStatus, setLoginStatus] = useState(false)

    useEffect(() => {

        const status = sessionStorage.getItem("login_status")

        if (!status) {
            setLoginStatus(false)
        } else {
            setLoginStatus(status === "logged in")
        }
        
    }, [loginStatus])

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <Topbar loginStatus={loginStatus} />
            <Sidebar loginStatus={loginStatus} />

        </div>
    )
}