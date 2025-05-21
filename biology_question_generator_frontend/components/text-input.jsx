'use client'

export default function Input(props) {
    return (
        <div className="py-3">
          <span className="px-5 text-lg font-bold">{props.name}: </span> 
          <input className={props.class ? props.class : "lg:w-120 md:w-90 sm:w-60 input text-lg"} type="text" placeholder={props.placeholder} onChange={props.updateInput}/>
        </div>
    )
}