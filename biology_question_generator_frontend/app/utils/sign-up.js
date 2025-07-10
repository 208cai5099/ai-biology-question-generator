'use server'

export async function signUp(props) {

    const url = process.env.ENDPOINT + "/signup"

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": props.usernameFirst + props.usernameSecond,
            "password": props.password
        })
    })

    const resJSON = await res.json()

    return resJSON

}