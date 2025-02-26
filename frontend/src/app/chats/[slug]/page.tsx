"use client";

import { characterAtom, userAtom } from "@/recoil/char";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import useSocket from "@/hooks/useSocket";

const Page = ({ params }: any) => {


  return (
    <div className="w-screen h-[100vh] bg-red-400 mt-40 ">
      {/* <input
        type="text"
        placeholder="chat"
        value={chat}
        onChange={(e) => setChat(e.target.value)}
      />
      <button className="p-2 bg-green-400" onClick={() => sendChat(chat)}>
        submit
      </button>
      <button className="p-2 bg-green-400" onClick={disconnectSocket}>
        disconnect
      </button> */}
    </div>
  );
};

export default Page;
