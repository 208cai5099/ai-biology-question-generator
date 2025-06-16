import os
import chromadb
import chromadb.utils.embedding_functions as embedding_functions
from dotenv import load_dotenv

load_dotenv()

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
collection = chroma_client.get_or_create_collection(name="biology_exam_info", embedding_function=embedding_function)
