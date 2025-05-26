import { cookies } from 'next/headers'
import IntakeForm from "@/components/intake-form";
import Navbar from "@/components/navbar";

export default async function Generate() {
  
  return (
    <div className="bg-customBackground min-h-screen">

      <Navbar />
      
      <p className="text-center text-lg px-5 py-5"><span className="font-bold">Instructions: </span> Enter a topic and learning standard to generate a set of standard-aligned questions about the given topic.</p>
    
      <IntakeForm />

    </div>
  );
}