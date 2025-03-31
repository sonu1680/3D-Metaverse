"use client";
import { socket } from "@/lib/socket";
import { characterAtom, userNameAtom } from "@/recoil/char";
import { chatAtom } from "@/recoil/chat";
import { roomAtom } from "@/recoil/roomId";
import { chatTypes } from "@/types/chatTypes";
import React, { useEffect, useState, FormEvent, useRef, memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface Message {
  id: number;
  text: string;
  sender: string;
  senderName: string;
  timestamp: string;
}

const Chat =memo(() => {
  const roomId = useRecoilValue(roomAtom);
  const [messages, setMessages] = useRecoilState<chatTypes[]>(chatAtom);
  const [newMessage, setNewMessage] = useState<string|null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const charName = useRecoilValue(userNameAtom);
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage?.trim()) return;

    const newMsg: Message = {
      id: messages?.length + 1||0,
      text: newMessage,
      sender: socket.id || "",
      senderName: charName?.name || "",
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
      className={`flex flex-col h-full max-w-full w-full border-2 border-indigo-400 rounded-lg shadow-lg bg-gray-900 overflow-hidden transition-all duration-300 ${
        isExpanded ? "opacity-100" : "opacity-80 hover:opacity-100"
      }`}
      style={{ maxWidth: "20vw" }}
    >
      {/* Gradient header with animation */}
      <div
        className="p-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-t-lg flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-2 shadow-inner">
            <span className="text-xs font-bold text-white">W</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-sm truncate">World Chat</h2>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
            <p className="text-xs text-blue-100 ml-1">Active</p>
          </div>
          <div className="text-xs">
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Message area with better styling and animations */}
      {isExpanded && (
        <>
          <div className="flex-1 p-2 overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-90">
            <div className="space-y-2">
              {messages && messages.length > 0 ? (
                messages.map((message, index) => {
                  const isOwnMessage = message.sender === socket.id;
                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      } animate-fadeIn`}
                    >
                      {!isOwnMessage && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-1 shadow-md">
                          <span className="text-[8px] font-bold text-white">
                            {message.senderName.substring(0, 1).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="max-w-full" style={{ maxWidth: "15vw" }}>
                        <div
                          className={`text-[10px] ${
                            isOwnMessage ? "text-right" : "text-left"
                          } text-gray-400`}
                        >
                          {isOwnMessage ? "You" : message.senderName} •{" "}
                          {formatTime(message.timestamp)}
                        </div>
                        <div
                          className={`p-2 rounded-lg text-xs shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                            isOwnMessage
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
                              : "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 rounded-bl-none"
                          }`}
                          style={{
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                          }}
                        >
                          {message.text}
                        </div>
                      </div>
                      {isOwnMessage && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center ml-1 shadow-md">
                          <span className="text-[8px] font-bold text-white">
                            You
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="w-full flex text-gray-400 text-xs justify-center items-center py-4">
                  <div className="text-center bg-gray-700 bg-opacity-50 p-2 rounded-lg shadow-inner backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mx-auto mb-1 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Chat is empty. Say hello!
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Enhanced input with animation */}
          <form
            onSubmit={handleSendMessage}
            className="p-2 border-t border-indigo-400 flex bg-gray-800 rounded-b-lg"
          >
            <input
              type="text"
              value={newMessage||""}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 bg-gray-700 text-gray-100 border-0 rounded-l-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-0 placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-3 py-2 rounded-r-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
        </>
      )}

      {/* Add some CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
});

export default Chat;
