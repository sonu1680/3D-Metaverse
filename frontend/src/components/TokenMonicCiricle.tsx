'use client'
import React from 'react'
import { motion } from "motion/react";
import clsx from 'clsx';

interface type{
className?:string,
direction:[number,number ,number],
value:number,
title:string
}

const TokenMonicCiricle = ({ className, direction,value,title }: type) => {
  return (
    <div
      className={clsx(
        "bg-yellow-400 text-xl font-semibold capitalize overflow-hidden  sm:w-48 lg:w-96  relative  flex justify-center items-center",
        className
      )}
    >
      <motion.div
        className="bg-[url('/images/background.jpg')] w-[1000px] h-[1000px] absolute z-10"
        animate={{
          x: direction,
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      <div className="layer bg-bggreen/80 w-full h-full gap-y-10 flex justify-center items-center flex-col absolute z-30">
        <span className="text-3xl lg:text-5xl font-extrabold text-white">
          {value}%
        </span>
        <span className="text-white text-2xl lg:text-3xl font-semibold">
          {title}
        </span>
      </div>
    </div>
  );
};

export default TokenMonicCiricle