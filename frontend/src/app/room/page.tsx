'use client'
import React, { useState, useEffect } from "react";
import { Users, UserPlus, Loader2, Copy, Share2 } from "lucide-react";
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";

const page = () => {
  const [activeTab, setActiveTab] = useState("join"); 
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [createdRoomCode, setCreatedRoomCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [roomUrl, setRoomUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
const router=useRouter()
  useEffect(() => {
    if (createdRoomCode) {
      setRoomUrl(
        `${process.env.NEXT_PUBLIC_GAME_JOINUR_LPATH}/${createdRoomCode}`
      );
    }
  }, [createdRoomCode]);

  // Handle joining a room
  const handleJoinRoom = (e:any) => {

    e.preventDefault();
    setError("");

    if (roomCode.length !== 5) {
      setError("Room code must be 5 characters");
      return;
    }

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    setIsLoading(true);
//call api if needed
    setTimeout(() => {
      setIsLoading(false);
      router.replace(`/game/${roomCode}`)
    }, 1000);
  };

  const handleCreateRoom = (e:any) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newRoomCode = Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();
      setCreatedRoomCode(newRoomCode);
      setIsLoading(false);
    }, 100);
  };

  // Copy room code to clipboard
  const copyRoomCode = () => {
    navigator.clipboard.writeText(createdRoomCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Copy room URL to clipboard
  const copyRoomUrl = () => {
    navigator.clipboard.writeText(roomUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Share room URL using Web Share API if available
  const shareRoomUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join my room in Playroom",
        text: `Join my room with code: ${createdRoomCode}`,
        url: roomUrl,
      });
    } else {
      copyRoomUrl();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-sm rounded-lg bg-gray-900 p-6 text-white">
        {/* Logo/Avatar placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-yellow-300 flex items-center justify-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <Users size={32} className="text-yellow-300" />
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`flex-1 py-3 font-bold text-center ${
              activeTab === "join"
                ? "text-pink-500 border-b-2 border-pink-500"
                : "text-gray-400"
            }`}
            onClick={() => {
              setActiveTab("join");
              setCreatedRoomCode("");
            }}
          >
            Join Room
          </button>
          <button
            className={`flex-1 py-3 font-bold text-center ${
              activeTab === "create"
                ? "text-pink-500 border-b-2 border-pink-500"
                : "text-gray-400"
            }`}
            onClick={() => {
              setActiveTab("create");
              setCreatedRoomCode("");
            }}
          >
            Create Room
          </button>
        </div>

        {/* Join room form */}
        {activeTab === "join" && !isLoading && (
          <form onSubmit={handleJoinRoom}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Room Code
              </label>
              <input
                type="text"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none text-center uppercase tracking-widest"
                placeholder="Enter 5-digit code"
                maxLength={5}
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 rounded-md font-bold text-white flex items-center justify-center"
            >
              Join Room
            </button>
          </form>
        )}

        {/* Create room form */}
        {activeTab === "create" && !isLoading && !createdRoomCode && (
          <form onSubmit={handleCreateRoom}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 rounded-md font-bold text-white flex items-center justify-center"
            >
              <UserPlus size={20} className="mr-2" />
              Create New Room
            </button>
          </form>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 size={40} className="text-pink-500 animate-spin mb-4" />
            <p className="text-lg">
              {activeTab === "join" ? "Joining room..." : "Creating room..."}
            </p>
          </div>
        )}

        {/* Room created success state */}
        {activeTab === "create" && createdRoomCode && !isLoading && (
          <div className="flex flex-col items-center">
            <div className="bg-gray-800 p-4 rounded-lg w-full mb-6 text-center">
              <h3 className="text-lg font-bold mb-2">Party maker</h3>
              <p className="text-sm mb-4">Invite friends to play together</p>

              {/* QR Code - dynamic based on room URL */}
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  <div className="w-48 h-48 bg-white p-2">
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={`${roomUrl}/${createdRoomCode}`}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  {/* Click to copy overlay */}
                  <div
                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    onClick={copyRoomUrl}
                  >
                    <div className="text-white text-center">
                      <Copy size={24} className="mx-auto mb-2" />
                      <p className="text-sm">Click to copy link</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room code display */}
              <div className="bg-gray-700 p-3 rounded mb-4">
                <p className="text-xs text-gray-400 mb-1">Room Code</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-bold tracking-widest text-pink-500">
                    {createdRoomCode}
                  </p>
                  <button
                    onClick={copyRoomCode}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                Scan QR code or share the room code
              </p>
            </div>

            <div className="flex gap-3 w-full">
              <button
                className="flex-1 py-3 bg-gray-800 rounded-md font-medium border border-gray-700 flex items-center justify-center"
                onClick={shareRoomUrl}
              >
                <Share2 size={18} className="mr-2" />
                Share Link
              </button>
              <button
                className="flex-1 py-3 bg-pink-500 rounded-md font-medium"
                onClick={() => router.push(`/game/${createdRoomCode}`)}
              >
                Enter Room
              </button>
            </div>

            {copySuccess && (
              <div className="mt-4 text-green-500 text-center">
                Copied to clipboard!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
