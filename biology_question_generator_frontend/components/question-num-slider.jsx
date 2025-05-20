export default function Slider() {

    return (
        <div className="flex flex-row py-3">
          
          <span className="px-5 text-lg font-bold">Question Number: </span>

          <div className="w-full max-w-xs">
            <input type="range" min={0} max={5} className="range" step="1" />
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
    )

}