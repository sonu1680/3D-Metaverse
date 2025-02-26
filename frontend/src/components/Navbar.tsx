'use client'
import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import {  } from "./ui/button";
import BuyButton from "./BuyButton";
import { motion } from "motion/react"; 
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="box w-full h-28 flex justify-between items-center fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-bggreen/70 px-6 lg:px-20">
      {/* Logo */}
      <div className="logo relative z-50 ">
        <Image src={"/images/logo.png"} width={56} height={56} alt={"logo"} />
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex justify-center items-center gap-10 font-semibold text-xl text-white">
        <Link href={"/"}>About</Link>
        <Link href={"/"}>TOKENOMIC</Link>
        <Link href={"/"}>BUY</Link>
        <Link href={"/"}>FAQS</Link>
        <Link href={"/"}>ROADMAP</Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden z-50">
        {" "}
        {/* Ensure the menu icon stays on top */}
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none text-3xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Buy Button */}
      <div className="hidden lg:flex" onClick={()=>router.push('/room')} >
        <BuyButton title={'BUY FROGCOIN'}  />
      </div>

      {/* Mobile Links (Animated using Framer Motion) */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "100vh" : 0 }}
        className={`${
          isOpen ? "flex" : "hidden"
        } lg:hidden fixed top-0 left-0 right-0 z-40backdrop-blur-lg bg-transparent/10 flex-col justify-center items-center text-white gap-10 font-semibold text-xl transition-all duration-300`}
        style={{
          overflow: "hidden", // Hide content overflow when height is 0
        }}
      >
        <Link href={"/"} onClick={toggleMenu}>
          About
        </Link>
        <Link href={"/"} onClick={toggleMenu}>
          TOKENOMIC
        </Link>
        <Link href={"/"} onClick={toggleMenu}>
          BUY
        </Link>
        <Link href={"/"} onClick={toggleMenu}>
          FAQS
        </Link>
        <Link href={"/"} onClick={toggleMenu}>
          ROADMAP
        </Link>
        <BuyButton title={'BUY FROGCOIN'} />
      </motion.div>
    </nav>
  );
};

export default Navbar;
