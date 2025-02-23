import React from "react";
import { Copy, Instagram } from "lucide-react";
import Image from "next/image";
import PolygonBox from "../PolygonBox";
import BuyButton from "../BuyButton";

const Social = () => {
  const address = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="min-h-[400px] w-full bg-bggreen  relative overflow-hidden">
      {/* Background wave effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-full transform -skew-y-6 bg-bggreen"></div>
        <div className="absolute w-full h-full transform skew-y-6 bg-bggreen top-32"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        {/* Logo */}
        <div className="w-24 h-auto md:w-32  rounded-full mb-8 flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Frog Logo"
            width={300}
            height={300}
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4  ">
          JOIN THE FROGS
        </h1>

        {/* Subheading */}
        <p className="text-green-100 text-lg font-semibold md:text-xl mb-8 text-center">
          Let's jump directly to the moon
        </p>

        {/* Address container */}

        <PolygonBox className="bg-[#11691A] px-6 sm:px-10 lg:px-20 w-[90%] xl:w-[120%] max-w-[1000px] h-auto flex justify-center items-center flex-col md:flex-row py-5 gap-y-5 mt-10 gap-x-4 ">
          <p className="text-base sm:text-lg lg:text-2xl text-white w-full uppercase text-center break-all">
            0x2170Ed0880ac9A755fd29B2688956BD959F933F8
          </p>
          <BuyButton title={"BUY"} />
        </PolygonBox>

        {/* Social links */}
        <div className="flex gap-6 mt-10">
          <a
            href="#"
            className="p-3 bg-green-600 hover:bg-green-500 rounded-full transition-colors"
          >
            <Instagram size={24} className="text-white" />
          </a>
          <a
            href="#"
            className="p-3 bg-green-600 hover:bg-green-500 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="#"
            className="p-3 bg-green-600 hover:bg-green-500 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
