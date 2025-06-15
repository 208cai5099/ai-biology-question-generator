"use client"

import { useRouter } from "next/navigation"

export default function GenerateRouteButton() {

    const router = useRouter()

    return (
        <div>
            <button
                className="btn btn-ghost border-0 shadow-none bg-customMediumGreen text-lg max-w-30"
                onClick={() => {
                    router.push("/generate")
                }}
            >
                Generate
            </button>
        </div>
    )
}