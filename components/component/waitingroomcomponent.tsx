import { useEffect, useState } from "react";
import socket from "../../utils/socket";

const WaitingRoomComponent = ({ players }) => {
  const handleLaunchGame = () => {
    socket.emit("launch_game");
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
                marginBottom: "10px",
              }}
            >
              {player.player}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleLaunchGame}>Lancer le Jeu</button>
    </div>
  );
};

export default WaitingRoomComponent;
