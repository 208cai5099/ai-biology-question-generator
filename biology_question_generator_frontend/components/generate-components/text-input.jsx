'use client'

export default function Input(props) {
    return (
        <div className="py-3">

          <label className={props.class ? props.class : "lg:w-200 md:w-120 sm:w-60 text-lg input"}>
            <span className="font-bold">{props.name}: </span> 
            <input type="text" placeholder={props.placeholder} onChange={props.updateInput} disabled={props.disabled}/>
          </label>

        </div>
    )
}