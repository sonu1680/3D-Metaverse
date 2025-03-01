import React, { useEffect, useRef } from 'react'
import useSendVideo from './useSendVideoCall';
import { socket } from '@/lib/socket';

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
        }
      });
      // return () => {
      //   socket.disconnect();
      // };
    }, []);

    //to send video to remote user
    const handleReceive= async () => {
      console.log('reciver video')
      const pc = new RTCPeerConnection();
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
            pc.addIceCandidate(data.ice);
        }
      });
      //to get feed form camer or screen
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      //adding video to webrtc track
      pc.addTrack(stream.getVideoTracks()[0]);

      if (myVideo.current) {
        myVideo.current.srcObject = stream;
        myVideo.current.play();
      }
    };

return { handleReceive, remoteVideo, myVideo };
}

export default useReceiveVideoCall