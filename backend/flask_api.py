from flask import Flask, jsonify, request
from ai_workflow import QuestionGenerator
import json

app = Flask(__name__)

@app.route("/generate")
def get_questions():

    topic = request.args.get("topic")
    question_number = request.args.get("question_number")
    standards = request.args.get("standards")

    inputs = {
        "topic": topic,
        "question_number": question_number,
        "standards": standards
    }

    gen = QuestionGenerator()
    crew = gen.crew()
    result = crew.kickoff(inputs=inputs)

    return result.to_dict()