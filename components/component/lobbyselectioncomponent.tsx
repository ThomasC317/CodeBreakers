import { useEffect, useState } from "react";


const LobbySelectionComponent = (socket) => {
    const [lobbies, setLobbies] = useState([]);

    useEffect(() => {
        // socket.on("connect", () => {
        //   const socketId = socket.id;
        //   console.log("Mon ID socket:", socketId);
        // });
    
        socket.on("get_lobbies", (availableLobbies) => {
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
          socket.off("get_lobbies");
        };
      }, []);

      const setLobby = (lobby) => {
        const username = prompt("Entre ton nom :");
        const lobbyId = lobby.id;
        socket.emit("join_room", { username, lobbyId });
      }
      return (
        <div>
            {lobbies.map((lobby,index) => (
                <div key={index} onClick={setLobby}>{lobby.name}</div>
            ))

            }
        </div>
      )
}


export default LobbySelectionComponent