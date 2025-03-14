import { socket } from "@/lib/socket";
import { userAtom } from "@/recoil/char";
import { chatAtom } from "@/recoil/chat";
import { chatTypes } from "@/types/chatTypes";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const useSocket = (roomId: string) => {
  const [chat, setChat] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [characters, setCharacters] = useState<any[]>([]);
  const setUser = useSetRecoilState(userAtom);
const setChatMessages = useSetRecoilState<chatTypes[]>(chatAtom);
  useEffect(() => {
     if (!roomId) return;
    if (!socket.connected) {

      socket.connect();

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
      socket.on("chatHistory", (msg: string) => {
          const data = JSON.parse(msg);
          console.log('chathistory',data);
                setChatMessages(data);

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
