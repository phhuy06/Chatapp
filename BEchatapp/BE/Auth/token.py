from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
SECURITY_ALGORITHM = os.getenv("SECURITY_ALGORITHM")



def generate_token(user_name: str) -> str:
    expire_time = datetime.utcnow() + timedelta(days=3)
    encode = {
        "exp": expire_time,
        "account": user_name,
        "exp_day": 3,
    }
    token = jwt.encode(encode, SECRET_KEY, algorithm=SECURITY_ALGORITHM)
    return token