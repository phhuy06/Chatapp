import { io } from 'socket.io-client';
const Socket = io(`ws://${process.env.REACT_APP_API_ENDPOINT.slice(7)}/`, {
    path: '/ws/socket.io',
    autoConnect: false,
});

export default Socket;
