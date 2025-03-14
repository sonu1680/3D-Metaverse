"use client";
import { socket } from "@/lib/socket";
import { characterAtom } from "@/recoil/char";
import { chatAtom } from "@/recoil/chat";
import { roomAtom } from "@/recoil/roomId";
import { chatTypes } from "@/types/chatTypes";
import React, { useEffect, useState, FormEvent, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface Message {
  id: number;
  text: string;
  sender: string;
  senderName: string;
  timestamp: string;
}

const Chat = () => {
  const roomId = useRecoilValue(roomAtom);
  const [messages, setMessages] = useRecoilState<chatTypes[]>(chatAtom);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: socket.id || "",
      senderName: socket.id || "",
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    socket.emit("chat", JSON.stringify({ msg: newMsg, room: roomId }));
    setNewMessage("");
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    socket.on("chat", (msg: string) => {
      const data = JSON.parse(msg);
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data.msg]);
    });

    return () => {
      socket.off("chat");
    };
  }, []);

  return (
    <div
      className="flex flex-col h-full max-w-full w-full border rounded-lg shadow-sm bg-gray-50 overflow-hidden"
      style={{ maxWidth: "20vw" }}
    >
      {/* Ultra-compact header */}
      <div className="p-1 bg-blue-600 text-white rounded-t-lg flex items-center">
        <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center mr-1">
          <span className="text-xs font-bold">W</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-xs truncate">World Chat</h2>
        </div>
        <div className="flex items-center">
          <span className="h-1 w-1 bg-green-400 rounded-full"></span>
          <p className="text-xs text-blue-100 ml-1">Active</p>
        </div>
      </div>

      {/* Message area - prevent horizontal scrolling */}
      <div className="flex-1 p-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        <div className="space-y-1">
          {messages.length > 0 ? (
            messages.map((message, index) => {
              const isOwnMessage = message.sender === socket.id;
              return (
                <div
                  key={index}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="max-w-full" style={{ maxWidth: "18vw" }}>
                    <div
                      className={`text-[10px] ${
                        isOwnMessage ? "text-right" : "text-left"
                      } text-gray-500`}
                    >
                      {isOwnMessage ? "You" : message.senderName} •{" "}
                      {formatTime(message.timestamp)}
                    </div>
                    <div
                      className={`p-1 rounded text-xs break-words ${
                        isOwnMessage
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none"
                      }`}
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full flex text-gray-500 text-xs justify-center items-center py-2">
              <div className="text-center">No messages</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Compact input */}
      <form
        onSubmit={handleSendMessage}
        className="p-1 border-t flex bg-white rounded-b-lg"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
          className="flex-1 p-1 border rounded-l text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-0"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-1 py-1 rounded-r hover:bg-blue-700 transition-colors"
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;
