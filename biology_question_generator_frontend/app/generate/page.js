import Navbar from "@/components/navbar-components/navbar";
import GenerateForm from "@/components/generate-components/generate-form";

export default async function Generate() {
  
  return (
    <div className="bg-customBackground min-h-screen">

      <Navbar />
      <GenerateForm />

    </div>
  );
}