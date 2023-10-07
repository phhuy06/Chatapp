from pydantic import BaseModel

class login_form(BaseModel):
    account: str
    password: str

class register_form(BaseModel):
    name: str
    account: str
    password: str
