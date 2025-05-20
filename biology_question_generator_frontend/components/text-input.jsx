export default function Input(props) {
    return (
        <div className="py-3">
          <span className="px-5 text-lg font-bold">{props.name}: </span> <input className="lg:w-120 md:w-90 sm:w-60 input input-success" type="text" placeholder={props.placeholder} />
        </div>
    )
}