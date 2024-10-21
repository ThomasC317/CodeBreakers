import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import { Properties } from "csstype";

const WaitingRoomComponent = ({ players }) => {
  const handleLaunchGame = () => {
    socket.emit("launch_game");
  };

  const handleDisconnect = () => {
    socket.emit("leave_lobby");
  };

  type Styles = {
    container: Properties;
    playerListContainer: Properties;
    playerList: Properties;
    playerItem: Properties;
    button: Properties;
    buttonHover: Properties;
    heading: Properties;
    buttonContainer: Properties;
  };

  const styles: Styles = {
    container: {
      padding: "20px",
      backgroundColor: "#1c1c1c",
      borderRadius: "10px",
      color: "#f5f5f5",
      fontFamily: "monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    playerListContainer: {
      width: "100%",
      textAlign: "center",
      marginBottom: "20px",
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
      color: "#fff",
    },
    button: {
      backgroundColor: "#00ff00",
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
      backgroundColor: "#00ff00",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
      textAlign: "center",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Salle d'attente</h1>
      <div style={styles.playerListContainer}>
        <h3>Joueurs:</h3>
        <ul style={styles.playerList}>
          {players.map((player, index) => (
            <li key={index} style={styles.playerItem}>
              {player.player}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          onClick={handleLaunchGame}
        >
          Lancer le Jeu
        </button>
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          onClick={handleDisconnect}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default WaitingRoomComponent;