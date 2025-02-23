"use client";
import React from "react";
import Image from "next/image";

import { motion } from "motion/react";
import AnimatedSphere from "../AnimatedSphere";
import { TextAnimate } from "../magicui/text-animate";
import BuyButton from "../BuyButton";
import PolygonBox from "../PolygonBox";

const Intro = () => {
  return (
    <AnimatedSphere>
      <div className="flex flex-col items-center relative px-4   ">
        <TextAnimate
          animation="blurInUp"
          by="character"
          className="md:-mt-10  font-extrabold  text-[50px] sm:text-[100px] md:text-[150px] lg:text-[200px] xl:text-[250px]"
        >
          FROGCOIN
        </TextAnimate>
        <Image
          src="/images/3.png"
          alt="Frog illustration"
          height={500}
          width={500}
          className="absolute  top-2 w-[35%] md:w-[40%] h-auto object-contain"
        />
        <PolygonBox className="w-[50%] max-w[800px] sm:w-[70%] md:w-[55%] py-4 h-[200px] md:h-[200px] lg:h-[270px] gap-4 md:gap-6 flex flex-col md:flex-row justify-between items-center px-[5%]  mt-28 md:mt-24 lg:mt-32">
          <div className="flex flex-col justify-start items-center text-2xl md:text-2xl lg:text-3xl font-extrabold">
            <span>YOU WILL HODL</span>
            <span>THE WAY YOU LOVE FROG.</span>
          </div>
          <div>
            <BuyButton title={"BUY FROGCOIN"} />
          </div>
        </PolygonBox>
      </div>
    </AnimatedSphere>
  );
};

export default Intro;
