import sqlalchemy
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, declarative_base
from sqlalchemy import String, Text, DateTime, asc, delete
from datetime import datetime
from typing import List, Union
import bcrypt

# set up db and session classes
db = sqlalchemy.create_engine("sqlite:///biology_question_generator.db")
db_session = sessionmaker(bind=db)

# extract generic class
Base = declarative_base()

# create a class/table for accounts
class Account(Base):
    __tablename__ = "accounts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(30), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)

# create a class/table for chats
class Chat(Base):
    __tablename__ = "chats"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    session_id: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[str] = mapped_column(String(15), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    time: Mapped[str] = mapped_column(DateTime, nullable=False)

Base.metadata.create_all(db)

# checks whether an account with the given username already exists
def username_exists(username: str) -> bool:
    with db_session() as session:
        if len(session.query(Account).filter(Account.username == username).all()) > 0:
            return True
    
    return False

# creates the user account
def create_user(username: str, password: str) -> bool:

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    user = Account(username=username, password=hashed_password)

    with db_session() as session:
        session.add(user)
        session.commit()
        return True
    
    return False

# authenticates the user login
def auth_user(username: str, password: str) -> bool:

    with db_session() as session:
        user_acc = session.query(Account).filter(Account.username == username).first()

        if user_acc is not None and bcrypt.checkpw(password.encode("utf-8"), user_acc.password) is True:
            return True
    
    return False

# deletes a user
def delete_user(username: str) -> bool:

    with db_session() as session:
        session.query(Account).filter(Account.username == username).delete(synchronize_session="evaluate")
        session.commit()
        return True
    
    return False

# add messages to the chats table
def add_message(session_id: str, role: str, message: str) -> bool:

    chat = Chat(session_id=session_id, role=role, message=message, time=datetime.now())
    with db_session() as session:
        session.add(chat)
        session.commit()
        return True
    
    return False

# search for messages belonging to a specific session ID
def query_messages(session_id: str) -> Union[List, None]:

    with db_session() as session:
        chat_history = session.query(Chat).filter(Chat.session_id == session_id).order_by(asc(Chat.time)).all()
        return chat_history

# delete all messages at or before a certain time
def delete_messages(time: datetime) -> Union[int, None]:

    with db_session() as session:
        deletion_count = session.query(Chat).filter(Chat.time <= time).delete()
        session.commit()
        return deletion_count