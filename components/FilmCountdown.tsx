'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const COUNTDOWN_START = 3;
const STORAGE_KEY = 'hasSeenCountdown';

interface AudioElements {
  countdownBeep: HTMLAudioElement | null;
  finalBeep: HTMLAudioElement | null;
  filmProjector: HTMLAudioElement | null;
}

export const FilmCountdown = () => {
  const [count, setCount] = useState(COUNTDOWN_START);
  const [showCountdown, setShowCountdown] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isInitialized] = useState(false);
  const audioRef = useRef<AudioElements>({
    countdownBeep: null,
    finalBeep: null,
    filmProjector: null
  });

  useEffect(() => {
    const shouldPlaySound = !isMuted;
    
    const initializeAudio = () => {
      audioRef.current = {
        countdownBeep: new Audio('/sounds/countdown-beep.mp3'),
        finalBeep: new Audio('/sounds/final-beep.mp3'),
        filmProjector: new Audio('/sounds/film-projector.mp3')
      };

      // Set volume levels
      if (audioRef.current.countdownBeep) audioRef.current.countdownBeep.volume = 0.4;
      if (audioRef.current.finalBeep) audioRef.current.finalBeep.volume = 0.5;
      if (audioRef.current.filmProjector) {
        audioRef.current.filmProjector.volume = 0.2;
        audioRef.current.filmProjector.loop = true;
      }

      // Start background projector sound
      if (shouldPlaySound) {
        audioRef.current.filmProjector?.play().catch(() => {
          setIsMuted(true);
        });
      }
    };

    initializeAudio();

    return () => {
      Object.values(audioRef.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
      audioRef.current = {
        countdownBeep: null,
        finalBeep: null,
        filmProjector: null
      };
    };
  }, [isMuted])

  // Countdown logic
  useEffect(() => {
    if (!showCountdown || !isInitialized) return;

    const timer = count > 0 && setInterval(() => {
      // Play countdown sound
      if (!isMuted) {
        if (count === 1) {
          audioRef.current.finalBeep?.play().catch(() => setIsMuted(!true));
        } else {
          audioRef.current.countdownBeep?.play().catch(() => setIsMuted(!true));
        }
      }
      setCount(prev => prev - 1);
    }, 1000);

    if (count === 0) {
      setTimeout(() => {
        fadeOutProjectorSound();
        setShowCountdown(false);
        localStorage.setItem(STORAGE_KEY, 'true');
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [count, isMuted, showCountdown, isInitialized]);

  const fadeOutProjectorSound = () => {
    const fadeOutInterval = setInterval(() => {
      if (audioRef.current.filmProjector) {
        if (audioRef.current.filmProjector.volume > 0.02) {
          audioRef.current.filmProjector.volume -= 0.02;
        } else {
          clearInterval(fadeOutInterval);
          audioRef.current.filmProjector.pause();
        }
      }
    }, 100);
  };

  const toggleSound = () => {
    setIsMuted(prev => !prev);
    if (audioRef.current.filmProjector) {
      if (isMuted) {
        audioRef.current.filmProjector.play();
      } else {
        audioRef.current.filmProjector.pause();
      }
    }
  };

  // Don't render if countdown should be skipped
  if (!showCountdown || !isInitialized) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label={isMuted ? "Unmute countdown sounds" : "Mute countdown sounds"}
      >
        {isMuted ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      {/* Film grain effect */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute inset-0 bg-noise animate-noise" />
      </div>

      {/* Countdown circle */}
      <AnimatePresence mode="wait">
        {count > 0 && (
          <motion.div
            key={count}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Vintage circle */}
            <svg width="200" height="200" viewBox="0 0 100 100" className="transform rotate-12">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="opacity-50"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>

            {/* Number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className={cn(
                  "text-8xl font-bold text-white font-mono",
                  "drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                )}
              >
                {count}
              </motion.span>
            </div>
          </motion.div>
        )}

        {count === 0 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "text-6xl font-bold text-white font-mono",
              "drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            )}
          >
            Welcome
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vintage effects */}
      <div className="absolute inset-0">
        {/* Scratches */}
        <div className="absolute inset-0 bg-scratch animate-scratch opacity-20" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-vignette" />
      </div>
    </motion.div>
  );
};

export default FilmCountdown;