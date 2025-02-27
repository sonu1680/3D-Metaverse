import { userAtom } from "@/recoil/char";
import { useEffect, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { io, Socket } from "socket.io-client";

 export const socket: Socket = io("http://localhost:3001", {
   autoConnect: false,
 });


const useSocket = (roomId: string) => {
  const [chat, setChat] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [characters, setCharacters] = useState<any[]>([]); 
  const setUser = useSetRecoilState(userAtom);


  useEffect(() => {
    if (!roomId) return;
     if (!socket.connected) { 
          socket.connect();
        }
    socket.on("connect", () => {
      // console.log("connected", socket.id);
    });

    socket.emit("joinRoom", roomId);

    socket.on("isRoomJoined", ({ roomId, characters }) => {
      // console.log(`Room joined successfully with room Id ${roomId}`);
      // console.log(characters);
      setCharacters(characters);
      //@ts-ignore
      setUser(socket.id);
    });

    socket.on("getChat", (receivedChat) => {
      // console.log(receivedChat);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("connect");
      socket.off("isRoomJoined");
      socket.off("getChat");
      socket.disconnect();
    };
  }, [roomId, socket]);

  const sendChat = (message: string) => {
    if (!roomId) return;
    socket.emit("sendChat", message, roomId);
    setChat(""); 
  };

  const disconnectSocket = () => {
    if (isConnected) {
      socket.disconnect();
      setIsConnected(false);
      // console.log("Socket disconnected");
    }
  };

  return {
    chat,
    setChat,
    characters,
    sendChat,
    isConnected,
    disconnectSocket,
  };
};

export default useSocket;
