"use client";
import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import LobbySelectionComponent from "./lobbyselectioncomponent";
import WaitingRoomComponent from "./waitingroomcomponent";
import GameComponent from "./gamecomponent";

const MainPageComponent = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [roomJoined, setRoomJoined] = useState(false);
  const [playerList, setPlayersList] = useState([]);

  useEffect(() => {
    socket.on("joined", () => {
      setRoomJoined(true);
    });

    socket.on("players_list", (playerList) => {
      setPlayersList(playerList);
    });

    socket.on("disconnected", () => {
      setRoomJoined(false);
      setGameStarted(false);
    });

    socket.on("game_launched", () => {
      setGameStarted(true);
      setRoomJoined(false);
    });

    socket.on("player_left", () => {
      setRoomJoined(false);
      setGameStarted(false);
    })

    return () => {
      socket.off("joined");
      socket.off("disconnected");
      socket.off("players_list");
      socket.off("game_launched");
    };
  }, []);



  return (
    <div>
      {!gameStarted && !roomJoined && <LobbySelectionComponent />}
      {roomJoined && !gameStarted && (
        <WaitingRoomComponent players={playerList} />
      )}
      {gameStarted && <GameComponent players={playerList} />}
    </div>
  );
};

export default MainPageComponent;
