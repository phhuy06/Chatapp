from sqlmodel import select, Session
from .engine import engine
from .database import User, Message

def validate_user(account: str, password: str):
    with Session(engine) as session:
        statement = select(User).where(User.user_account == account).where(User.user_password == password)
        result = session.exec(statement).first()
        if result is None:
            return False
        return result.user_name
    

def create_user(name: str, account: str, password: str):
    user = User(
        user_name=name,
        user_account=account,
        user_password=password
    )

    with Session(engine) as session:
        statement = select(User).where(User.user_account == account)
        result = session.exec(statement).first()
        if result:
            return {"msg": "fail", "detail": "Account exist!"}
        session.add(user)
        session.commit()
        session.refresh(user)
    return {"msg": "success", "detail": user}

