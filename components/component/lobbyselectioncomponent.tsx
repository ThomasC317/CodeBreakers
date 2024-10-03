import { useEffect, useState } from "react";
import socket from "../../utils/socket";

const LobbySelectionComponent = () => {
  const [lobbies, setLobbies] = useState([]);

  useEffect(() => {
    socket.on("lobbies_list", (availableLobbies) => {
      setLobbies(availableLobbies);
    });

    socket.on("get_lobbies", (availableLobbies) => {
      setLobbies(availableLobbies);
    });

    return () => {
      socket.off("lobbies_list");
    };
  }, []);

  const setLobby = (lobby) => {
    const username = prompt("Entre ton nom :");
    const lobbyId = lobby.lobbyId;
    socket.emit("join_room", { username, lobbyId });
  };

  const createLobby = () => {
    const lobbyName = prompt("Entre le nom du lobby :");
    const userName = prompt("Entre ton nom :");
    socket.emit("create_lobby", { lobbyname: lobbyName, username: userName });
    socket.emit("get_lobbies");
  };

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#1c1c1c",
      borderRadius: "10px",
      color: "#f5f5f5",
      fontFamily: "monospace",
    },
    lobbyList: {
      listStyleType: "none",
      padding: 0,
      margin: "20px 0",
    },
    lobbyItem: {
      backgroundColor: "#333",
      padding: "15px",
      margin: "10px 0",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    lobbyItemHover: {
      backgroundColor: "#444",
    },
    button: {
      backgroundColor: "#28a745",
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
      backgroundColor: "#218838",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Sélection de Lobby</h1>
      <ul style={styles.lobbyList}>
        {lobbies.map((lobby, index) => (
          <li
            key={index}
            style={styles.lobbyItem}
            onClick={() => setLobby(lobby)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#444")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#333")
            }
          >
            {lobby.name}
          </li>
        ))}
      </ul>
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
        onClick={createLobby}
      >
        Créer un lobby
      </button>
    </div>
  );
};

export default LobbySelectionComponent;
