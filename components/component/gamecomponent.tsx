"use client";
import { Properties } from "csstype";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import socket from "../../utils/socket";

const GameComponent = ({ players }) => {
  const [input, setInput] = useState("");
  const [isTurn, setIsTurn] = useState(false);
  const [message, setMessage] = useState("");
  const [hint, setHint] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState();

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
    playerList: Properties;
    playerCard: Properties;
  };

  const styles: Styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "'Fira Code', monospace",
      color: "#00ff00", // Vert néon
      padding: "20px",
      borderRadius: "15px",
      height: "40rem",
      border: "1px solid #333",
      backgroundColor: "#1a1a1a", // Noir plus clair
      boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)", // Effet néon
      transition: "all 0.3s ease",
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
      padding: "12px 20px",
      color: "#fff",
      backgroundColor: "#333",
      border: "1px solid #00ff00",
      borderRadius: "5px",
      fontSize: "18px",
      outline: "none",
      transition: "border-color 0.3s ease",
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
      padding: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      border: "1px solid #00ff00",
      borderRadius: "50%",
      padding: "5px",
    },
    playerList: {
      marginRight: "20px",
      width: "250px",
      backgroundColor: "#111", // Fond sombre pour les joueurs
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 255, 0, 0.3)", // Effet néon autour des joueurs
    },
    playerCard: {
      backgroundColor: "#333",
      color: "#00ff00",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "background-color 0.3s ease", // Transition fluide pour le changement de couleur
    },
  };

  useEffect(() => {
    socket.on("your_turn", () => {
      console.log("votre tour");
      setIsTurn(true);
    });

    socket.on("current_player", ({ player }) => {
      console.log(`Current player is: ${player}`);
      console.log(players);
      setCurrentPlayer(player);
    });

    socket.on("hint", (hintData) => {
      setHint(hintData.message);
    });

    socket.on("victory", (winnerIndex) => {
      setMessage(`Player ${winnerIndex.player} a gagné!`);
    });

    return () => {
      socket.off("current_player");
      socket.off("your_turn");
      socket.off("hint");
      socket.off("victory");
    };
  }, []);

  useEffect(() => {
    if (isTurn) setMessage("C'est votre tour !");
    else setMessage("C'est le tour du joueur " + currentPlayer);
  }, [isTurn, currentPlayer]);

  const handleGuess = (currentGuess) => {
    if (isTurn) {
      socket.emit("guess_number", {
        guess: Number(currentGuess),
      });
      setIsTurn(false);
    } else {
      alert("Ce n’est pas ton tour!");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleDisconnect = () => {
    socket.emit("leave_lobby")
  }


  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      handleGuess(input);
      setInput("");
    }
  };

  return (
<div style={{ display: "flex", justifyContent: "space-between" }}>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={styles.playerList}>
      <h3>Joueurs:</h3>
      <ul style={{ lineHeight: "2em", padding: 0 }}>
        {players.map((player, index) => (
          <li
            key={index}
            style={{
              ...styles.playerCard,
              backgroundColor: currentPlayer === player.player ? "#00ff00" : "#333", // Joueur en cours en vert
              color: currentPlayer === player.player ? "#000" : "#00ff00",
            }}
          >
            {player.player}
          </li>
        ))}
      </ul>
      <button
      style={{  backgroundColor: "#00ff00",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "20px",
        transition: "background-color 0.3s ease",}}
      onClick={handleDisconnect}
    >
      Se déconnecter
    </button>
    </div>

  </div>

  <div style={styles.container}>
    <h1>{message}</h1>
    <h2>{hint}</h2>
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
          disabled={!isTurn}
          type="text"
          value={input}
          onChange={handleInputChange}
          style={{ ...styles.input, paddingRight: "40px", width: "100%" }}
        />
        <button type="submit" style={styles.button}>
          <span style={styles.iconWrapper}>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default GameComponent;
