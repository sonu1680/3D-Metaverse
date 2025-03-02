import { socket } from "@/lib/socket";
import React, { useEffect, useRef } from "react";

const useCall = () => {
  const me = useRef<RTCPeerConnection|null>(null);
  const room = "123";
  const myVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.on("connect", () => {
        socket.emit(
          "videoCall",
          JSON.stringify({
            type: "register",
            room: room,
          })
        );
      });
    }

    socket.on("videoCall", async (msg) => {
      if (!me.current) {
        me.current = new RTCPeerConnection();
        setupConnectionEvents(me.current);
      }

      const data = JSON.parse(msg);
      switch (data.type) {
        case "createOffer":
          console.log("inside createOffer");
          //after geeting offer setting the offer in local and acreating answer
          await me.current.setRemoteDescription(data.sdp);
          await startStream();
          const answer = await me.current.createAnswer();
          await me.current.setLocalDescription(answer);

          socket.emit(
            "videoCall",
            JSON.stringify({
              type: "answerOffer",
              sdp: me.current.localDescription,
              room: room,
            })
          );

          break;

        case "answerOffer":
          console.log("inside answer offer", me, data);
          await me.current.setRemoteDescription(data.sdp);

          break;

        case "iceCandidate":
          if (me.current) {
            await me.current.addIceCandidate(data.candidate);
          }
          break;
      }
    });
  }, []);

  const setupConnectionEvents = (peer: RTCPeerConnection) => {
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit(
          "videoCall",
          JSON.stringify({
            type: "iceCandidate",
            candidate: event.candidate,
            room,
          })
        );
      }
    };

    peer.ontrack = (event) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = event.streams[0];
        remoteVideo.current.play();
      }
    };
  };

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (!me.current) return;

      stream
        .getTracks()
        .forEach((track) => me.current!.addTrack(track, stream));

      if (myVideo.current) {
        myVideo.current.srcObject = stream;
        myVideo.current.play();
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const callFun = async () => {
    console.log("click function");
    me.current = new RTCPeerConnection();
    setupConnectionEvents(me.current);
    await startStream();

    const offer = await me.current.createOffer();
    await me.current.setLocalDescription(offer);
    socket.emit(
      "videoCall",
      JSON.stringify({
        type: "createOffer",
        sdp: me.current.localDescription,
        room: room,
      })
    );
  };

  const endCall=async()=>{
    if(me.current){
         me.current.close()
         me.current=null


    }
  }
  return { callFun, remoteVideo, myVideo, endCall };
};

export default useCall;
