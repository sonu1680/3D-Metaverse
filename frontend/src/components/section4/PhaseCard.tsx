import React from "react";
// Remove the motion import if animations are not needed
// import { motion } from "motion/react";

interface Props {
  title1: string;
  title2: string;
  phase: string;
  id:number
}

const PhaseCard = ({ phase, title1, title2,id }: Props) => {
  return (
    <div
      className={`container bg-[#45823F] w-full p-4 md:p-6 rounded-lg shadow-md flex flex-col space-y-4 max-w-[500px] ${
        id % 2 === 0 ? "lg:ml-60" : "lg:-ml-60"
      }`}
    >
      <div className="phase text-2xl uppercase md:text-3xl font-extrabold text-white  ">
        {phase}
      </div>
      <div className="content flex flex-col lg:flex-col  ">
        <div className="flex flex-row items-center gap-x-2  p-2 rounded">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <span className="text-lg font-semibold md:text-base text-white">
            {title1}
          </span>
        </div>
        <div className="flex flex-row items-center gap-x-2  p-2 rounded  ">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <span className="text-lg font-semibold md:text-base text-white ">
            {title2}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PhaseCard;
