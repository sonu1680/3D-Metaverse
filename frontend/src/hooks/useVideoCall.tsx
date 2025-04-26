"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Peer from "peerjs";
import { socket } from "@/lib/socket";
import { peerIdAtom } from "@/recoil/videocallAtom";
import { useSetRecoilState, useRecoilState } from "recoil";
import { myVideoState, remoteVideoState } from "@/recoil/videoStore";

interface VideoCallState {
  isCallActive: boolean;
  isConnecting: boolean;
  error: string | null;
}

const useVideoCall = () => {
  const peerRef = useRef<Peer | null>(null);
  //@ts-ignore
  const callRef = useRef<Peer.MediaConnection | null>(null);

  const setPeerIdState = useSetRecoilState(peerIdAtom);
  const [myVideo, setMyVideoStream] = useRecoilState(myVideoState);
  const [remoteVideo, setRemoteStream] = useRecoilState(remoteVideoState);
const oneCall=useRef<boolean|null>(null)
  const [callState, setCallState] = useState<VideoCallState>({
    isCallActive: false,
    isConnecting: false,
    error: null,
  });

  // Initialize media stream
  const initializeLocalStream = useCallback(async () => {
    if (myVideo) return myVideo;

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setMyVideoStream(mediaStream);
      return mediaStream;
    } catch (error) {
      setCallState((prev) => ({
        ...prev,
        error: "Could not access camera or microphone",
      }));
      throw error;
    }
  }, [setMyVideoStream]);

  // Handle incoming call
  const handleIncomingCall = useCallback(
    //@ts-ignore

    async (call: Peer.MediaConnection) => {
      try {
        setCallState((prev) => ({ ...prev, isConnecting: true, error: null }));

        const stream = await initializeLocalStream();
        call.answer(stream);
        callRef.current = call;

        call.on("stream", (remoteStream: any) => {
          setRemoteStream(remoteStream);
          setCallState((prev) => ({
            ...prev,
            isCallActive: true,
            isConnecting: false,
            error: null,
          }));
        });

        call.on("close", () => {
          handleCallEnded();
        });

        call.on("error", (err: any) => {
          setCallState((prev) => ({
            ...prev,
            error: "Call error: " + err.message,
            isConnecting: false,
          }));
        });
      } catch (error) {
        setCallState((prev) => ({
          ...prev,
          isConnecting: false,
          error: "Failed to answer call",
        }));
      }
    },
    [initializeLocalStream, setRemoteStream]
  );

  useEffect(() => {
    if (peerRef.current) return;

    try {
      const newPeer = new Peer({
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            {
              urls: "turn:turn.anyfirewall.com:443?transport=tcp",
              username: "webrtc",
              credential: "webrtc",
            },
          ],
        },
      });

      newPeer.on("open", (id) => {
        console.log(id)
        setPeerIdState(id);
      });

      newPeer.on("call", handleIncomingCall);

      newPeer.on("error", (err) => {
        setCallState((prev) => ({
          ...prev,
          error: "Connection error: " + err.message,
        }));
      });

      newPeer.on("disconnected", () => {
        newPeer.reconnect();
      });

      peerRef.current = newPeer;
    } catch (error) {
      setCallState((prev) => ({
        ...prev,
        error: "Failed to initialize connection",
      }));
    }

    return () => {
      cleanupResources();
    };
  }, [handleIncomingCall, setPeerIdState]);

  const callPeer = useCallback(
    
    async (targetPeerId: string) => {
      if (!peerRef.current) {
        setCallState((prev) => ({
          ...prev,
          error: "Connection not initialized",
        }));
        return;
      }

      try {
        setCallState((prev) => ({ ...prev, isConnecting: true, error: null }));

        const stream = await initializeLocalStream();
        const call = peerRef.current.call(targetPeerId, stream);
        callRef.current = call;

        call.on("stream", (remoteStream) => {
          setRemoteStream(remoteStream);
          setCallState((prev) => ({
            ...prev,
            isCallActive: true,
            isConnecting: false,
          }));
        });

        call.on("close", () => {
          handleCallEnded();
        });

        call.on("error", (err) => {
          setCallState((prev) => ({
            ...prev,
            error: "Call error: " + err.message,
            isConnecting: false,
          }));
        });

        const timeout = setTimeout(() => {
          if (!remoteVideo && callRef.current === call) {
            setCallState((prev) => ({
              ...prev,
              isConnecting: false,
              error: "Call not answered",
            }));
            call.close();
            callRef.current = null;
          }
        }, 30000);

        call.on("stream", () => clearTimeout(timeout));
      } catch (error) {
        setCallState((prev) => ({
          ...prev,
          isConnecting: false,
          error: "Failed to start call",
        }));
      }
    },
    [initializeLocalStream, remoteVideo, setRemoteStream]
  );

  const handleCallEnded = useCallback(() => {
    setCallState((prev) => ({
      ...prev,
      isCallActive: false,
      isConnecting: false,
    }));
    setMyVideoStream(null);
    setRemoteStream(null);
  }, [setRemoteStream, setMyVideoStream]);

  // End the active call
  const endCall = useCallback(() => {
    if (callRef.current) {
      callRef.current.close();
      callRef.current = null;
    }

    stopLocalStream();
    handleCallEnded();

    // Notify the other peer
    socket.emit(
      "videoCall",
      JSON.stringify({
        type: "endCall",
      })
    );

  }, [handleCallEnded]);

  // Stop local media stream
  const stopLocalStream = useCallback(() => {
    if (myVideo) {
      myVideo.getTracks().forEach((track) => track.stop());
      setMyVideoStream(null);
    }
  }, [setMyVideoStream]);

  // Clean up all resources
  const cleanupResources = useCallback(() => {
    // End any active call
    if (callRef.current) {
      callRef.current.close();
      callRef.current = null;
    }

    stopLocalStream();
    setMyVideoStream(null)
    setRemoteStream(null);

    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }

    setCallState({
      isCallActive: false,
      isConnecting: false,
      error: null,
    });
  }, [setRemoteStream, stopLocalStream]);

  // Handle socket events
  useEffect(() => {
    const handleSocketMessage = (msg: string) => {
      try {
        const data = JSON.parse(msg);
        switch (data.type) {
          case "callData":
            if (oneCall.current && oneCall.current===true) return
              if (data?.peerId) {
                callPeer(data.peerId);
                if(oneCall.current){

                  oneCall.current = true;
                }
              }
            break;
          case "endCall":
            endCall();
             if (oneCall.current) {
               oneCall.current = false;
             }
            break;
        }
      } catch (error) {
      }
    };

    socket.on("videoCall", handleSocketMessage);

    return () => {
      socket.off("videoCall", handleSocketMessage);
    };
  }, [callPeer, endCall]);

  return {
    callPeer,
    endCall,
   
  };
};

export default useVideoCall;
