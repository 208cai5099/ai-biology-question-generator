import sqlalchemy
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, declarative_base
from sqlalchemy import String, Integer
import bcrypt

# set up db and session classes
db = sqlalchemy.create_engine("sqlite:///biology_question_generator.db")
db_session = sessionmaker(bind=db)

# extract generic class
Base = declarative_base()

# create a class for accounts
class Account(Base):
    __tablename__ = "accounts"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(30), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)

Base.metadata.create_all(db)

# checks whether an account with the given username already exists
def username_exists(username: str) -> bool:
    with db_session() as session:
        if len(session.query(Account).all()) > 0:
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