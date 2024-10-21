import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import { Properties } from 'csstype';

const LobbySelectionComponent = () => {
  const [lobbies, setLobbies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(""); // 'create' or 'join'
  const [username, setUsername] = useState("");
  const [lobbyName, setLobbyName] = useState("");
  const [selectedLobby, setSelectedLobby] = useState(null);

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

  const openModal = (mode, lobby = null) => {
    setModalMode(mode);
    setSelectedLobby(lobby);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUsername("");
    setLobbyName("");
  };

  const handleJoinLobby = () => {
    if (selectedLobby && username) {
      socket.emit("join_room", { username, lobbyId: selectedLobby.lobbyId });
      closeModal();
    }
  };

  const handleCreateLobby = () => {
    if (lobbyName && username) {
      socket.emit("create_lobby", { lobbyname: lobbyName, username });
      socket.emit("get_lobbies");
      closeModal();
    }
  };

  const styles: { [key: string]: Properties } = {
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
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#333",
      padding: "20px",
      borderRadius: "10px",
      color: "#fff",
      zIndex: 1000,
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 999,
    },
    input: {
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      width: "100%",
      color:"black"
    },
    modalButtons: {
      display: "flex",
      justifyContent: "space-between",
      gap:"10px",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Sélection de Lobby</h1>
      <ul style={styles.lobbyList}>
        {lobbies.map((lobby, index) => (
          <li
            key={index}
            style={styles.lobbyItem}
            onClick={() => openModal("join", lobby)}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#444")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333")}
          >
            {lobby.name}
          </li>
        ))}
      </ul>
      <button
        style={styles.button}
        onClick={() => openModal("create")}
      >
        Créer un lobby
      </button>

      {isModalOpen && (
        <>
          <div style={styles.modalOverlay} onClick={closeModal}></div>
          <div style={styles.modal}>
            {modalMode === "create" && (
              <>
                <h2>Créer un lobby</h2>
                <input
                  type="text"
                  placeholder="Nom du lobby"
                  style={styles.input}
                  value={lobbyName}
                  onChange={(e) => setLobbyName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Ton nom"
                  style={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div style={styles.modalButtons}>
                  <button style={styles.button} onClick={handleCreateLobby}>
                    Créer
                  </button>
                  <button style={styles.button} onClick={closeModal}>
                    Annuler
                  </button>
                </div>
              </>
            )}
            {modalMode === "join" && selectedLobby && (
              <>
                <h2>Rejoindre {selectedLobby.name}</h2>
                <input
                  type="text"
                  placeholder="Ton nom"
                  style={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div style={styles.modalButtons}>
                  <button style={styles.button} onClick={handleJoinLobby}>
                    Rejoindre
                  </button>
                  <button style={styles.button} onClick={closeModal}>
                    Annuler
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LobbySelectionComponent;