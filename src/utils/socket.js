import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constants";

const socket = io(BASE_URL, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;


export const createSocketConnection = () => {
    return io(BASE_URL);
};