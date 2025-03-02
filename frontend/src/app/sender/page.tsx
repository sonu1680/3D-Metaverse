"use client";
import useCall from "@/hooks/useCall";
import useSendVideoCall from "@/hooks/useSendVideoCall";
import React, { useState } from "react";

const page = () => {

  const { callFun,myVideo,remoteVideo,endCall} = useCall();
  return (
    <>
      <button className="p-10 bg-red-400 rounded-lg" onClick={callFun}>
        sender
      </button>

      <button className="p-10 bg-red-400 rounded-lg" onClick={endCall}>
        end call
      </button>
      <div className="c w-96 h-96 p-2 bg-blue-400">
        <h2>remote video</h2>
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
    </>
  );
};

export default page;
