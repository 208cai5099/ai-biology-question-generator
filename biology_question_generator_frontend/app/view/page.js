import GeneratedContent from "@/components/generated_content"
import Navbar from "@/components/navbar"

export default function View() {

    return (
        <div className="bg-customBackground min-h-screen">
            <Navbar />
            <GeneratedContent />
        </div>

    )
}