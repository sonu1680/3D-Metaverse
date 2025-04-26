"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Scene3D from "@/components/3d/scene";
import { AnimatedText } from "@/components/ui/animated-text";
import { MotionSection } from "@/components/ui/motion-section";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router=useRouter()
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector("#features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-cyberpunk-grid bg-cover bg-center"></div>

      {/* 3D City Scene */}
      <div className="absolute inset-0 -z-[5]">
        <Scene3D className="h-full w-full" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <MotionSection
            delay={0.2}
            direction="left"
            className="flex flex-col justify-center"
          >
            <div className="max-w-xl">
              <h1 className="mb-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                <AnimatedText
                  text="Enter The"
                  animation="slide-up"
                  className="block"
                />
                <AnimatedText
                  text="MetaVerse"
                  animation="glow"
                  delay={0.5}
                  className="gradient-text block text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                />
              </h1>

              <p className="mb-8 mt-4 max-w-lg text-lg text-gray-300">
                <AnimatedText
                  animation="fade"
                  delay={0.8}
                  text="Experience the ultimate 3D metaverse with free-roam exploration, real-time social interactions, and unlimited customization in a living digital city."
                />
              </p>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button
                  variant="neon"
                  size="xl"
                  onClick={() => router.push("/room")}
                >
                  Join the City
                </Button>
                <Button variant="outline" size="xl">
                  Watch Trailer
                </Button>
              </div>
            </div>
          </MotionSection>

          <div className="hidden lg:block">
            {/* This space is intentionally left empty to balance the grid,
                as the 3D scene is positioned absolutely behind */}
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        onClick={scrollToFeatures}
      >
        <ChevronDown className="h-8 w-8 text-white" />
      </motion.div>
    </div>
  );
}