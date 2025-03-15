import { socket } from "@/lib/socket";
import { myVideoState, remoteVideoState } from "@/recoil/videoStore";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
const useCall = () => {
  const me = useRef<RTCPeerConnection | null>(null);
  const room = "123";
  // const [myVideo, setMyVideo] = useState<MediaStream | null>(null);
  // const [remoteVideo, setRemoteVideo] = useState<MediaStream | null>(null);
  const [myVideo, setMyVideo] = useRecoilState(myVideoState);
  const [remoteVideo, setRemoteVideo] = useRecoilState(remoteVideoState);

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
          //after getting offer setting the offer in local and acreating answer
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
          await me.current.setRemoteDescription(data.sdp);

          break;

        case "iceCandidate":
          if (me.current) {
            await me.current.addIceCandidate(data.candidate);
          }
          break;
        case "endCall":
          await endCall();
          break;
        default:
          null;
          break;
      }
    });
    const cleanupRTC = () => {
      if (me.current) {
        me.current.close();
        me.current = null;
      }
    };

    //clean up function
    const cleanupSocket = () => {
      if (socket) {
        socket.off("videoCall");
      }
    };
    return () => {
      cleanupRTC();
      cleanupSocket();
    };
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
      setRemoteVideo(event.streams[0]);
    };
  };

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyVideo(stream);
      console.log("stream");
      if (!me.current) return;

      stream
        .getTracks()
        .forEach((track) => me.current!.addTrack(track, stream));
    } catch (error) {
      // console.error("Error accessing media devices:", error);
    }
  };

  const callFun = async () => {
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

  const endCall = async () => {
    if (me.current) {
      me.current.close();
      me.current = null;
    }

    if (myVideo) {
      myVideo.getTracks().forEach((track) => {
        track.stop();
      });
      setMyVideo(null);
    }

    if (remoteVideo) {
      remoteVideo.getTracks().forEach((track) => {
        track.stop();
      });
      setRemoteVideo(null);
    }
  };

  return { callFun, remoteVideo, myVideo, endCall };
};

export default useCall;
