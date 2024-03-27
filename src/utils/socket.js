import { io } from 'socket.io-client';
const url = "http://localhost:8033";
const socket = io(url);
export default socket;