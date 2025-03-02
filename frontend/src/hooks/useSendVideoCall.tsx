import { socket } from "@/lib/socket";
import React, { useEffect, useRef } from "react";

const useSendVideoCall = () => {
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const myVideo = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    //to recive video from remote
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("videoCall", {
          type: "receiverIce",
          ice: e.candidate,
          peerid: "rahul",
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
            peerid: "rahul",
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
      //  socket.disconnect();
      pc.close();
    };
  }, []);
  let stream: MediaStream;
  //to send video to remote user
  const handleSend = async () => {
    let pc = new RTCPeerConnection();
    console.log("sendvideo");
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("videoCall", {
          type: "senderIce",
          ice: e.candidate,
          peerid: "rahul",
        });
      }
    };
    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("videoCall", {
        type: "createOffer",
        sdp: pc.localDescription,
        peerid: "rahul",
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

    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    pc.addTrack(stream.getVideoTracks()[0]);
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
      peerid: "rahul",
    });
  };
  return { handleSend, remoteVideo, myVideo, endcall };
};

export default useSendVideoCall;
