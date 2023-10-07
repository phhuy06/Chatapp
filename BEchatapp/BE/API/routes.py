from fastapi import APIRouter
from BE.Auth.token import generate_token
from BE.Auth.validate import validate_token
from BE.Model.model import login_form,register_form
from BE.Database.CRUD import validate_user, create_user


router = APIRouter()

@router.post('/register')
def register(form: register_form):
    return create_user(form.name, form.account, form.password)

@router.post('/login')
def login(form: login_form):
    valid = validate_user(form.account, form.password)
    if valid == False:
        return {"msg": "fail","detail":"Wrong account or password"}
    return {"msg": "success","token" : generate_token(valid), "type" : "Bearer"}


