// import { socket } from "@/lib/socket";
// import { videRoomAtom } from "@/recoil/roomId";
// import { myVideoState, remoteVideoState } from "@/recoil/videoStore";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useRecoilState, useSetRecoilState } from "recoil";
// const useCall = () => {
//   const me = useRef<RTCPeerConnection | null>(null);
//   // const room = "123";
//   // const [myVideo, setMyVideo] = useState<MediaStream | null>(null);
//   // const [remoteVideo, setRemoteVideo] = useState<MediaStream | null>(null);
//   const [myVideo, setMyVideo] = useRecoilState(myVideoState);
//   const [remoteVideo, setRemoteVideo] = useRecoilState(remoteVideoState);
//   const setVideoroomId = useSetRecoilState(videRoomAtom);
//   const callRef = useRef<any>(null);
//   const setupConnectionEvents = (peer: RTCPeerConnection) => {
//     peer.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit(
//           "videoCall",
//           JSON.stringify({
//             type: "iceCandidate",
//             candidate: event.candidate,
//             room: callRef.current.roomId,
//           })
//         );
//       }
//     };

//     peer.ontrack = (event) => {
//       setRemoteVideo(event.streams[0]);
//     };
//   };

//   const startStream = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setMyVideo(stream);
//       if (!me.current) return;

//       stream
//         .getTracks()
//         .forEach((track) => me.current!.addTrack(track, stream));
//     } catch (error) {
//       // console.error("Error accessing media devices:", error);
//     }
//   };

//   const callFun = async () => {
//     me.current = new RTCPeerConnection();
//     setupConnectionEvents(me.current);
//     await startStream();

//     const offer = await me.current.createOffer();
//     await me.current.setLocalDescription(offer);
//     socket.emit(
//       "videoCall",
//       JSON.stringify({
//         type: "createOffer",
//         sdp: me.current.localDescription,
//         room: callRef.current.roomId,
//       })
//     );
//   };

//   const endCall = async () => {
//     console.log('call ended')
//     if (me.current) {
//       me.current.close();
//       me.current = null;
//     }
//     callRef.current = null;
//     if (myVideo) {
//       myVideo.getTracks().forEach((track) => {
//         track.stop();
//       });
//       setMyVideo(null);
//     }

//     if (remoteVideo) {
//       remoteVideo.getTracks().forEach((track) => {
//         track.stop();
//       });
//       setRemoteVideo(null);
//     }
//   };

//   useEffect(() => {
//     if (!socket.connected) {
//       socket.connect();
//       socket.on("connect", () => {});
//     }

//     socket.on("videoCall", async (msg) => {
//       if (!me.current) {
//         me.current = new RTCPeerConnection();
//         setupConnectionEvents(me.current);
//       }

//       const data = JSON.parse(msg);
//       switch (data.type) {
//         case "callData":
//           if (callRef.current === null) {
//             callRef.current = data;
//             setVideoroomId(callRef.current.roomId);
//             socket.emit(
//               "videoCall",
//               JSON.stringify({
//                 type: "register",
//                 room: callRef.current.roomId,
//               })
//             );
//           }

//           break;
//         case "createOffer":
//           //after getting offer setting the offer in local and acreating answer
//           await me.current.setRemoteDescription(data.sdp);
//           await startStream();
//           const answer = await me.current.createAnswer();
//           await me.current.setLocalDescription(answer);

//           socket.emit(
//             "videoCall",
//             JSON.stringify({
//               type: "answerOffer",
//               sdp: me.current.localDescription,
//               room: callRef.current.roomId,
//             })
//           );

//           break;

//         case "answerOffer":
//           await me.current.setRemoteDescription(data.sdp);

//           break;

//         case "iceCandidate":
//           if (me.current) {
//             await me.current.addIceCandidate(data.candidate);
//           }
//           break;
//         case "endCall":
//           console.log('effect end call')
//           endCall();
//           break;
//         default:
//           null;
//           break;
//       }
//     });
//     const cleanupRTC = () => {
//       if (me.current) {
//         me.current.close();
//         me.current = null;
//         endCall();
//       }
//     };

//     //clean up function
//     const cleanupSocket = () => {
//       if (socket) {
//         socket.off("videoCall");
//       }
//     };
//     return () => {
//       cleanupRTC();
//       cleanupSocket();
//     };
//   }, []);

//   ///call the receiver
//   useEffect(() => {
//     if (callRef.current) {
//       if (callRef.current.receiver === socket.id) {
//         callFun();
//       } 
//     }
//   }, [callRef.current]);

//   return { callFun, remoteVideo, myVideo, endCall };
// };

// export default useCall;
