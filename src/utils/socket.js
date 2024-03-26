import { io } from 'socket.io-client';
const url = process.env.REACT_SOCKET_URL;
const socket = io(url);
export default socket;