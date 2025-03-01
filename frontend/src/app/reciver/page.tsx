"use client";
import useReceiveVideoCall from "@/hooks/useReceiveVideoCall";
import React  from "react";

const page = () => {
    const { handleReceive, remoteVideo, myVideo } = useReceiveVideoCall();

  return (
    <>
      <div>reciver</div>
      <div className="c w-96 h-96 p-2 bg-blue-400">
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
      <button className="p-10 bg-red-400 rounded-lg" onClick={handleReceive}>
        sender
      </button>
    </>
  );
};

export default page;
