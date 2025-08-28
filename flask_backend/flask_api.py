import os
import uuid
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from ai_workflow import QuestionGenerator
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from sql_db_setup import *
from datetime import timedelta
from typing import Dict, Any
from chatbot import chatbot, SYSTEM_PROMPT, GREETING


load_dotenv()


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=5)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
CORS(app)


@app.route("/")
def home_page() -> str:
    return "<h1>Biology Question Generator</h1>"


@app.route("/chat/start")
def start_conection() -> Dict[str, str]:
    
    # create and store initial messages
    session_id = str(uuid.uuid4())
    add_message(session_id=session_id, role="System", message=SYSTEM_PROMPT)
    add_message(session_id=session_id, role="AI", message=GREETING)
    
    try:
        return jsonify({"sessionID" : session_id, "msg" : GREETING, "status" : "success"})
    except:
        return jsonify({"msg" : "Internal error: cannot establish connection", "status" : "failure"})


@app.route("/chat/continue", methods=["POST"])
def get_llm_response() -> Dict[str, str]:

    if request.is_json is True:
        session_id = request.json.get("sessionID")
        human_message = request.json.get("humanMessage")

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
            llm_response = response["messages"][-1].content
            add_message(session_id=session_id, role="AI", message=llm_response)
            return jsonify({"sessionID" : session_id, "msg" : llm_response, "status" : "success"})
        except Exception as e:
            return jsonify({"msg" : "Internal error: cannot get chatbot response", "status" : "failure"})


@app.route("/signup", methods=["POST"])
def signup() -> Dict[str, str]:
    if request.is_json is True:
        username = request.json.get("username")
        password = request.json.get("password") 

        try:
            if username_exists(username):
                return jsonify({"msg" : "Username already exists.", "status" : "failure"})
            else:
                if create_user(username, password):
                    return jsonify({"msg" : "Account successfully created. You may now login.", "status" : "success"})
                else:
                    return jsonify({"msg" : "Internal error: account is not created. Try again later.", "status" : "failure"})
        
        except:
            return jsonify({"msg" : "Internal error: account is not created. Try again later.", "status" : "failure"})


@app.route("/login", methods=["POST"])
def login() -> Dict[str, str]:
    if request.is_json is True:
        username = request.json.get("username")
        password = request.json.get("password")

        try:
            if not username_exists(username):
                return jsonify({"msg" : "No such username exists.", "status" : "failure"})

            if auth_user(username, password):
                access_token = create_access_token(identity=username)
                refresh_token = create_refresh_token(identity=username)

                return jsonify({
                    "msg" : "Account successfully logged in.",
                    "access_token" : access_token,
                    "refresh_token" : refresh_token,
                    "status" : "success"
                })

            else:
                return jsonify({"msg" : "Invalid username and password combination.", "status" : "failure"})
        except:
            return jsonify({"msg" : "Internal error: cannot login at this moment. Try again later.", "status" : "failure"})


@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh() -> Dict[str, str]:
    try:
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        return jsonify({"msg" : "Generated new access token successfully", "access_token" : access_token, "status" : "success"})
    except:
        return jsonify({"msg" : "Internal error: cannot generate new access token.", "status" : "failure"})


@app.route("/generate", methods=["POST"])
@jwt_required()
def get_questions() -> Dict[str, Any]:

    if request.is_json:

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