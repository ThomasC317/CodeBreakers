import { useEffect, useState } from "react";
import socket from "../../utils/socket";

const LobbySelectionComponent = () => {
    const [lobbies, setLobbies] = useState([]);
  
    useEffect(() => {
        // socket.on("connect", () => {
        //   const socketId = socket.id;
        //   console.log("Mon ID socket:", socketId);
        // });
        console.log(socket)
        socket.on("lobbies_list", (availableLobbies) => {
          console.log(availableLobbies)
            setLobbies(availableLobbies);
        });
    
        // socket.on("your_turn", (data) => {
        //   console.log(data);
        //   setIsTurn(true);
        //   setMessage(data.message);
        // });
    
        // socket.on("hint", (hintData) => {
        //   setMessage(hintData.message);
        // });
    
        // socket.on("victory", (winnerIndex) => {
        //   setMessage(`Player ${winnerIndex} a gagné!`);
        // });
    
        return () => {
          socket.off("lobbies_list");
        };
      }, []);

      const setLobby = (lobby) => {
        const username = prompt("Entre ton nom :");
        const lobbyId = lobby.id;
        socket.emit("join_room", { username, lobbyId });
      }

      const createLobby = () => {
        const lobbyName = prompt("Entre le nom du lobby :");
        const userName = prompt("Entre ton nom :");
        socket.emit("create_lobby", { lobbyname:lobbyName, username:userName });
        socket.emit("get_lobbies");
      };
      return (
        <div>
            {lobbies.map((lobby,index) => (
                <div key={index} onClick={setLobby}>{lobby.name}</div>
            ))}
            <button onClick={createLobby}>Créer un lobby</button>
        </div>
      )
}


export default LobbySelectionComponent