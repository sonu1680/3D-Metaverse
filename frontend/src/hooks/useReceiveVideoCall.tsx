import React, { useEffect, useRef } from "react";
import useSendVideo from "./useSendVideoCall";
import { socket } from "@/lib/socket";

const useReceiveVideoCall = () => {
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const myVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("videoCall", { type: "register", peerid: "rahul" });

    //to reciver video from remote
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("videoCall", {
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

    socket.on("videoCall", async (msg) => {
      const data = msg;
      switch (data.type) {
        case "createOffer":
          pc.setRemoteDescription(data.sdp);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("videoCall", {
            type: "answerOffer",
            sdp: pc.localDescription,
            peerid: "sonu",
          });
          break;
        case "senderIce":
          pc.addIceCandidate(data.ice);
          break;
        case "endCall":
          pc.close();
          break;
      }
    });

    return () => {
      // socket.disconnect();
      pc.close();
    };
  }, []);

  //to send video to remote user

  let stream: MediaStream;
  const handleReceive = async () => {
    const pc = new RTCPeerConnection();
    console.log("reciver video");
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("videoCall", {
          type: "senderIce",
          ice: e.candidate,
          peerid: "sonu",
        });
      }
    };
    //whenever new videoSource found resend offer
    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("videoCall", {
        type: "createOffer",
        sdp: pc.localDescription,
        peerid: "sonu",
      });
    };

    socket.on("videoCall", async (msg) => {
      const data = msg;
      switch (data.type) {
        case "answerOffer":
          await pc.setRemoteDescription(data.sdp);
          break;

        case "receiverIce":
          if (pc.signalingState !== "closed") {
            await pc.addIceCandidate(data.ice);
          }
          break;
        case "endCall":
          pc.close();
          break;
      }
    });
    //to get feed form camer or screen
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    //adding video to webrtc track
    pc.addTrack(stream.getVideoTracks()[0]);
console.log(stream.getVideoTracks());
    if (myVideo.current) {
      myVideo.current.srcObject = stream;
      myVideo.current.play();
    }
  };
  const endcall = async () => {
    stream.getVideoTracks()[0].stop();
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }
    socket.emit("videoCall", {
      type: "endCall",
      peerid: "sonu",
    });
  };
  return { handleReceive, remoteVideo, myVideo, endcall };
};

export default useReceiveVideoCall;
