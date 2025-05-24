'use client'
import Link from "next/link"

export default function Navbar() {
    return (
        <div className="navbar bg-customLightGreen shadow-sm">
            <Link className="navbar-start font-bold text-lg" href="/">
                Biology Question Generator 🦠
            </Link>
        </div>
    )
}