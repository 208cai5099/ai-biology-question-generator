'use client'

import { useRouter } from "next/navigation"

export default function AboutRouteButton() {

    const router = useRouter()

    return (
        <div>
            <button 
                className="btn btn-ghost border-0 shadow-none bg-customMediumGreen text-lg"
                onClick={() => {router.push("/about")}}
            >
                About
            </button>
        </div>
    )
}