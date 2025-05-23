import NavBar from "@/components/navbar";
import LoginForm
 from "@/components/login-form";
export default function Login() {
    return (
        <div className="bg-customBackground min-h-screen">

            <NavBar />
            <LoginForm />
        </div>
    )
}