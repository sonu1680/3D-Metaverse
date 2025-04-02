"use client";
import React, { useState } from "react";
import Head from "next/head";
import { motion } from "motion/react";
import { Cctv } from "lucide-react";

import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const page = () => {
  const router = useRouter();
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleLogin = async () => {
   
    try {
      const result = await signIn("credentials", {
        authData,
        redirect: false,
      });
      if (result?.error) {
        toast("Invalid email or password.");
      } else {
        toast("Login success");

        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast("An error occurred. Please try again.");
    } finally {
    }
  
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 text-white overflow-hidden relative">
      <Head>
        <title>Metaverse Portal | Login</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl"
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Card container */}
          <div className="backdrop-blur-md bg-black/40 rounded-2xl p-8 shadow-2xl border border-purple-500/30">
            {/* Logo/Brand */}
            <div className="flex justify-center mb-8">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21zm0 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM12 15a3 3 0 110-6 3 3 0 010 6z"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
              Metaverse Portal
            </h1>
            <p className="text-center text-gray-300 mb-8">
              Enter the next dimension of digital experience
            </p>

            {/* Google Auth Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-white rounded-lg text-gray-800 font-medium flex items-center justify-center space-x-3 hover:shadow-lg transition duration-300 mb-6"
              onClick={async () => {
                try {
                  const a = await signIn("google", { callbackUrl: "/" });
                  if (a?.ok) {
                    toast("Login success");
                  }
                } catch (error) {
                  toast("Google login failed. Please try again.");
                }
              }}
            >
              <Image alt={'google'} height={20} width={20} src={'/images/google.png'} />  <span>Continue with Google</span>
            </motion.button>

            {/* Divider */}
            {/* <div className="flex items-center mb-6">
              <div className="flex-1 h-px bg-gray-500/30"></div>
              <span className="px-4 text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-500/30"></div>
            </div> */}

            {/* name input */}
            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setAuthData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="sonu"
              />
            </div> */}

            {/* Email input */}
            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                onChange={(e) =>
                  setAuthData((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="your@email.com"
              />
            </div> */}

            {/* Password input */}
            {/* <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="••••••••"
                onChange={(e) =>
                  setAuthData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </div> */}

            {/* Login button */}
            {/* <motion.button
              onClick={handleLogin}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-700 transition duration-300"
            >
              Enter Metaverse
            </motion.button> */}

            {/* Footer links */}
            {/* <div className="mt-6 text-center text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">
                Forgot Password?
              </a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-white transition">
                Create Account
              </a>
            </div> */}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default page;
