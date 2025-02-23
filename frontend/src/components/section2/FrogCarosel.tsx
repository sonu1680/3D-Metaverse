import React from "react";
import Marquee from "react-fast-marquee";

const FrogCarosel = () => {
  return (
    <div className="w-full h-auto py-20  flex justify-center items-center relative overflow-hidden ">
      <div className="skew-y-6 absolute z-20 w-full ">
        <Marquee
          direction="left"
          speed={100}
          className="h-20 bg-[#38B27A] mb-2 "
        >
          {Array(10)
            .fill(11)
            .map((_, idx) => (
              <span key={idx} className="text-3xl font-extrabold px-10 py-5   ">
                FROGCOIN
              </span>
            ))}
        </Marquee>
      </div>
      <div className=" -skew-y-6 w-full ">
        <Marquee direction="right" speed={100} className="h-20 bg-[#E3FF10]">
          {Array(10)
            .fill(11)
            .map((_, idx) => (
              <span key={idx} className="text-3xl font-extrabold px-10 py-5  ">
                FROGCOIN
              </span>
            ))}
        </Marquee>
      </div>
    </div>
  );
};

export default FrogCarosel;
