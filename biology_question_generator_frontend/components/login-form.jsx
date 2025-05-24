'use client'

import { usernames } from "@/components/utils"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {

    const router = useRouter()

    const [usernameFirst, setUsernameFirst] = useState('Select one')
    const [usernameSecond, setUsernameSecond] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(true)
    const [isLogin, setIsLogin] = useState(false)
    const [submitReady, setSubmitReady] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState("")

    const confirmSignUp = () => {
        setIsSignUp(true)
        setIsLogin(false)
    }

    const confirmLogin = () => {
        setIsSignUp(false)
        setIsLogin(true)
    }

    const submitLogin = async() => {

        setSubmitting(true)

        const url = isSignUp ? (process.env.NEXT_PUBLIC_ENDPOINT + "/signup") : (process.env.NEXT_PUBLIC_ENDPOINT + "/login")

        try {
            const res = await fetch(url, {
                method: isSignUp ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": usernameFirst + usernameSecond,
                    "password": password
                })
            })

            const resJSON = await res.json()

            setUsernameFirst("Select one")
            setUsernameSecond("")
            setPassword("")
            setMessage(resJSON.msg)
            setSubmitting(false)

            if (isLogin === true && resJSON.msg === "Account successfully logged in.") {
                setTimeout(() => {router.push("/generate")}, 2000)
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        const usernameSecondRegex = usernameSecond.replace(/[0-9]+/, "")
        const passwordRegex = password.replace(/[A-Za-z0-9!@#\$%\^&\*\(\)_\+]+/, "")

        if (usernameSecondRegex.length === 0 && passwordRegex.length === 0 &&
            usernameSecond.length >= 1 && usernameSecond.length <= 10 &&
            password.length >= 8 && password.length <= 20 &&
            usernameFirst !== "Select one") {
                setSubmitReady(true)
        } else {
            setSubmitReady(false)
        }


    }, [usernameFirst, usernameSecond, password])

    return (

        <div className="flex flex-col justify-center items-center">

            {
                message === "" ?
                <div></div> :
                <div role="alert" className="alert alert-vertical sm:alert-horizontal mt-5 w-100">
                    <span>{message}</span>
                    <div>
                        <button className="btn btn-sm" onClick={(i) => {setMessage("")}}>Close</button>
                    </div>
                </div>
            }

            <div className={message === "" ? "grid place-items-center lg:mt-30 md:mt-30 mt-20" : "grid place-items-center lg:mt-20 md:mt-20 mt-10"}>
                {
                    submitting ? 
                    <div className="card flex flex-col justify-center items-center w-80 h-80 shadow-sm rounded-box">
                        <span className="loading loading-spinner text-accent"></span>
                    </div> :
                    <fieldset className="fieldset flex flex-col justify-center items-center w-80 shadow-sm rounded-box">

                        <label className="label ">Please choose an option:</label>

                        <div className="join join-horizontal mb-5">
                            <button className={isSignUp ? "btn btn-active btn-accent join-item w-35" : "btn join-item w-35"} onClick={confirmSignUp}>Sign-Up</button>
                            <button className={isLogin ? "btn btn-active btn-accent join-item w-35" : "btn join-item w-35"} onClick={confirmLogin}>Login</button>
                        </div>

                        <div className="flex flex-col place-items-start">
                            <label className="label">Username</label>
                            <div className="join">
                                <select required defaultValue="Select one" className="select select-md join-item w-35"
                                onChange={(i) => {setUsernameFirst(i.target.value)}}>
                                    <option disabled={true}>Select one</option>
                                    {usernames.map((u, idx) => {
                                        return (
                                            <option key={idx}>{u}</option>
                                        )
                                    })}
                                </select>

                                <input required className="input input-md join-item w-35" placeholder="123" minLength="1" maxLength="10"
                                pattern="[0-9]+"
                                title="Must 1 to 10 digits"
                                onChange={(i) => {setUsernameSecond(i.target.value)}}
                                >
                                </input>

                            </div>

                            <label className="label">Password</label>

                            <input required className="input w-70" type="password" placeholder="Password" minLength="8" maxLength="20"
                            pattern="[A-Za-z0-9!@#\$%\^&\*\(\)_\+]+" 
                            title="Must be 8 to 20 characters containing only letters, numbers or special characters: !@#$%^&*()"
                            onChange={(i) => {setPassword(i.target.value)}}/>
                        </div>

                        <button className={submitReady ? "btn w-70 mt-5" : "btn btn-disabled w-70 mt-5"} type="button" onClick={() => {submitLogin()}}>Submit</button>

                    </fieldset>
                }
            </div>
        </div>

    )
}