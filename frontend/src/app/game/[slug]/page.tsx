"use client";
import Chat from "@/components/Chat";
import { Experience } from "@/components/Experience";
import useSocket from "@/hooks/useSocket";
import { characterAtom } from "@/recoil/char";
import { roomAtom } from "@/recoil/roomId";
import { keyboardMap } from "@/utils/keyboardMap";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, {
  memo,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSetRecoilState } from "recoil";

const Page = memo(({ params }: any) => {
  const roomId = params.slug;
  const setRoomId = useSetRecoilState(roomAtom);
  setRoomId(roomId);
  const setCharacter = useSetRecoilState(characterAtom);
  const { characters } = useSocket(roomId);

  // Audio refs
  const walkSound = useRef<HTMLAudioElement | null>(null);
  const envSound = useRef<HTMLAudioElement | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Initialize audio only once component mounts
  useEffect(() => {
    walkSound.current = new Audio("/sound/running.mp3");
    envSound.current = new Audio("/sound/environment.mp3");

    if (walkSound.current && envSound.current) {
      walkSound.current.loop = true;
      envSound.current.loop = true;
      walkSound.current.volume = 1; 
      envSound.current.volume = 1; 
    }

    return () => {
      if (walkSound.current) walkSound.current.pause();
      if (envSound.current) envSound.current.pause();
    };
  }, []);

  const playAudio = async (audio: HTMLAudioElement | null) => {
    if (!audio) return;

    try {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Playback was prevented:", error);
        });
      }
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  useEffect(() => {
    if (audioInitialized) return;

    const initializeAudio = () => {
      if (envSound.current) {
        playAudio(envSound.current);
        setAudioInitialized(true);
      }
      document.removeEventListener("click", initializeAudio);
      document.removeEventListener("keydown", initializeAudio);
    };

    document.addEventListener("click", initializeAudio);
    document.addEventListener("keydown", initializeAudio);

    return () => {
      document.removeEventListener("click", initializeAudio);
      document.removeEventListener("keydown", initializeAudio);
    };
  }, [audioInitialized]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
        ].includes(e.key)
      ) {
        if (walkSound.current && walkSound.current.paused) {
          playAudio(walkSound.current);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
        ].includes(e.key)
      ) {
        // Check if any movement keys are still pressed
        const movementKeys = [
          "w",
          "a",
          "s",
          "d",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
        ];
        const anyKeyStillPressed = movementKeys.some((key) => {
          // @ts-ignore - KeyboardEvent.code is not properly typed
          return key === document.activeElement?.getAttribute("data-key");
        });

        if (!anyKeyStillPressed && walkSound.current) {
          walkSound.current.pause();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [audioInitialized]);

  useEffect(() => {
    if (characters.length > 0) {
      //@ts-ignore
      setCharacter(characters);
    }
  }, [characters, setCharacter]);

  return (
    <>
      <div
        style={{
          width: "80vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Suspense fallback={null}>
          <KeyboardControls map={keyboardMap}>
            <Canvas
              shadows
              camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
            >
              <Experience />
            </Canvas>
          </KeyboardControls>
        </Suspense>
      </div>

      <div
        style={{
          width: "20vw",
          height: "100vh",
          position: "absolute",
          left: "80vw",
        }}
      >
        <Chat />
      </div>
    </>
  );
});

export default Page;
