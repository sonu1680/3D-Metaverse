"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
const router=useRouter()

const generateRandomRoomId = (): void => {
    console.log('join press')
  const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result: string = "";
  for (let i: number = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  router.push(`/game/${result}`); 
};


  return (
    <div className="w-screen h-[100vh] bg-red-400 mt-40 ">
  
      <button className="p-2 bg-green-400" onClick={generateRandomRoomId}>room </button>
    </div>
  );
};

export default page;
