'use server'

export async function startChat() {

    // send a GET request to receive default greeting message from the chatbot
    const url = process.env.ENDPOINT + "/chat/start"
    const res = await fetch(url, {
        method: "GET"
    })

    const resJSON = await res.json()
    
    return resJSON
}
