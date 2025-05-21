import IntakeForm from "@/components/form";

export default function Home() {
  return (
    <div>
      <h1 className="lg:text-3xl md:text-2xl sm:text-lg text-center py-5">Biology Question Maker 🧪</h1>
      
      <p className="text-center text-lg px-5 py-5"><span className="font-bold">Instructions: </span> Enter a topic and learning standard to generate a set of standard-aligned questions about the given topic.</p>
    
      <IntakeForm />


    </div>
  );
}