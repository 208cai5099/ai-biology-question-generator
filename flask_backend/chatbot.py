import os
import chromadb
import chromadb.utils.embedding_functions as embedding_functions
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage, SystemMessage, ToolMessage
from langgraph.graph import START, END, MessagesState, StateGraph
from langchain_core.documents import Document
from langchain_core.retrievers import BaseRetriever
from langchain.tools.retriever import create_retriever_tool
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langgraph.prebuilt import ToolNode, tools_condition

SYSTEM_PROMPT = (
    "You are a friendly chatbot that answers questions about the NYS Life Science: Biology exam. The exam follows the "
    "high school NYS P-12 Life Science standards, which are mostly based on the Next Generation Science Standards. "
    "If you don't know something, you should use the rag tool to retrieve any relevant information from the database. "
    "You keep your responses short and sweet."
)

EVALUATE_PROMPT = (
    "You are a chatbot talking about the NYS Life Science: Biology exam. The user said the following: "
    "\n\n{user_message}\n\n"
    "You retrieved some documents to design your response. "
    "Here are the retrieved documents: "
    "\n\n{docs}\n\n"
    "If the retrieved documents are relevant to the user's message, mark it as "
    "relevant. Say 'relevant' or 'not relevant'."
)

GENERATE_PROMPT = (
    "You are a chatbot talking about the NYS Life Science: Biology exam. "
    "Use the following pieces of retrieved documents to respond to the user's message. "
    "If you don't know the answer, just say that you don't know. "
    "Use three sentences maximum and keep the answer concise."
    "\n\nUser Message: {user_message} \n\n"
    "Documents: {docs}"
)

class RAGRetriever(BaseRetriever):
    '''
    Customized retriever for querying a chroma database for info about the NYS Life Science: Biology exam
    '''

    def _get_relevant_documents(self, query: str) -> list[Document]:
        '''Queries a chroma db collection for info about the query'''
        
        output = collection.query(
            query_texts=[query],
            n_results=3,
            include=["documents"]
        )

        docs = []
        for d in output["documents"][0]:
            docs.append(Document(
                page_content=d,
                meta_data={"source": "chroma_db", "query": query}
            ))
        
        return docs

def respond_or_retrieve(state: MessagesState):
    """
    Call LLM for response based on chat history. It can query a chroma db for relevant info as needed.
    """
    response = llm_model.invoke(state["messages"])
    return {"messages" : [response]}

class DocumentCheck(BaseModel):
    """Label documents as relevant or not relevant"""

    label: str = Field(
        description="Two possible values: 'relevant' or 'not relevant'"
    )

def evaluate(state: MessagesState):
    '''Checks whether the retrieved documents are relevant to the user message'''

    user_message = state["messages"][-3].content
    docs = state["messages"][-1].content

    prompt = EVALUATE_PROMPT.format(user_message=user_message, docs=docs)
    response = llm_model.with_structured_output(DocumentCheck).invoke([HumanMessage(content=prompt)])
    
    if response.label == "relevant":
        return state
    
    else:
        state["messages"].pop()
        state["messages"].append(ToolMessage(content="No relevant documents found"))

def create_response(state: MessagesState):
    '''Creates a response to user message based on retrieved documents'''
    user_message = state["messages"][-3].content
    docs = state["messages"][-1].content

    prompt = GENERATE_PROMPT.format(user_message=user_message, docs=docs)
    response = llm_model.invoke([HumanMessage(content=prompt)])
    return {"messages": [response]}

load_dotenv()

llm_model = init_chat_model(model=os.getenv("MODEL_NAME"), model_provider=os.getenv("MODEL_PROVIDER"))

# use one of OpenAI's embedding functions
embedding_function = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.getenv("OPENAI_API_KEY"), 
    model_name="text-embedding-3-small"
    )

# create a persistent chroma db client
persistent_path = os.getenv("PERSISTENT_PATH")
chroma_client = chromadb.PersistentClient(path=persistent_path)

# create the collection if it doesn't exist already
collection_name = "biology_exam_info"
collection = chroma_client.get_collection(
    name=collection_name, 
    embedding_function=embedding_function
    )

retriever = RAGRetriever()

retriever_tool = create_retriever_tool(
    retriever, 
    "retrieve_bio_exam_info",
    "Query for information about the NYS Life Science: Biology exam"
    )

llm_model = llm_model.bind_tools([retriever_tool])

workflow = StateGraph(MessagesState)

workflow.add_node("respond_or_retrieve", respond_or_retrieve)
workflow.add_node("evaluate", evaluate)
workflow.add_node("create_response", create_response)
workflow.add_node("retrieve", ToolNode([retriever_tool]))

workflow.add_edge(START, "respond_or_retrieve")

workflow.add_conditional_edges(
    "respond_or_retrieve",
    tools_condition,
    {
        "tools": "retrieve",
        "__end__": END,
    },
)

workflow.add_edge("retrieve", "evaluate")
workflow.add_edge("evaluate", "create_response")
workflow.add_edge("create_response", END)

chatbot = workflow.compile()

response = chatbot.invoke({
    "messages" : [
        SystemMessage(content=SYSTEM_PROMPT), 
        HumanMessage(content="What are PLDs?")
        ]
    })

print(response["messages"][-1].content)