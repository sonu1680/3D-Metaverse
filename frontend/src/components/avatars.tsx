"use client";

import { MotionSection } from "@/components/ui/motion-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Avatars() {
  return (
    <section id="avatars" className="py-20 bg-[#080815]">
      <div className="container mx-auto px-6 max-w-7xl">
        <MotionSection direction="up" className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <AnimatedText
              text="Express Your Digital Identity"
              animation="slide-up"
            />
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            <AnimatedText
              text="Create, customize and evolve your perfect digital self with thousands of unique combinations and rare collectible items."
              animation="fade"
              delay={0.3}
            />
          </p>
        </MotionSection>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <MotionSection
            direction="right"
            delay={0.2}
            className="order-2 lg:order-1"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-display font-bold mb-2 gradient-text">
                  Unlimited Customization
                </h3>
                <p className="text-gray-300">
                  Choose from thousands of body types, facial features,
                  hairstyles, clothing options, and accessories to create your
                  perfect digital self.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold mb-2 gradient-text">
                  Rare Collectibles
                </h3>
                <p className="text-gray-300">
                  Find, earn, and trade limited-edition wearables, skins, and
                  accessories that showcase your status and personality.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold mb-2 gradient-text">
                  Animated Expressions
                </h3>
                <p className="text-gray-300">
                  Express yourself with realistic facial animations, custom
                  emotes, and body language that brings your avatar to life.
                </p>
              </div>

              <Button variant="neon" className="mt-4">
                Create Your Avatar
              </Button>
            </div>
          </MotionSection>

          <MotionSection
            direction="left"
            delay={0.4}
            className="order-1 lg:order-2"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden aspect-[3/4] animate-float">
                  <Image
                    src="/images/2.png"
                    alt="Avatar Example 1"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div
                  className="relative rounded-lg overflow-hidden aspect-[3/4] animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <Image
                    src="/images/3.png"
                    alt="Avatar Example 2"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div
                  className="relative rounded-lg overflow-hidden aspect-[3/4] animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <Image
                    src="/images/4.png"
                    alt="Avatar Example 3"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div
                  className="relative rounded-lg overflow-hidden aspect-[3/4] animate-float"
                  style={{ animationDelay: "3s" }}
                >
                  <Image
                    src="/images/5.png"
                    alt="Avatar Example 4"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              </div>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}