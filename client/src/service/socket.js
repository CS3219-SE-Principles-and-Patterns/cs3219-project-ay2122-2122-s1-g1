import { io } from "socket.io-client";

const SOCKET_URL = "https://peerprep-330010.as.r.appspot.com/";

export const socket = io(SOCKET_URL, { secure: true });