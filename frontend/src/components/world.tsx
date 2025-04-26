"use client";

import { MotionSection } from "@/components/ui/motion-section";
import { AnimatedText } from "@/components/ui/animated-text";
import Image from "next/image";

export default function World() {
  return (
    <section
      id="world"
      className="py-20 bg-gradient-to-b from-black/90 to-background"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <MotionSection direction="up" className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <AnimatedText text="A Living Digital City" animation="slide-up" />
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            <AnimatedText
              text="NeoVerse's sprawling metropolis features distinct districts, each with unique architecture, activities, and atmosphere."
              animation="fade"
              delay={0.3}
            />
          </p>
        </MotionSection>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <MotionSection direction="left" delay={0.2}>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/images/3.png"
                alt="Futuristic City"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-display font-bold text-neon-blue animate-text-glow">
                  Neo city
                </h3>
                <p className="text-white">
                  The bustling heart of the digital city
                </p>
              </div>
            </div>
          </MotionSection>

          <MotionSection direction="right" delay={0.4}>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-display font-bold mb-2 gradient-text">
                  Explore city
                </h3>
                <p className="text-gray-300">
                  From the neon-lit entertainment quarters to serene virtual
                  city, every district offers unique experiences,
                  architecture and opportunities.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold mb-2 gradient-text">
                  Dynamic Chat
                </h3>
                <p className="text-gray-300">
                  Connect with different people across the world, share thoughts.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold mb-2 gradient-text">
Proximity Based videoChat                </h3>
                <p className="text-gray-300">
                 VideoChat with others when they are neare you.
                </p>
              </div>
            </div>
          </MotionSection>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <MotionSection delay={0.3} direction="up">
            <div className="relative overflow-hidden rounded-lg h-64">
              <Image
                src="/images/2.png"
                alt="Tech District"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-lg font-display font-bold text-neon-green">
                   Fort
                </h3>
              </div>
            </div>
          </MotionSection>

          <MotionSection delay={0.4} direction="up">
            <div className="relative overflow-hidden rounded-lg h-64">
              <Image
                src="/images/4.png"
                alt="Farm Area"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-lg font-display font-bold text-neon-pink">
Farm                </h3>
              </div>
            </div>
          </MotionSection>

          <MotionSection delay={0.5} direction="up">
            <div className="relative overflow-hidden rounded-lg h-64">
              <Image
                src="/images/5.png"
                alt="Animals"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-lg font-display font-bold text-neon-blue">
Animals                </h3>
              </div>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}