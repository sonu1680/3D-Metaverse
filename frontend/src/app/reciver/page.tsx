"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
export const socket = io("http://localhost:3001", { autoConnect: false });

const page = () => {
  const remoteVideo = useRef<HTMLVideoElement>(null);
    const myVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("msg", { type: "register",peerid:'rahul'});

    //to reciver video from remote
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("msg", {
          type: "receiverIce",
          ice: e.candidate,
          peerid: "sonu",
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
          socket.emit("msg", {
            type: "answerOffer",
            sdp: pc.localDescription,
            peerid: "sonu",
          });
          break;
        case "senderIce":
          pc.addIceCandidate(data.ice);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);


//to send video to remote user
  const handleSend = async () => {
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("msg", {
          type: "senderIce",
          ice: e.candidate,
          peerid: "sonu",
        });
      }
    };
    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("msg", {
        type: "createOffer",
        sdp: pc.localDescription,
        peerid: "sonu",
      });
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




  return (
    <>
      <div>reciver</div>
      <div className="c w-96 h-96 p-2 bg-blue-400">
        <video
          className="h-40 w-40 bg-red-500"
          ref={remoteVideo}
          autoPlay
          playsInline
        />
        <h2>my video</h2>
        <video
          className="h-40 w-40 bg-yellow-500"
          ref={myVideo}
          autoPlay
          playsInline
        />
      </div>
      <button className="p-10 bg-red-400 rounded-lg" onClick={handleSend}>
        sender
      </button>
    </>
  );
};

export default page;
