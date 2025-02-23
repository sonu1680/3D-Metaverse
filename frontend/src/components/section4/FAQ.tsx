'use client'
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import Details from "../section4/Details";

const FAQ = () => {
  const questions = [
    {
      title: "WHAT IS FROGCOIN?",
      content:
        "FrogCoin brings our love for frogs into Web3! It is all about showcasing our passion for frogs.",
    },
    {
      title: "WHAT'S THE TOTAL SUPPLY?",
      content:
        "FrogCoin's total supply is capped at 1 trillion tokens, ensuring scarcity and value stability.",
    },
    {
      title: "HOW CAN I BUY FROGCOIN?",
      content:
        "You can buy FrogCoin on decentralized exchanges such as UniSwap and other supported platforms. Be sure to have ETH in your wallet.",
    },
    {
      title: "IS FROGCOIN SAFE TO INVEST IN?",
      content:
        "Like any cryptocurrency, investing in FrogCoin carries risks. We recommend conducting research and investing what you can afford to lose.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };



  return (
    <div className="w-full mx-auto p-4 lg:px-32  bg-white lg:overflow-hidden ">
      <div className="title  flex justify-center items-start  flex-col lg:px-20 ">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:4xl lg:5xl font-extrabold mb-4 text-black "
        >
          QUESTIONS?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl mb-12 text-gray-700"
        >
          Thoughts on your mind about FrogCoin?
        </motion.p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:px-20  "
      >
        {questions.map((question, index) => (
          <Details question={question} />
        ))}
      </motion.div>
      <div className=" w-full relative  flex justify-center items-center md:right-16 md:-top-14   ">
        <Image
          src={"/images/5.png"}
          alt={"Token"}
          width={1200}
          height={1200}
          className="rounded-full w-56 md:w-72 lg:w-[450px] xl:w-[700px]  "
        />

        {/* astonutimage point to phases */}
        <motion.div
          className="w-[550px]  h-auto hidden  xl:flex justify-center items-center absolute   z-30 -right-60 bottom-48   "
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{
            duration: 6,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src="/images/6.png"
            alt="Frog illustration"
            height={1000}
            width={1000}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
