"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MotionSection } from "@/components/ui/motion-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Cta() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast({
        title: "You're on the list!",
        description: "You'll be the first to know when NeoVerse launches.",
      });
    }, 1000);
  };

  return (
    <section 
      id="community" 
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #080815, #0a0a20)" }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 h-40 w-40 rounded-full bg-neon-purple/20 blur-[80px]"
          animate={{
            y: [0, 30, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-neon-blue/20 blur-[100px]"
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-40 right-1/4 h-32 w-32 rounded-full bg-neon-pink/20 blur-[70px]"
          animate={{
            x: [0, 30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <MotionSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <AnimatedText text="Be the First to Join NeoVerse" animation="slide-up" />
          </h2>
          <p className="text-gray-300 mb-8">
            <AnimatedText
              text="Our digital city is opening soon. Subscribe to get exclusive early access and special in-game rewards."
              animation="fade"
              delay={0.3}
            />
          </p>
        </MotionSection>

        <MotionSection direction="up" delay={0.4} className="max-w-md mx-auto">
          <div className="cyberpunk-card p-8 rounded-lg border border-neon-blue/30 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neon-blue/5 to-neon-purple/10"></div>
            
            <h3 className="font-display text-xl font-bold mb-4 text-center">Coming Soon</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/40 border-neon-blue/30 focus:border-neon-blue"
                />
              </div>
              <Button 
                type="submit" 
                variant="neon" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Early Access"}
              </Button>
            </form>
            
            <p className="mt-4 text-xs text-gray-400 text-center">
              By subscribing, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}