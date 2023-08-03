import { io } from "socket.io-client";

export let socket;

export const connectSocket = () => {
  socket = io(process.env.REACT_APP_BASE_URL);
};

export const disconnectSocket = () => {
  socket.disconnect();
};
