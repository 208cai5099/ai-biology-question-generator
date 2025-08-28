'use server'

// sends the user message to the llm
export async function sendChat(sessionID, message) {

    // send a POST request with human message to get a new message from chatbot
    const url = process.env.ENDPOINT + "/chat/continue"
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "sessionID": sessionID,
            "humanMessage": message
        })
    })

    const resJSON = await res.json()
    
    return resJSON

}