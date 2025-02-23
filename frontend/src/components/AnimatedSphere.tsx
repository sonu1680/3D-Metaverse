"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const AnimatedSphere = ({ children,className }: { children: React.ReactNode,className?:string }) => {
  return (
    <div
      className=
        "relative w-full h-[90%] lg:h-[90%]  flex justify-center items-center overflow-hidden"

    >
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                      w-[200%] sm:w-[130%] h-full 
                      bg-green-500 rounded-b-[80%] sm:rounded-b-[90%] md:rounded-b-[110%] 
                      overflow-hidden"
      >
        <div className="snakeeffect absolute w-full h-full bg-bggreen flex justify-center items-center">
          <motion.div
            className="w-[25%] sm:w-[20%] h-[150%] sm:h-[200%] 
                       bg-white shadow-lg bg-gradient-to-t from-transparent via-white to-white"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </div>
        <div
          className="absolute inset-0 mb-2 
                        bg-[url('/images/background.jpg')] bg-cover bg-center 
                        rounded-b-[80%] sm:rounded-b-[90%] md:rounded-b-[110%] 
                        overflow-hidden"
        >
          <div className="layer bg-gradient-to-b from-bggreen to-bggreen/90 w-full h-full mb-4">
            <div className="w-full bg-[url('/images/background.jpg')] bg-cover bg-center">
              <div className="w-full h-full bg-gradient-to-b from-bggreen to-bggreen/90">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSphere;
