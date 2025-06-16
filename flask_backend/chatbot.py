import os
from langchain.chat_models import init_chat_model
from langchain_core.messages import BaseMessage, AIMessage, HumanMessage, SystemMessage, AnyMessage, trim_messages
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, END, MessagesState, StateGraph
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langgraph.graph.message import add_messages
from typing import Sequence, List
from typing_extensions import Annotated, TypedDict
from dotenv import load_dotenv

load_dotenv()

llm_model = init_chat_model(model=os.getenv("MODEL_NAME"), model_provider=os.getenv("MODEL_PROVIDER"))

# provides the current state of the chat history to the LLM for a response
def call_llm(state: MessagesState) -> dict:
    response = llm_model.invoke(state["messages"])
    return {"messages": response}

# create a blank graph for the chatbot
# the state is MessagesState
workflow = StateGraph(state_schema=MessagesState)

# create a node for call_llm()
workflow.add_node("llm_model", call_llm)

# add starting and ending edge
workflow.add_edge(START, "llm_model")
workflow.add_edge("llm_model", END)

app = workflow.compile()

query = "Hi! I'm Bob."

input_messages = [HumanMessage(content=query)]
output = app.invoke({"messages": input_messages})

# print(output["messages"][-1].content)