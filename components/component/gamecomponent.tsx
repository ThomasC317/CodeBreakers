"use client";
import { Properties } from "csstype";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import socket from "../../utils/socket";

const GameComponent = (socket) => {
  const [input, setInput] = useState("");
  const [players, setPlayers] = useState([]);
  const [isTurn, setIsTurn] = useState(false);
  const [message, setMessage] = useState("");
  type Styles = {
    container: Properties;
    outputContainer: Properties;
    output: Properties;
    outputEntry: Properties;
    command: Properties;
    form: Properties;
    input: Properties;
    button: Properties;
    iconWrapper: Properties;
    icon: Properties;
  };

  const styles: Styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "monospace",
      color: "#dcdcdc",
      padding: "20px",
      borderRadius: "10px",
      height: "40rem",
      border: "1px solid #333",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    },
    outputContainer: {
      flex: 1,
      overflowY: "auto",
      marginBottom: "20px",
    },
    output: {
      display: "flex",
      flexDirection: "column",
    },
    outputEntry: {
      marginBottom: "10px",
    },
    command: {
      color: "#00ff00",
    },
    form: {
      display: "flex",
      alignItems: "center",
    },
    input: {
      flex: 1,
      padding: "10px",
      color: "#fff",
      border: "1px solid #00ff00",
      borderRadius: "5px",
      fontSize: "16px",
      outline: "none",
    },
    button: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    iconWrapper: {
      border: "1px solid #00ff00",
      borderRadius: "50%",
      padding: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      border: "1px solid #00ff00",
      borderRadius: "50%",
      padding: "5px",
    },
  };

  useEffect(() => {
    socket.on("connect", () => {
      const socketId = socket.id;
      console.log("Mon ID socket:", socketId);
    });

    socket.on("players_list", (playerList) => {
      setPlayers(playerList);
    });

    socket.on("your_turn", (data) => {
      console.log(data);
      setIsTurn(true);
      setMessage(data.message);
    });

    socket.on("hint", (hintData) => {
      setMessage(hintData.message);
    });

    socket.on("victory", (winnerIndex) => {
      setMessage(`Player ${winnerIndex} a gagné!`);
    });

    return () => {
      socket.off("connect");
      socket.off("players_list");
      socket.off("your_turn");
      socket.off("hint");
      socket.off("victory");
    };
  }, []);

  const handleGuess = (currentGuess) => {
    // Deviner un nombre
    if (isTurn) {
      socket.emit("guess_number", {
        guess: Number(currentGuess),
        room: "room1",
      }); 
      setIsTurn(false); 
    } else {
      alert("Ce n’est pas ton tour!");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      handleGuess(input); 
      setInput(""); 
    }
  };

  const handleJoinRoom = () => {
    const username = prompt("Entre ton nom :");
    const room = "room1"; 
    socket.emit("join_room", { username, room });
  };

  const handleLaunchGame = () => {
    // Lancer le jeu
    socket.emit("launch_game", { room: "room1" });
  };

  return (
<div>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {/* Conteneur des joueurs en dehors du command prompt */}
    <div style={{ marginRight: "20px", width: "200px" }}>
      <h3>Joueurs:</h3>
      <ul style={{ lineHeight: "2em" }}>
        {players.map((player, index) => (
          <li
            key={index}
            style={{
              backgroundColor:
                isTurn && player.roomId === socket.id
                  ? "lightgreen"
                  : "white",
              marginBottom: "10px", // Espacement vertical
            }}
          >
            {player.player}
          </li>
        ))}
      </ul>
    </div>

    {/* Le reste du contenu dans le container principal */}
    <div style={styles.container} className={`bg-black`}>
      <button onClick={handleJoinRoom}>Rejoindre une Room</button>
      <button onClick={handleLaunchGame}>Lancer le Jeu</button>
      <h1>{message}</h1>
      <div style={styles.outputContainer}>
        <div style={styles.output}>
          <div style={styles.outputEntry}>
            {">"} Bonjour et bienvenue sur CodeBreakers ! <br />
          </div>
        </div>
      </div>
      <form onSubmit={handleInputSubmit} style={styles.form}>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            className={`bg-black`}
            type="text"
            value={input}
            onChange={handleInputChange}
            style={{ ...styles.input, paddingRight: "40px", width: "100%" }}
          />
          <button type="submit" style={{ ...styles.button }}>
            <span style={{ marginRight: "0.5rem" }}>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default GameComponent;
