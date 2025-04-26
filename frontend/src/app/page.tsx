import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Features from "@/components/features";
import World from "@/components/world";
import Avatars from "@/components/avatars";
import Cta from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <World />
      <Avatars />
      <Cta />
      <Footer />
    </main>
  );
}