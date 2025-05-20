import Slider from "@/components/question-num-slider";
import Input from "@/components/text-input";

export default function Home() {
  return (
    <div>
      <h1 className="lg:text-3xl md:text-2xl sm:text-lg text-center py-5">Biology Question Maker 🧪</h1>
      
      <p className="text-center text-md px-5 py-5"><span className="font-bold">Instructions: </span> Enter a topic and learning standard to generate a set of standard-aligned questions about the given topic.</p>
      
      <div className="flex flex-col items-center">

        <Input name="Topic" placeholder="Effects of native species on local biodiversity"/>

        <Input name="Standard" placeholder="Design, evaluate, and refine a solution for reducing the impacts of human activities on the environment and biodiversity."/>

        <Slider />

        <button className="btn btn-outline btn-success">Generate</button>


      </div>


    </div>
  );
}