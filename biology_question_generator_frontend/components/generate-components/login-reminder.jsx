import { handURL } from "./content"

export default function LoginReminder() {
    return (
        <div role="alert" className="alert alert-warning w-90 mt-5">
            <img src={handURL} width="30" height="30" alt="stop icon"/>
            <span>Please first log into your account.</span>
        </div>
    )
}