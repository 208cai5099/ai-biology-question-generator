import Navbar from "@/components/navbar";
import GeneratePage from "@/components/generate-page";

export default async function Generate() {
  
  return (
    <div className="bg-customBackground min-h-screen">

      <Navbar />
      <GeneratePage />

    </div>
  );
}