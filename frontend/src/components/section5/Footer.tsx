'use client'
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col md:flex-row justify-evenly xl:pr-40 items-center space-y-2 md:space-y-0 bg-[#45823F] py-4 px-4"
    >
      {/* Mobile Logo */}
      <span className="logo w-16 h-auto md:hidden">
        <Image src="/images/logo.png" height={200} width={200} alt="logo" />
      </span>

      {/* Company Info */}
      <span className="company text-sm md:text-lg md:font-bold text-white">
        © FrogCoin — All Rights Reserved.
      </span>

      {/* Desktop Logo */}
      <span className="logo w-16 h-auto hidden md:flex">
        <Image src="/images/logo.png" height={200} width={200} alt="logo" />
      </span>

      {/* Built By Info */}
      <span className="build text-sm md:text-lg text-white md:font-bold">
        Built by Sonu
      </span>
    </motion.div>
  );
};

export default Footer;
