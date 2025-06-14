import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

export const startConnection = (sessionID) => {
  socket.emit("start_connection", { session_id: sessionID })
}

export const sendMessage = (sessionID, message) => {
  socket.emit("human_message", {session_id: sessionID, human_message: message})
}

export const receiveMessage = (callback) => {
  socket.on("llm_message", callback)
}
