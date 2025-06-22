import Navbar from "@/components/navbar-components/navbar"
import Chatbot from "@/components/chatbot-components/chatbot"
import AboutTexts from "./about-texts"

export default function About() {

    return (
        <div className="bg-customBackground min-h-screen">

            <Navbar />

            <div className="fixed right-5 bottom-5 z-10">
                <Chatbot />
            </div>

            <AboutTexts />
            
        </div>
    )
}