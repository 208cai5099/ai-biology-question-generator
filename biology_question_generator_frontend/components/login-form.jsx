'use client'

import { usernames } from "@/utils"
import { useEffect, useState } from "react"

export default function LoginForm() {

    const [usernameFirst, setUsernameFirst] = useState('Select one')
    const [usernameSecond, setUsernameSecond] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(true)
    const [isLogin, setIsLogin] = useState(false)
    const [submitReady, setSubmitReady] = useState(false)
    const [submit, setSubmit] = useState(false)

    useEffect(() => {

        if (usernameFirst !== 'Select one' && usernameSecond !== '' && password !== '') {
            setSubmitReady(true)
        } else {
            setSubmitReady(false)
        }

    }, [usernameFirst, usernameSecond, password])

    const confirmSignUp = () => {
        setIsSignUp(true)
        setIsLogin(false)
    }

    const confirmLogin = () => {
        setIsSignUp(false)
        setIsLogin(true)
    }

    const submitLogin = async() => {
        setSubmit(true)
    }

    return (

        <div className="grid place-content-center min-h-screen">

            <label className="label">Please choose an option:</label>
            <div className="join join-horizontal mb-5">
                <button className={isSignUp ? "btn btn-active btn-accent join-item w-35" : "btn join-item w-35"} onClick={confirmSignUp}>Sign-Up</button>
                <button className={isLogin ? "btn btn-active btn-accent join-item w-35" : "btn join-item w-35"} onClick={confirmLogin}>Login</button>
            </div>

            <form>
                <div className="flex flex-col">
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
                        onChange={(i) => {setUsernameSecond(i.target.value)}}>
                        </input>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="label">Password</label>

                    <input required className="input w-70" type="password" placeholder="Password" minLength="8" maxLength="20"
                    pattern="[A-Za-z0-9!@#\$%\^&\*\(\)_\+]+" 
                    title="Must be 8 to 20 characters containing only letters, numbers or special characters: !@#$%^&*()"
                    onChange={(i) => {setPassword(i.target.value)}}/>
                </div>

                {submit ? 
                <button className="btn btn-disabled mt-5"> <span className="loading loading-spinner"></span>Submitting...</button> :
                <button className={submitReady ? "btn mt-5" : "btn btn-disabled mt-5"} type="submit" onClick={() => {submitLogin()}}>Submit</button>
                }
            </form>
        </div>

    )
}