import { io } from "socket.io-client";
<<<<<<< HEAD
// const REACT_APP_BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY
// const REACT_APP_LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND

const socket = io('http://localhost:5001');

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
=======
const REACT_APP_BACKEND_SOCKET = process.env.REACT_APP_BACKEND_SOCKET

// const socket = io('http://localhost:5001');
const socket = io(REACT_APP_BACKEND_SOCKET);
>>>>>>> b5317968d4dc3444973f63569863962040e071ad

export default socket;