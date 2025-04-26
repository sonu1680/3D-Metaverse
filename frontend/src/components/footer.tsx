"use client";

import Link from "next/link";
import { Globe, Twitter, Instagram, Youtube, Github } from "lucide-react";
import { MotionSection } from "@/components/ui/motion-section";

export default function Footer() {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <MotionSection className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6 text-neon-blue" />
              <span className="text-lg font-bold font-display tracking-wider text-white">
                METAVERSE
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-xs">
              The ultimate 3D metaverse experience where imagination meets
              virtual reality.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-neon-blue transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-pink transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-green transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-purple transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-white">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#world"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  World
                </a>
              </li>
              <li>
                <a
                  href="#avatars"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Avatars
                </a>
              </li>
              <li>
                <a
                  href="#community"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-white">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Code of Conduct
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </MotionSection>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NeoVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}