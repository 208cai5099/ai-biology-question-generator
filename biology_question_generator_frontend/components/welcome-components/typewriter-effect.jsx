'use client'

import Typewriter from 'typewriter-effect'

export default function TypewriterEffect(props) {
    return (
        <div className="text-center text-5xl font-bold text-customDarkGreen">
            <Typewriter
                options={{
                    strings: props.labels,
                    autoStart: true,
                    loop: true,
                    cursor: "_",
                    delay: 100,
                    deleteSpeed: 100
                }}
            />
        </div>
    )
}