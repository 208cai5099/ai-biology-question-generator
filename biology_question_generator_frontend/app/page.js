import Navbar from "@/components/navbar";
import Welcome from "@/components/welcome";

export default function Home() {
  return (
    <div className="bg-customBackground min-h-screen">
      <Navbar/>
      <Welcome/>
    </div>
  );
}