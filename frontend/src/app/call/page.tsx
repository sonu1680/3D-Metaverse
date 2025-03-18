"use client";
import React, { useEffect, useState, useRef } from "react";
import Peer from "peerjs";

const page = () => {
  const [peerId, setPeerId] = useState("");
  const [connection, setConnection] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [call, setCall] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    // Create a new Peer instance
    const peer = new Peer();

    // Set the peer instance to the ref
    peerInstance.current = peer;

    // Listen for when the peer ID is created
    peer.on("open", (id) => {
      setPeerId(id);
      console.log("My Peer ID: ", id);
    });

    // Listen for incoming calls
    peer.on("call", (incomingCall) => {
      console.log("Incoming call...");

      // Answer the call and send your local stream
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          localVideoRef.current.srcObject = stream;

          incomingCall.answer(stream); // Answer the call with the local stream

          incomingCall.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
            remoteVideoRef.current.srcObject = remoteStream; // Display the remote stream
          });

          setCall(incomingCall);
        })
        .catch((err) => console.error("Error accessing media devices:", err));
    });

    return () => {
      peer.destroy(); // Cleanup peer connection when the component is unmounted
    };
  }, []);

  // Handle making a call to another peer
  const startCall = () => {
    if (remotePeerId) {
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          localVideoRef.current.srcObject = stream;

          const call = peerInstance.current.call(remotePeerId, stream); // Call the remote peer
          call.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
            remoteVideoRef.current.srcObject = remoteStream; // Display the remote stream
          });

          setCall(call);
        })
        .catch((err) => console.error("Error accessing media devices:", err));
    } else {
      console.log("Enter a remote peer ID to call");
    }
  };

  // End the call
  const endCall = () => {
    if (call) {
      call.close();
      setCall(null);
      setRemoteStream(null);
      console.log("Call ended");
    }
  };

  return (
    <div>
      <h2>Your Peer ID: {peerId}</h2>

      <input
        type="text"
        placeholder="Enter peer ID to call"
        value={remotePeerId}
        onChange={(e) => setRemotePeerId(e.target.value)}
      />
      <button onClick={startCall}>Start Call</button>
      <button onClick={endCall}>End Call</button>

      {/* <div>
        <h3>Local Video</h3>
        <video ref={localVideoRef} autoPlay playsInline muted />
      </div> */}

      <div>
        <h3>Remote Video</h3>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
    </div>
  );
};

export default page;
