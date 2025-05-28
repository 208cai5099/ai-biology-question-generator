import Navbar from "@/components/navbar";
import Welcome from "@/components/welcome";
import TypewriterEffect from "@/components/typewriter-effect";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Welcome/>
    </div>
  );
}