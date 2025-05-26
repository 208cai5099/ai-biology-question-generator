import Navbar from "@/components/navbar";
import Welcome from "@/components/welcome";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-customLightGreen via-customMediumGreen to-customDarkGreen">
      <Navbar/>
      <Welcome/>
    </div>
  );
}