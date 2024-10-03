import { useEffect, useState } from "react";
import socket from "../../utils/socket";

const WaitingRoomComponent = ({ players }) => {
  const handleLaunchGame = () => {
    socket.emit("launch_game");
  };

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#1c1c1c",
      borderRadius: "10px",
      color: "#f5f5f5",
      fontFamily: "monospace",
    },
    playerList: {
      listStyleType: "none",
      padding: 0,
      margin: "20px 0",
    },
    playerItem: {
      backgroundColor: "#333",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "8px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "20px",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Salle d'attente</h1>
      <div style={{ marginRight: "20px", width: "200px" }}>
        <h3>Joueurs:</h3>
        <ul style={styles.playerList}>
          {players.map((player, index) => (
            <li key={index} style={styles.playerItem}>
              {player.player}
            </li>
          ))}
        </ul>
      </div>
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        onClick={handleLaunchGame}
      >
        Lancer le Jeu
      </button>
    </div>
  );
};

export default WaitingRoomComponent;
