'use client'
import { useRouter } from "next/navigation"

export default function Navbar() {
    
    const router = useRouter()

    return (
        <div className="navbar bg-customDarkGreen shadow-sm">
            <button 
                className="btn btn-ghost bg-customDarkGreen text-xl"
                onClick={() => {router.push("/")}}
            >
                Biology Question Generator
                <img src="https://openmoji.org/data/color/svg/1F340.svg" width="30" height="30" aria-label="leaf clover image"></img>
            </button>
        </div>
    )
}