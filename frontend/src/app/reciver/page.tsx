"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
export const socket = io("http://localhost:3001", { autoConnect: false });

const page = () => {
  const remoteVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("msg", { type: "receiver" });
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("msg", {
          type: "receiverIce",
          ice: e.candidate,
        });
      }
    };

    pc.ontrack = (e) => {

      if (remoteVideo.current) {
        remoteVideo.current.srcObject = new MediaStream([e.track]);
        remoteVideo.current.play();
      }
    };

    socket.on("msg", async (msg) => {
      const data = msg;
      switch (data.type) {
        case "createOffer":
          pc.setRemoteDescription(data.sdp);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("msg", { type: "answerOffer", sdp: pc.localDescription });
          break;
        case "senderIce":
          pc.addIceCandidate(data.ice);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <div>reciver</div>
   
      <video
        className="h-96 w-96 bg-red-500"
        ref={remoteVideo}
        autoPlay
        playsInline
      />
    </>
  );
};

export default page;
