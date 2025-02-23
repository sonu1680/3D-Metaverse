'use client'
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import BuyButton from "../BuyButton";

const WhatIsFrog = () => {
  return (
    <div className="container w-full  grid grid-cols-1 lg:pl-20 md:grid-cols-6">
      <div className="left w-full col-span-1 relative  ">
        {/* Image only visible on larger screens */}
        <motion.div
          className="img hidden lg:flex w-[200%] left-10 z-20 absolute  h-auto "
          animate={{ y: [0, -40, 0] }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src={"/images/4.png"}
            width={1000}
            height={1000}
            alt={"ee"}
            className=" "
          />
        </motion.div>
      </div>

      <div className="right w-full col-span-5  ">
        <div
          className="w-[99%] md:w-[75%] overflow-visible pl-[15%] pr-10 flex justify-center flex-col items-center bg-gradient-to-b from-[#266121] to-[#327d2c]/90 rounded-sm shadow-xl py-10"
          style={{
            clipPath:
              "polygon(100% 0, 100% 25%, 100% 100%, 8% 100%, 0% 100%, 10% 0)",
          }}
        >
          {/* Image visible only on small screens */}
          <motion.div
            className="img lg:hidden w-[80%] h-auto "
            initial={{ y: 0 }}
            animate={{ y: [0, -40, 0] }}
            transition={{
              duration: 4,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Image
              src={"/images/4.png"}
              width={500}
              height={500}
              alt={"ee"}
              className=""
            />
          </motion.div>

          <span className="text-[34px] lg:text-[100px] font-extrabold">
            WHAT’S
          </span>
          <span className="text-[34px] lg:text-[100px] font-extrabold">
            FROGCOIN?
          </span>
          <span className="text-[18px] lg:text-[30px] font-normal">
            FrogCoin brings our love for frogs into Web3! Like a frog’s leap,
            the chart can jump at any moment.
          </span>
          <span className="py-4">
            <BuyButton title={'BUY FROGCOIN'} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default WhatIsFrog;
