import socketio


sio_server = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=[]
)

sio_app = socketio.ASGIApp(
    socketio_server=sio_server
)

@sio_server.event
async def connect(sid, environ, auth):
    print(f'{sid} connected!')
    


@sio_server.event
async def disconnect(sid):
    print(f'{sid} disconnected!')

    
    
@sio_server.event
async def show_connect(sid,fullname, name):
    await sio_server.emit('join',{
        "sid": sid,
        "fullname": fullname,
        "name": name
    })


@sio_server.event
async def mess(sid, mess, fullname, name):
    await sio_server.emit('mess', {
        "sid" : sid,
        "message": mess,
        "fullname": fullname,
        "name": name
    })