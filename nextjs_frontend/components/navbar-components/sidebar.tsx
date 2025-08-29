"use client"

import Link from "next/link"

export default function Sidebar({loginStatus} : {loginStatus: boolean}) {

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="flex-col bg-customMediumGreen min-h-full w-60 p-4">
                <ul className="text-left">
                    <li><Link className="text-xl my-1 hover:opacity-70" href="/">Home</Link></li>
                    {
                        loginStatus ?
                        <Link className="text-xl my-1 hover:opacity-70" href="/logout">Logout</Link> :
                        <Link className="text-xl my-1 hover:opacity-70" href="/login">Login</Link>
                    }
                    <li><Link className="text-xl my-1 hover:opacity-70" href="/generate">Generate</Link></li>
                    <li><Link className="text-xl my-1 hover:opacity-70" href="/about">About</Link></li>
                </ul>
            </div>
        </div>
    )
}