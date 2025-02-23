import React from "react";
import TokenValue from "../TokenValue";

const Tokenomic = () => {
  return (
    <div className="constainer flex flex-col  ">
      <div className="heading flex flex-col justify-start items-center">
        <span className="text-[34px] lg:text-[100px] font-extrabold">
          TOKENOMICS
        </span>
        <span className="text-[14px] lg:text-[28px] font-semibold">
          Understanding the FrogCoin Economy
        </span>
      </div>

      <TokenValue />
    </div>
  );
};

export default Tokenomic;
