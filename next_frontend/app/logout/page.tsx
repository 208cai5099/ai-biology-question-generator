import Navbar from "@/components/navbar-components/navbar"
import LogoutNotice from "@/components/logout-components/logout-notice"

export default function Logout() {

    return (
        <div className="bg-customBackground min-h-screen">
            <Navbar />
            <LogoutNotice />
        </div>
    )
}