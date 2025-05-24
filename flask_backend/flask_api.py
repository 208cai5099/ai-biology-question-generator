import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from ai_workflow import QuestionGenerator
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from sql_db_setup import *
from typing import Dict, Any

load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

CORS(app)

@app.route("/")
def home_page() -> str:
    return "<h1>AI Biology Question Generator</h1>"

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
                    return jsonfiy({"msg" : "Internal error: account is not created."})
        
        except:
            return jsonfiy({"msg" : "Internal error: account is not created."})

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
                    "access_token" : jwt_token
                    })
            else:
                return jsonify({"msg" : "Invalid username and password combination."})
        except:
            return jsonify({"msg" : "Internal error: cannot login at this moment."})


@app.route("/generate")
@jwt_required()
def get_questions() -> Dict[str, Any]:

    if request.is_json is True:

        topic = request.json.get("topic")
        question_number = request.json.get("question_number")
        standards = request.json.get("standards")

        inputs = {
            "topic": topic,
            "question_number": question_number,
            "standards": standards
        }

        gen = QuestionGenerator()
        crew = gen.crew()
        result = crew.kickoff(inputs=inputs)

        return result.to_dict()