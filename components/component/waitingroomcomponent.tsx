import { useEffect, useState } from "react";
import socket from "../../utils/socket";

const WaitingRoomComponent = () => {
    const [players, setPlayers] = useState([]);
    const [lobbyId, setLobbyId] = useState(0);
    useEffect(() => {
        socket.on("players_list", (playerList) => {
            console.log(playerList)
            setPlayers(playerList);
          });

        //   socket.on("lobbies_list", (availableLobbies) => {
        //     setLobbyId(availableLobbies.length +1);
        //   });
        socket.on("lobby_id", (lobbyId) => {
            console.log("set lobby !")
            setLobbyId(lobbyId);
        });

        // socket.on("disconnected",() => {
        //   setRoomJoined(false);
        //   setGameStarted(false);
        // })

        // socket.on("number_to_guess",() => {
        //   setGameStarted(true)
        // })
    
        return () => {
          socket.off("players_list");
          socket.off("lobby_id");
          socket.off("lobbies_list");
        };
      }, []);
      const handleLaunchGame = () => {
        // Lancer le jeu
        socket.emit("launch_game", { lobbyId: lobbyId });
      };
    return (
        <div>
                <div style={{ marginRight: "20px", width: "200px" }}>
      <h3>Joueurs:</h3>
      <ul style={{ lineHeight: "2em" }}>
        {players.map((player, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px", // Espacement vertical
            }}
          >
            {player.player}
          </li>
        ))}
      </ul>
    </div>
             <button onClick={handleLaunchGame}>Lancer le Jeu</button>
             
        </div>
    )
}


export default WaitingRoomComponent