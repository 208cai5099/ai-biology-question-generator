import NavBar from "@/components/navbar";

export default function Login() {
    return (
        <div className="bg-customBackground min-h-screen">

            <NavBar />

            <div className="flex justify-center items-center min-h-screen">
            <fieldset className="fieldset bg-white border-white rounded-box w-xs border-20">

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" />

                <button className="btn mt-4">Submit</button>

            </fieldset>
            </div>

        </div>
    )
}