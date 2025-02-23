import React from "react";
import { TextAnimate } from "../magicui/text-animate";
import Image from "next/image";
import PolygonBox from "../PolygonBox";
import BuyButton from "../BuyButton";
import How from "../How";


const data = [
  {
    title: "Create a Wallet",
    desc: "Download Metamask or any wallet that supports ETH",
  },
  {
    title: "Fund Your Wallet",
    desc: "Transfer ETH or Ethereum-based tokens to your wallet",
  },
  {
    title: "Grab FrogCoin",
    desc: "Use UniSwap to swap ETH for FrogCoin and keep frogging!",
  },
];
const WalletAddress = () => {
  return (
    <div className="conatiner h-full lg:-mt-28 py-5  w-full relative  flex flex-col justify-center items-center ">
      <div className="imgcontiner lg:-mt-20 w-full flex flex-row justify-evenly items-center  lg:px-20 relative top-12 lg:top-36 ">
        <span className="">
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="  font-extrabold  text-[40px] sm:text-[100px] md:text-[110px] lg:text-[130px] "
          >
            BUY
          </TextAnimate>
        </span>
        <span className="i  ">
          <Image
            src="/images/2.png"
            alt="Frog illustration"
            height={800}
            width={800}
            className="w-48 h-auto md:w-56 lg:w-[600px] "
          />
        </span>
      </div>
      <PolygonBox className="bg-white  w-[90%] max-w[900px] sm:w-[70%] md:w-[70%] py-4 h-[200px] md:h-[200px] lg:h-[270px] gap-4 md:gap-6 flex flex-col md:flex-row justify-between items-center px-[5%] lg:-mt-8 ">
        <div className="flex w-full flex-col justify-center items-center font-extrabold gap-y-10 text-center">
          <div className="text-5xl lg:text-[150px] text-bggreen w-full uppercase ">
            Frogcoin?
          </div>
          <BuyButton title={"GET YOUR FROGCOIN NOW"} />
        </div>
      </PolygonBox>
      <div className="w-full mt-10  flex flex-col lg:flex-row justify-center items-start lg:w-5/6 ">
        {data.map((data, index) => (
          <How key={index} title={data.title} id={index + 1} desc={data.desc} />
        ))}
      </div>
      <PolygonBox className="bg-[#11691A] px-6 sm:px-10 lg:px-20 w-[90%] max-w-[1000px] h-auto flex justify-center items-center flex-col md:flex-row py-5 gap-y-5 mt-10 gap-x-4 ">
        <p className="text-base sm:text-lg lg:text-2xl text-white w-full uppercase text-center break-all">
          0x2170Ed0880ac9A755fd29B2688956BD959F933F8
        </p>
        <BuyButton title={"COPY"} />
      </PolygonBox>
    </div>
  );
};

export default WalletAddress;
