import { io } from 'socket.io-client';
const url = process.env.REACT_APP_SOCKET_URL;
console.log("🚀 ~ url:", url)
const socket = io(url);
export default socket;