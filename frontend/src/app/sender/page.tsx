"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
export const socket = io("http://localhost:3001", { autoConnect: false });

const page = () => {
  const myVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit("msg", { type: "sender" });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = async () => {
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("msg", { type: "senderIce", ice: e.candidate });
      }
    };
    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("msg", { type: "createOffer", sdp: pc.localDescription });
    };

    socket.on("msg", async (msg) => {
      const data = msg;
      switch (data.type) {
        case "answerOffer":
          await pc.setRemoteDescription(data.sdp);
          break;

        case "receiverIce":
          pc.addIceCandidate(data.ice);
      }
    });

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    pc.addTrack(stream.getVideoTracks()[0]);

     if (myVideo.current) {
       myVideo.current.srcObject = stream;
       myVideo.current.play();
     }
  };
  // const getMedia = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getDisplayMedia({
  //       video: true,
  //       audio: false,
  //     });
  //     if (myVideo.current) {
  //       myVideo.current.srcObject = stream;
  //       myVideo.current.play();
  //     }
  //   } catch (error) {
  //     console.error("Error accessing media devices.", error);
  //   }
  // };

  return (
    <>
      <button className="p-10 bg-red-400 rounded-lg" onClick={handleSend}>
        sender
      </button>

    
      <video
        className="h-96 w-96 bg-red-500"
        ref={myVideo}
        autoPlay
        playsInline
      />
    </>
  );
};

export default page;
