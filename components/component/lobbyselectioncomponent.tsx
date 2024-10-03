import { useEffect, useState } from "react";
import socket from "../../utils/socket";

const LobbySelectionComponent = () => {
    const [lobbies, setLobbies] = useState([]);
  
    useEffect(() => {
        console.log(socket)
        socket.on("lobbies_list", (availableLobbies) => {
          console.log(availableLobbies)
            setLobbies(availableLobbies);
        });

        socket.on("get_lobbies", (availableLobbies) => {
          console.log(availableLobbies)
          setLobbies(availableLobbies);
        });
        
        return () => {
          socket.off("lobbies_list");
        };
      }, []);

      const setLobby = (lobby) => {
        const username = prompt("Entre ton nom :");
        const lobbyId = lobby.lobbyId;
        console.log(lobbyId)
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
                <div key={index} onClick={()=>setLobby(lobby)}>{lobby.name}</div>
            ))}
            <button onClick={createLobby}>Créer un lobby</button>
        </div>
      )
}


export default LobbySelectionComponent