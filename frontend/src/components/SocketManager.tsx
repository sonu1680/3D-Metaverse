"use client";
import { characterAtom, mapAtom, userAtom } from "@/recoil/char";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { io, Socket } from "socket.io-client";


interface HelloData {
  map: any;
  id: any;
  characters: any;
}
// Initialize socket but don't connect immediately
export const socket: Socket = io("http://localhost:3001", {
  autoConnect: false,
});

export const SocketManager = () => {
  const setCharacter = useSetRecoilState(characterAtom);
  const setMap = useSetRecoilState(mapAtom);
  const setUser = useSetRecoilState(userAtom);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    if (!socket.connected) { 
      socket.connect();
    }
    console.log(socket)
    const onConnect = () => {
      console.log("User connected");
      setIsConnected(true);
    };


    const onDisconnect = () => {
      console.log("User disconnected");
      setIsConnected(false);
    };

    const onHello = (data: HelloData) => {
      setMap(data.map);
      setUser(data.id );
      setCharacter(data.characters);
    };

    const onCharacters = (characters: any) => {
      console.log("Received characters updates", characters);
      setCharacter(characters);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("characters", onCharacters);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("characters", onCharacters);
      socket.disconnect();
    };
  }, [isConnected]); // Re-run effect only when socket connection status changes

  return null;
};
