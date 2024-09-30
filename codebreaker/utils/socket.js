import { io } from "socket.io-client";

// Configuration du socket client
const SOCKET_URL = "http://localhost:8000"; // Adresse de ton serveur backend
const socket = io(SOCKET_URL, {
  transports: ['websocket'], // Utilisation de WebSocket pour les communications
});

export default socket;