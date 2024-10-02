"use client"
import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import LobbySelectionComponent from "./lobbyselectioncomponent";
import WaitingRoomComponent from "./waitingroomcomponent";
import GameComponent from "./gamecomponent";

const MainPageComponent = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [roomJoined, setRoomJoined] = useState(false);
    
    useEffect(() => {
        socket.on("joined", () => {
          setRoomJoined(true);
        });

        socket.on("lobby_created", () => {
          setRoomJoined(true);
        });

        socket.on("disconnected",() => {
          setRoomJoined(false);
          setGameStarted(false);
        })

        socket.on("number_to_guess",() => {
          console.log("launched!")
          setGameStarted(true);
          setRoomJoined(false);
        })
    
        return () => {
          socket.off("joined");
          socket.off("disconnected");
          socket.off("number_to_guess");
          socket.off("lobby_created");
        };
      }, []);

    return (
        <div>
        {!gameStarted && !roomJoined && (
            <LobbySelectionComponent/>
          )}
          {roomJoined && !gameStarted && (
            <WaitingRoomComponent />
          )}
          {gameStarted && (
            <GameComponent />
          )}
          </div>
    )

}

export default MainPageComponent