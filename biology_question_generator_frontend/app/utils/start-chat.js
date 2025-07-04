'use server'

// starts the conversation with the chatbot
export async function startChat() {

    const url = process.env.ENDPOINT + "/chat/start"
    const res = await fetch(url, {
        method: "GET"
    })

    const resJSON = await res.json()
    
    return resJSON
}
