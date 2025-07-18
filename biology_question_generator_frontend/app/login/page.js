import Navbar from "@/components/navbar-components/navbar";
import LoginForm from "@/components/login-components/login-form";

export default function Login() {

    return (
        <div className="bg-customBackground min-h-screen">
            <Navbar />
            <LoginForm/>
        </div>
    )
}