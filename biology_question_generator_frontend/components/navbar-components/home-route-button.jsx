'use client'

import { useRouter } from "next/navigation"

export default function HomeRouteButton() {

    const router = useRouter()

    return (
        <div>
            <button 
                className="btn btn-ghost border-0 shadow-none bg-customMediumGreen text-lg"
                onClick={() => {router.push("/")}}
            >
                Home
            </button>
        </div>
    )
}