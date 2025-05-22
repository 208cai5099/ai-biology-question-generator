'use client'
import Link from "next/link"

export default function Navbar() {
    return (
        <div className="navbar bg-customNavBar shadow-sm">
            <Link className="navbar-start font-bold text-lg" href="/">
                Biology Question Generator 🦠
            </Link>
            <Link className="navbar-end font-bold text-lg" href="/login">
                Sign Up/Login
            </Link>
        </div>
    )
}