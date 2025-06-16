import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

export const startConnection = () => {
  socket.emit("start_connection", {})
}

export const sendMessage = ({sessionID, human_message}) => {

  console.log(sessionID, human_message)
  socket.emit("human_message", {session_id: sessionID, human_message: human_message})
}

export const receiveMessage = (callback) => {
  socket.on("llm_message", callback)
}
