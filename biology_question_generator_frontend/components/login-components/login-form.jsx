'use client'

import { usernames } from "./content"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/app/utils/login"
import { signUp } from "@/app/utils/sign-up"

export default function LoginForm() {

    const router = useRouter()

    const [usernameFirst, setUsernameFirst] = useState('Select one')
    const [usernameSecond, setUsernameSecond] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(true)
    const [isLogin, setIsLogin] = useState(false)
    const [submitReady, setSubmitReady] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [message, setMessage] = useState("")

    // indicate that the user is signing up for an account
    const confirmSignUp = () => {
        setIsSignUp(true)
        setIsLogin(false)
    }

    // indicate that the user is logging into an account
    const confirmLogin = () => {
        setIsSignUp(false)
        setIsLogin(true)
    }
    
    const clickSubmit = async() => {

        // update state variable to trigger the loading icon
        setProcessing(true)

        try {

            let resJSON = null

            // send a POST request to sign up or log in
            if (isSignUp) {
                resJSON = await signUp({usernameFirst: usernameFirst, usernameSecond: usernameSecond, password: password})
            } else if (isLogin) {
                resJSON = await login({usernameFirst: usernameFirst, usernameSecond: usernameSecond, password: password})
            }
            
            // reset the username and password to default values
            setUsernameFirst("Select one")
            setUsernameSecond("")
            setPassword("")
            setMessage(resJSON.msg)

            // if login is successful, record the login status in session storage
            if (isLogin === true && resJSON.status === "success") {
                setTimeout(() => {
                    setProcessing(false)
                    router.push("/generate")
                    sessionStorage.setItem("login_status", "logged in")
                }, 2000)
            } else {
                setProcessing(false)
            }


        } catch (error) {
            console.log(error)
        }

    }

    // validate the inputted username and password
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

            {/* notify the user of the result of the sign up/login request */}
            {
                message === "" ?
                <div></div> :
                <div role="alert" className="flex-row justify-between alert alert-vertical sm:alert-horizontal mt-5 w-80">
                    <span>{message}</span>
                </div>
            }

            <div className={message === "" ? "grid place-items-center lg:mt-30 md:mt-30 mt-20" : "grid place-items-center lg:mt-20 md:mt-20 mt-10"}>
                
                {
                    // tell the user whether their sign-up/login request is being processed or they are being redirected to another page
                    processing ? 
                    <div className="card flex flex-col justify-center items-center w-80 h-80 shadow-sm rounded-box">
                        <span className="loading loading-spinner text-accent"></span>
                        <p>{message === "Account successfully logged in." ? "Redirecting..." : "Processing..."}</p>
                    </div> :
                    <fieldset className="fieldset flex flex-col justify-center items-center w-80 shadow-sm rounded-box">

                        <label className="label ">Please choose an option:</label>

                        <div className="join join-horizontal mb-5">
                            <button className={isSignUp ? "btn btn-active btn-accent join-item w-35" : "btn join-item w-35"} onClick={confirmSignUp}>Sign-Up</button>
                            <button className={isLogin ? "btn btn-active btn-accent join-item w-35" : "btn join-item w-35"} onClick={confirmLogin}>Login</button>
                        </div>

                        {/* the only available usernames are cell orangelles, followed by a number */}
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

                        <button className={submitReady ? "btn w-70 mt-5" : "btn btn-disabled w-70 mt-5"} type="button" onClick={() => {clickSubmit()}}>Submit</button>

                    </fieldset>
                }
            </div>
        </div>

    )
}