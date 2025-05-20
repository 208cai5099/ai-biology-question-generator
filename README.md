# AI Biology Question Generator

## Context
In recent years, the field of science education has been greatly changed by the adoption of new learning standards known as the Next Generation Science Standards (NGSS). The NGSS learning standards are built on three core pillars: Science and Engineering Practices, Crosscutting Concepts, and Disciplinary Core Ideas. Teachers have to design new NGSS-aligned curriculum while preparing students for exams based on the new standards. This project is designed to create NGSS-aligned questions for biology. Using the [crewAI](https://crewai.com) framework and [OpenAI](https://platform.openai.com/docs/overview) LLM service, I have built a multi-agent workflow that can accept user inputs and generate a series of biology questions grounded in real-world examples of biological phenomena.

Here is the workflow:

1. Biology Writer Agent: creates a K-12 reading about the topic given by the user
2. NGSS Agent: designs NGSS-aligned questions based on the reading, self-generated synthetic data, and specific NGSS standard(s)
3. Biology Expert Agent: fact-checks the content produced by the previous agents and formats the content

The goal of this project is to make it easier for people, primarily teachers, to generate NGSS-aligned questions that can support biology learning.

## API Access
The agent workflow is called by a HTTP request to a Flask API endpoint hosted on PythonAnywhere.

## Client UI
Currently developing the frontend UI for users to send requests to the API and receive the generated questions.