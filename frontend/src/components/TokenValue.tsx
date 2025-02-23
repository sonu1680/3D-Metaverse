import Image from "next/image";
import React from "react";
import TokenMonicCiricle from "./TokenMonicCiricle";

const TokenValue = () => {
  return (
    <div className="container mx-auto pt-10 h-auto p-4 flex flex-col relative  justify-center items-center ">
      <div className="up w-full  flex justify-center  gap-x-10 md:gap-x-32 lg:gap-x-72  ">
        <TokenMonicCiricle
          className="rounded-t-full rounded-bl-full w-1/2  aspect-square 	 "
          direction={[0, 300, 0]}
          value={30}
          title={"liquidity"}
        />
        <TokenMonicCiricle
          className="rounded-t-full rounded-br-full w-1/2 aspect-square "
          direction={[0, -300, 0]}
          value={10}
          title={"Burnt Tokens"}
        />
      </div>

      {/* Mid section with an image */}
      <div className="mid relative z-40 lg:right-10 lg:-top-80 -top-10 w-[350px] lg:w-[530px] h-auto  ">
        <Image
          src={"/images/5.png"}
          alt={"Token"}
          width={1000}
          height={1000}
          className="rounded-full  "
        />
      </div>

      <div className="up w-full  flex justify-center  gap-x-10 lg:gap-x-72 absolute bottom-0  lg:bottom-36 ">
        <TokenMonicCiricle
          className="rounded-b-full rounded-tl-full w-1/2  aspect-square 	 "
          direction={[0, 300, 0]}
          value={40}
          title={"pre sale"}
        />
        <TokenMonicCiricle
          className="rounded-b-full rounded-tr-full w-1/2 aspect-square "
          direction={[0, -300, 0]}
          value={20}
          title={"marketing"}
        />
      </div>
    </div>
  );
};

export default TokenValue;
