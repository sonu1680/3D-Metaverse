'use client'
import React from "react";
import PhaseCard from "../section4/PhaseCard";
import Image from "next/image";
import FrogCarosel from "../section2/FrogCarosel";
import { motion } from "motion/react";

const questions = [
  {
    title1: "Launch FrogCoin",
    title2: "UniSwap Listing",
    phase: "phase 01",
  },
  {
    title1: "Website Launch",
    title2: "Coinmarketcap Listing",
    phase: "phase 02",
  },
  {
    title1: "FrogCoin Events",
    title2: "Eco Development",
    phase: "phase 03",
  },
  {
    title1: "FrogSwap Launch",
    title2: "Marketplace Launch",
    phase: "phase 04",
  },
];

const Phases = () => {
  return (
    <>
     
      {/* Roadmap Section */}

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-8 w-full px-5    bg-bggreen  justify-items-center relative pt-10 -mt-24 md:-mt-40 lg:-mt-96">
        {/* Vertical "ROADMAP" Text */}
        <div className="uppercase text-center text-5xl lg:text-9xl py-5 font-extrabold col-span-2 border-white lg:border-r-2 border-dashed flex justify-center items-end lg:px-20 lg:writing-sideways-lr w-full">
          <div>Roadmap</div>
        </div>
        {/* Phase Cards */}
        <div className="space-y-10 w-full col-span-6 flex flex-col justify-center items-center py-4">
          {questions.map((question, index) => (
            <PhaseCard
              title1={question.title1}
              title2={question.title2}
              phase={question.phase}
              id={index+1}
              key={index}
            />
          ))}
        </div>
      </div>
      {/* Frog Carousel Section */}
      <div className="w-full flex flex-col justify-center items-center relative py-[250px]  md:py-[450px] lg:py-[500px] ">
        <motion.div
          className="w-auto h-auto flex justify-center items-center absolute -top-2 z-30 lg:-top-10 lg:left-56 "
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{
            duration: 6,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src="/images/1.png"
            alt="Frog illustration"
            height={1000}
            width={1000}
            className="w-[250px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-auto"
          />
        </motion.div>
        <FrogCarosel />
      </div>
    </>
  );
};

export default Phases;
