import os
from langchain.chat_models import init_chat_model
from langchain_core.messages import BaseMessage, AIMessage, HumanMessage, SystemMessage, trim_messages
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langgraph.graph.message import add_messages
from typing import Sequence, List
from typing_extensions import Annotated, TypedDict
from dotenv import load_dotenv

load_dotenv()

llm_model = init_chat_model(model=os.getenv("MODEL_NAME"), model_provider=os.getenv("MODEL_PROVIDER"))

def call_llm(chat_history: List[BaseMessage]) -> str:

    response = llm_model.invoke(chat_history)
    return response.content