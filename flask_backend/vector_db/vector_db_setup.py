import os
from datetime import datetime
import chromadb
import chromadb.utils.embedding_functions as embedding_functions
from langchain.text_splitter import CharacterTextSplitter
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
collection = chroma_client.get_or_create_collection(
    name=collection_name, 
    embedding_function=embedding_function,
    metadata={
    "description": "collection of info about the NYS life science exam",
    "created": str(datetime.now())
    } )

# create a text splitter that chunks the text into chunks with overlapping portions
splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

# load the documents and split them
document_filenames = [doc_name.strip() for doc_name in os.getenv("DOCUMENT_NAMES").split("$")]
document_texts = []
for filename in document_filenames:

    with open(filename, "r", encoding="utf-8") as file:
        text = file.read()
        document_texts.extend(splitter.split_text(text))

# tokenize the text chunks and create embeddings for them
# store the embeddings inside the db
collection.add(ids=[f"id{i+1}" for i in range(len(document_texts))], documents=document_texts)