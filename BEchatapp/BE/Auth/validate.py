from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer
from pydantic import ValidationError
import jwt
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
SECURITY_ALGORITHM = os.getenv("SECURITY_ALGORITHM")


token_receive = HTTPBearer(scheme_name="AUTH")

def validate_token(header = Depends(token_receive)):
    try:
        payload = jwt.decode(header.credentials, SECRET_KEY, SECURITY_ALGORITHM)
        if datetime.utcfromtimestamp(payload.get('exp')) < datetime.utcnow():
            raise HTTPException(status_code=403, detail="Token expired")
    except (jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=403,
            detail="Could not validate credentials",
        )