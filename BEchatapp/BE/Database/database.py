from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import time
from .engine import engine


class User(SQLModel, table=True):
    __tablename__ = "user"

    user_id : Optional[int] = Field(default=None, primary_key=True)
    user_name : str = Field(nullable=False)
    user_account: str = Field(nullable=False)
    user_password: str = Field(nullable=False)


class Message(SQLModel, table=True):
    __tablename__ = "message"

    msg_id : Optional[int] = Field(default=None,primary_key=True)
    user_id : int = Field(foreign_key='user.user_id')
    msg : str
    time : time

def init():
    SQLModel.metadata.create_all(engine)
