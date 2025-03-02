import { socket } from "@/lib/socket";
import { userAtom } from "@/recoil/char";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const useSocket = (roomId: string) => {
  const [chat, setChat] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [characters, setCharacters] = useState<any[]>([]);
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
     if (!roomId) return;
    if (!socket.connected) {
      console.log(socket.connected, "bg");

      socket.connect();
      console.log(socket.connected, "agter");

      socket.on("connect", () => {
        socket.emit(
          "videoCall",
          JSON.stringify({
            type: "register",
            peerid: socket.id,
            room: "123",
            issue: "usesocket",
          })
        );
        console.log("useSocket");
      });
    }

    socket.emit(
      "gameData",
      JSON.stringify({ type: "joinGame", roomId: roomId })
    );

    socket.on("gameData", (msg) => {
      const data = JSON.parse(msg);
      switch (data.type) {
        case "isRoomJoined":
          setCharacters(data.characters);
          //@ts-ignore
          setUser(socket.id);
          break;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, socket]);

  const disconnectSocket = () => {
    if (isConnected) {
      socket.disconnect();
      setIsConnected(false);
    }
  };

  return {
    chat,
    setChat,
    characters,
    isConnected,
    disconnectSocket,
  };
};

export default useSocket;
