from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from BE.Sockets.sockets import sio_app
from BE.API.routes import router

app = FastAPI()

app.mount('/ws', app=sio_app)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {"msg":"hello world"}

app.include_router(router)
