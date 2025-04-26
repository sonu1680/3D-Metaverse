

import "./globals.css";
import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/Providers";

// Fonts
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MetaVerse - The Ultimate 3D Metaverse Experience",
  description:
    "Explore the immersive 3D metaverse world of MetaVerse. Free-roam across a large virtual city with real-time interactions and personalized avatars.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} ${inter.variable} font-sans bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Providers>{children}</Providers>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}