export default function Home() {
  return (
    <div>
      <h1 className="lg:text-3xl md:text-2xl sm:text-lg text-center py-5">Biology Question Maker 🧪</h1>
      
      <p className="text-center px-5 py-5"><span className="font-bold">Instructions: </span> Enter a topic and learning standard to generate a set of standard-aligned questions about the given topic.</p>
      
      <div className="flex flex-col justify-center items-center">

        <div className="py-3">
          <span className="px-5 font-bold">Topic: </span> <input className="lg:w-120 md:w-90 sm:w-60 input" type="text" placeholder="Effects of invasive species on local biodiversity" />
        </div>

        <div className="py-3">
          <span className="px-5 font-bold">Standard: </span> <input className="lg:w-120 md:w-90 sm:w-60 input" type="text" placeholder="Effects of invasive species on local biodiversity" />
        </div>

        <div className="py-3">
          <input type="range" min="1" max="5" value="0" className="range" step="1" />
          <div className="flex justify-between px-2.5 mt-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div className="flex justify-between px-2.5 mt-2 text-xs">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        
      </div>



    </div>
  );
}