import { useState } from "react";
import socket from "../../utils/socket";
import LobbySelectionComponent from "./lobbyselectioncomponent";
import WaitingRoomComponent from "./waitingroomcomponent";
import GameComponent from "./GameComponent";

const MainPageComponent = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [roomJoined, setRoomJoined] = useState(false);
    
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

    return (
        <div>
        {!gameStarted && !roomJoined && (
            <LobbySelectionComponent socket={socket} />
          )}
          {roomJoined && !gameStarted && (
            <WaitingRoomComponent socket={socket} />
          )}
          {gameStarted && (
            <GameComponent socket={socket} />
          )}
          </div>
    )

}

export default LobbySelectionComponent