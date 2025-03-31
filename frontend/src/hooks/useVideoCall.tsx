// import React, { useEffect, useRef, useState } from "react";
// import Peer from "peerjs";
// import { useRecoilState } from "recoil";
// import { myVideoState, remoteVideoState } from "@/recoil/videoStore";
// import { socket } from "@/lib/socket";

// const useVideoCall: React.FC = () => {
//   const callRef = useRef<any>(null);
// console.log("videocall")
//   const [myVideo, setMyVideo] = useRecoilState(myVideoState);
//   const [remoteVideo, setRemoteVideo] = useRecoilState(remoteVideoState);
//   const [peerId, setPeerId] = useState<string>("");
//   const [remoteId, setRemoteId] = useState<string>("");
//   const [peer, setPeer] = useState<InstanceType<typeof Peer> | null>(null);
//   //@ts-ignore

//   const [callInstance, setCallInstance] = useState<Peer.MediaConnection | null>(
//     null
//   );
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//        if (!socket.connected) {
//          socket.connect();
//          socket.on("connect", () => {});
//        }

//     socket.on("videoCall", async (msg) => {
//       const data = JSON.parse(msg);
//       switch (data.type) {
//         case "callData":
//             console.log(data)
//           if (callRef.current === null) {
//             callRef.current = data;
//             socket.emit(
//               "videoCall",
//               JSON.stringify({
//                 type: "register",
//                 room: callRef.current.roomId,
//               })
//             );
//           }
//           break;
//       }

      
//     });

//     const newPeer = new Peer();

//     newPeer.on("open", (id: string) => {
//       setPeerId(id);
//     });
//     //@ts-ignore
//     newPeer.on("call", (call: Peer.MediaConnection) => {
//       navigator.mediaDevices
//         .getDisplayMedia({ video: true, audio: true })
//         .then((stream) => {
//           if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//           call.answer(stream);
//           setCallInstance(call);
//           call.on("stream", (remoteStream: any) => {
//             if (remoteVideoRef.current)
//               remoteVideoRef.current.srcObject = remoteStream;
//           });
//         });
//     });

//     setPeer(newPeer);

//     return () => newPeer.destroy();
//   }, []);

//   const callPeer = () => {
//     if (!peer || !remoteId) return;
//     navigator.mediaDevices
//       .getDisplayMedia({ video: true, audio: true })
//       .then((stream) => {
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//         const call = peer.call(remoteId, stream);
//         setCallInstance(call);
//         call.on("stream", (remoteStream) => {
//           if (remoteVideoRef.current)
//             remoteVideoRef.current.srcObject = remoteStream;
//         });
//       });
//   };

//   const endCall = () => {
//     if (callInstance) {
//       callInstance.close();
//       setCallInstance(null);
//       if (localVideoRef.current?.srcObject) {
//         (localVideoRef.current.srcObject as MediaStream)
//           .getTracks()
//           .forEach((track) => track.stop());
//       }
//       if (remoteVideoRef.current?.srcObject) {
//         (remoteVideoRef.current.srcObject as MediaStream)
//           .getTracks()
//           .forEach((track) => track.stop());
//       }
//     }
//   };

//   return (
//     <div className="p-5 text-center">
//       <h1 className="text-xl font-bold">PeerJS Video Call</h1>
//       <p className="my-2">Your ID: {peerId}</p>
//       <input
//         type="text"
//         placeholder="Enter Remote Peer ID"
//         value={remoteId}
//         onChange={(e) => setRemoteId(e.target.value)}
//         className="border p-2 rounded"
//       />
//       <button
//         onClick={callPeer}
//         className="ml-2 bg-blue-500 text-white p-2 rounded"
//       >
//         Call
//       </button>
//       <button
//         onClick={endCall}
//         className="ml-2 bg-red-500 text-white p-2 rounded"
//       >
//         End Call
//       </button>
//       <div className="grid grid-cols-2 gap-4 mt-5">
//         <video
//           ref={localVideoRef}
//           autoPlay
//           playsInline
//           className="w-full border rounded"
//         />
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           playsInline
//           className="w-full border rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default useVideoCall;
