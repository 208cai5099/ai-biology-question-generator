"use client"

import { useRouter} from "next/navigation"
import LoginButton from "./login-button"

export default function Navbar() {

    const router = useRouter()
    
    return (
        <div className="navbar grid grid-cols-10 shadow-sm bg-customMediumGreen">
            <button 
                className="lg:col-span-4 col-span-6 btn btn-ghost border-0 shadow-none bg-customMediumGreen text-xl max-w-85"
                onClick={() => {router.push("/")}}
                
            >
                <img src="https://openmoji.org/data/color/svg/1F340.svg" width="30" height="30" aria-label="leaf clover image"></img>
                Biology Question Generator
            </button>
            <div className="lg:col-span-4 col-span-2"></div>
            <LoginButton className="col-span-2" />
        </div>
    )
}