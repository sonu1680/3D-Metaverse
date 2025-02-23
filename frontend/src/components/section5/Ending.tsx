'use client'
import React from 'react'
import Social from '../section5/Social'
import Image from 'next/image';
import {motion} from 'motion/react'
import Marquee from 'react-fast-marquee';
const Ending = () => {
  return (
    <>
      <Social />
      <div className="cont relative">
        <motion.div
          className="w-52 md:w-96 left-10 md:left-40  lg:w-[700px] lg:top-44 lg:left-60 relative top-10 xl:top-72 xl:z-20 h-auto flex justify-center items-center "
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
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

        <Marquee direction="right" speed={70} className="h-auto ">
          {Array(2)
            .fill(3)
            .map((_, idx) => (
              <span
                key={idx}
                className=" text-[100px] md:w-[150px] lg:text-[300px] font-extrabold  "
              >
                FROGCOIN•
              </span>
            ))}
        </Marquee>
      </div>
    </>
  );
}

export default Ending