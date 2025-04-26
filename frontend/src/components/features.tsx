"use client";

import { MotionSection } from "@/components/ui/motion-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { 
  Map, 
  Headphones, 
  Building2, 
  Users, 
  ShoppingBag, 
  PaintBucket,
  Gamepad2,
  MessageCircle
} from "lucide-react";

const features = [
  {
    name: "Vast City Exploration",
    description: "Roam freely across our expansive virtual metropolis with distinct districts, hidden locations, and dynamic environments.",
    icon: Map,
    color: "#0ff0fc",
  },
  {
    name: "Real-time Social",
    description: "Connect with friends and strangers using crystal-clear audio and video chat that simulates realistic proximity communication.",
    icon: Headphones,
    color: "#ff2a6d",
  },
  {
    name: "Dynamic Interactions",
    description: "Experience a living, breathing city with interactive storefronts, vehicles, NPCs, and player-driven economy.",
    icon: Building2,
    color: "#05ffa1",
  },
  {
    name: "Avatar Customization",
    description: "Create and personalize your digital identity with thousands of customization options, wearables, and unique accessories.",
    icon: PaintBucket,
    color: "#b14aed",
  },
  {
    name: "Personal Spaces",
    description: "Own and customize your virtual apartment or business in the city with expandable space and decorative freedom.",
    icon: Users,
    color: "#0ff0fc",
  },
  {
    name: "Virtual Economy",
    description: "Buy, sell, and trade virtual goods in our player-driven marketplace using our secure blockchain-backed currency.",
    icon: ShoppingBag,
    color: "#ff2a6d",
  },
  {
    name: "Cross-platform Gaming",
    description: "Enjoy embedded mini-games and activities across any device with friends no matter where they're connecting from.",
    icon: Gamepad2,
    color: "#05ffa1",
  },
  {
    name: "Community Events",
    description: "Participate in regular concerts, exhibitions, competitions and user-created events in special venue spaces.",
    icon: MessageCircle,
    color: "#b14aed",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black/80">
      <div className="container mx-auto px-6 max-w-7xl">
        <MotionSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <AnimatedText text="Experience the Future" animation="slide-up" />
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            <AnimatedText 
              text="NeoVerse combines cutting-edge technology with unlimited creative freedom to deliver the most immersive metaverse experience ever created." 
              animation="fade"
              delay={0.3}
            />
          </p>
        </MotionSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <MotionSection
              key={feature.name}
              delay={0.1 * index}
              direction="up"
            >
              <div 
                className="feature-card h-full" 
                style={{ "--neon-color": feature.color } as React.CSSProperties}
              >
                <feature.icon className="h-10 w-10 mb-4" style={{ color: feature.color }} />
                <h3 className="text-xl font-display font-semibold mb-2">{feature.name}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}