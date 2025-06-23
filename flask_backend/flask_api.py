import os
import uuid
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from ai_workflow import QuestionGenerator
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from flask_socketio import SocketIO, emit
from sql_db_setup import *
from typing import Dict, Any
from chatbot import chatbot, SYSTEM_PROMPT, GREETING

load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

## Web Socket Functionalities

@socketio.on("start_connection")
def start_conection(data):
    
    # create and store initial messages
    session_id = str(uuid.uuid4())
    with open("session_ids.txt", "a") as file:
        file.write(session_id)
        file.write("\n")
    add_message(session_id=session_id, role="System", message=SYSTEM_PROMPT)
    add_message(session_id=session_id, role="AI", message=GREETING)
    
    try:
        emit("llm_message", {"session_id": session_id, "content": GREETING})
    except Exception as e:
        print(f"Cannot send message: {e}")


@socketio.on("human_message")
def get_llm_response(data):

    session_id = data.get("session_id")
    human_message = data.get("human_message")

    # add the new human message to the chat history
    add_message(session_id=session_id, role="Human", message=human_message)

    # retrieve the chat history for the given session ID
    chat_history = query_messages(session_id=session_id)

    # format the chat history before passing to chatbot
    formatted_messages = {"messages" : []}
    for m in chat_history:
        if m.role == "AI":
            formatted_messages["messages"].append(AIMessage(content=m.message))
        elif m.role == "Human":
            formatted_messages["messages"].append(HumanMessage(content=m.message))
        elif m.role == "System":
            formatted_messages["messages"].append(SystemMessage(content=m.message))
    
    try:
        response = chatbot.invoke(formatted_messages)
        emit("llm_message", {"session_id": session_id, "content": response["messages"][-1].content})
        add_message(session_id=session_id, role="AI", message=response["messages"][-1].content)
    except Exception as e:
        print(f"Cannot get LLM response: {e}")

## HTTP Requests

@app.route("/")
def home_page() -> str:
    return "<h1>Biology Question Generator</h1>"

@app.route("/signup", methods=["PUT"])
def signup() -> Dict[str, str]:
    if request.is_json is True:
        username = request.json.get("username")
        password = request.json.get("password") 

        try:
            if username_exists(username):
                return jsonify({"msg" : "Username already exists."})
            else:
                if create_user(username, password):
                    return jsonify({"msg" : "Account successfully created. You may now login."})
                else:
                    return jsonify({"msg" : "Internal error: account is not created."})
        
        except:
            return jsonify({"msg" : "Internal error: account is not created."})

@app.route("/login", methods=["POST"])
def login() -> Dict[str, str]:
    if request.is_json is True:
        username = request.json.get("username")
        password = request.json.get("password")

        try:
            if username_exists(username) is False:
                return jsonify({"msg" : "No such username exists."})

            if auth_user(username, password) is True:
                jwt_token = create_access_token(identity=username)

                return jsonify({
                    "msg" : "Account successfully logged in.",
                    "jwt_token" : jwt_token
                })

            else:
                return jsonify({"msg" : "Invalid username and password combination."})
        except:
            return jsonify({"msg" : "Internal error: cannot login at this moment."})


@app.route("/generate", methods=["POST"])
@jwt_required()
def get_questions() -> Dict[str, Any]:

    if request.is_json is True:

        topic = request.json.get("topic")
        phenomenon = request.json.get("phenomenon")
        performance_level_descriptions = request.json.get("performance_level_descriptions")
        mc_number = request.json.get("mc_number")
        open_number = request.json.get("open_number")

        inputs = {
            "topic" : topic,
            "phenomenon" : phenomenon,
            "performance_level_descriptions" : performance_level_descriptions,
            "mc_number" : mc_number,
            "open_number" : open_number
        }

        gen = QuestionGenerator()
        crew = gen.crew()
        result = crew.kickoff(inputs=inputs)

        return result.to_dict()

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)