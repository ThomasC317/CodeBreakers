
"use client"
import { Properties } from 'csstype';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
const socket = io("http://localhost:8000")
const CommandPrompt = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [remainingLives, setRemainingLives] = useState(10);
    const [input, setInput] = useState('');
    const [numberToGuess, setNumberToGuess] = useState(0);
    const [output, setOutput] = useState<any[]>([]);

    const [room, setRoom] = useState(1);

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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'monospace',
          color: '#dcdcdc',
          padding: '20px',
          borderRadius: '10px',
          height: '40rem',
          border: '1px solid #333',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        },
        outputContainer: {
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px',
        },
        output: {
          display: 'flex',
          flexDirection: 'column',
        },
        outputEntry: {
          marginBottom: '10px',
        },
        command: {
          color: '#00ff00',
        },
        form: {
          display: 'flex',
          alignItems: 'center',
        },
        input: {
          flex: 1,
          padding: '10px',
          color: '#fff',
          border: '1px solid #00ff00',
          borderRadius: '5px',
          fontSize: '16px',
          outline: 'none',
        },
        button: {
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconWrapper: {
          border: '1px solid #00ff00',
          borderRadius: '50%',
          padding: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        icon: {
          border: '1px solid #00ff00',
          borderRadius: '50%',
          padding: '5px',
        },
      };

      useEffect(() => {
        socket.on("receive_message", (data) => {
         
        });
      }, [socket]);

      // const senMessage = () => {
      //   socket.emit()
      // }
      const joinRoom = () => {
          socket.emit("join_room", room);
      };
      const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const getCommandResult = (command) => {
        const guess = Number(command); // Assure que la commande est un nombre pour la comparaison
        console.log(command);
        console.log(numberToGuess);
      
        // Si le jeu est en cours, on compare le guess
        if (isPlaying) {
          if (guess > numberToGuess) {
            setRemainingLives(remainingLives -1)
            return '> Trop haut !';
          } else if (guess < numberToGuess) {
            setRemainingLives(remainingLives -1)
            return '> Trop bas !';
          } else if (guess === numberToGuess) {
            setIsPlaying(false); // Fin de la partie, on passe en mode "redémarrage"
            return '> Bien joué ! Voulez-vous recommencer ? (y/n)';
          }
        } else {
          // Gestion du redémarrage
          if (command.toLowerCase() === "y" || command.toLowerCase() === "yes" || command.toLowerCase() === "oui" || command.toLowerCase() === "o") {
            setNumberToGuess(generateRandomNumber(1, 20)); // Nouveau nombre aléatoire
            setIsPlaying(true); // On redémarre le jeu*
            setOutput([]);
            return '> Nouveau jeu commencé ! Essayez de deviner le nombre.';
          } else if (command.toLowerCase() === "n" || command.toLowerCase() === "no" || command.toLowerCase() === "non") {
            return `> Merci d'avoir joué !`;
          } else {
            return '> Veuillez entrer "y" pour recommencer ou "n" pour quitter.';
          }
        }
      };

      const handleInputChange = (event) => {
        setInput(event.target.value);
      };
      const handleInputSubmit = (event) => {
        event.preventDefault();
        if (input.trim().toLowerCase() !== 'command') {
          processCommand(input);
        }
        setInput('');
      };

      const processCommand = (command) => {
        const result = getCommandResult(command);
        setOutput((prevOutput) => [...prevOutput, { command, result }]);
      };

      useEffect(() => {
        setNumberToGuess(generateRandomNumber(1,2000))
        setRemainingLives(10);
      },[isPlaying])

          useEffect(() => {
        if(remainingLives == 0)
          setIsPlaying(false)
      },[remainingLives])

    return (

        <div style={styles.container} className={`bg-black`}>
                <button onClick={joinRoom}>Join room</button>
        <div style={styles.outputContainer}>
          <div style={styles.output}>
            <div style={styles.outputEntry}>
              {'>'} Bonjour et bienvenue sur CodeBreakers ! <br />
            </div>
            {output.map((entry, index) => (
              <div key={index} style={styles.outputEntry}>
                <div style={styles.command}>{entry.command ? `> ${entry.command}` : ''}</div>
                <div>{entry.result}</div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleInputSubmit} style={styles.form} >
          <div style={{ position: 'relative', width: '100%' }}>
            <input
            className={`bg-black`}
              type="text"
              value={input}
              onChange={handleInputChange}
              style={{ ...styles.input, paddingRight: '40px', width: '100%' }}
            />
            <button type="submit" style={{ ...styles.button }}>
              <span style={{ marginRight: "0.5rem" }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </button>
          </div>
        </form>
        </div>
    );

}


export default CommandPrompt;