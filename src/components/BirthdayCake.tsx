import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./SoundController";
import confetti from "canvas-confetti";

interface BirthdayCakeProps {
  candlesCount?: number;
  onAllBlown: () => void;
}

export const BirthdayCake = ({
  candlesCount = 3,
  onAllBlown,
}: BirthdayCakeProps) => {
  const [litCandles, setLitCandles] = useState<boolean[]>(
    Array(candlesCount).fill(true)
  );
  const { playCameraShutter, playPaperFlip } = useSound();
  const confettiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (confettiIntervalRef.current !== null) {
        clearInterval(confettiIntervalRef.current);
      }
    };
  }, []);

  const handleBlowCandle = (idx: number) => {
    if (!litCandles[idx]) return; // Already blown out

    const updated = [...litCandles];
    updated[idx] = false;
    setLitCandles(updated);
    playPaperFlip(); // play soft air sound or paper flip

    // Trigger local small confetti burst near the cake
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.7, x: 0.5 },
      colors: ["#fda4af", "#f0abfc", "#fde047"],
    });

    // Check if all candles are blown out
    if (updated.every((candle) => !candle)) {
      playCameraShutter(); // Play satisfying shutter sound

      // Grand celebration confetti burst!
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      confettiIntervalRef.current = setInterval(() => {
        if (Date.now() > end) {
          if (confettiIntervalRef.current !== null) {
            clearInterval(confettiIntervalRef.current);
            confettiIntervalRef.current = null;
          }
          onAllBlown();
          return;
        }

        confetti({
          particleCount: 15,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ["#f43f5e", "#fb7185", "#ec4899", "#d946ef", "#8b5cf6"],
        });
        confetti({
          particleCount: 15,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ["#f43f5e", "#fb7185", "#ec4899", "#d946ef", "#8b5cf6"],
        });
      }, 250);
    }
  };

  return (
    <div className="flex flex-col items-center select-none py-6">
      {/* Interactive Birthday Cake Container */}
      <div className="relative w-64 h-56 flex items-end justify-center">
        
        {/* Candles sitting on top of the cake */}
        <div className="absolute top-[8%] flex justify-center gap-10 w-full px-12 z-20">
          {litCandles.map((isLit, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center cursor-pointer group"
              onClick={() => handleBlowCandle(idx)}
            >
              {/* Flame */}
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    initial={{ scale: 0, y: 5 }}
                    animate={{ scale: [1, 1.1, 1], y: 0 }}
                    exit={{ scale: 0, y: -10, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      scale: { repeat: Infinity, duration: 1.2 }
                    }}
                    className="absolute -top-7 w-4 h-6 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 blur-[1px] shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                    style={{ originY: 1 }}
                  />
                )}
              </AnimatePresence>

              {/* Candle Body */}
              <div className="w-2.5 h-10 bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 rounded-t border-t border-rose-200/50 shadow-sm relative overflow-hidden">
                {/* Spiral stripes */}
                <div className="absolute inset-0 bg-transparent opacity-40 border-l-[3px] border-white/80 rotate-12 -left-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Cake Illustration */}
        <div className="w-full flex flex-col items-center z-10">
          {/* Cake Top Layer */}
          <div className="w-48 h-20 bg-gradient-to-b from-[#FAF4EC] to-[#F1E5D5] rounded-t-lg relative border-b-4 border-rose-300/30 shadow-md">
            {/* Dripping Frosting */}
            <div className="absolute top-0 inset-x-0 h-4 bg-rose-400 rounded-t-lg flex justify-around">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="w-5 h-6 bg-rose-400 rounded-b-full shadow-inner" style={{ marginTop: '-1px' }} />
              ))}
            </div>
          </div>

          {/* Cake Bottom Layer */}
          <div className="w-56 h-20 bg-gradient-to-b from-[#F2E7D9] to-[#E5D5C2] rounded-t-md relative border-b-4 border-[#cdae91] shadow-lg">
            {/* Bottom Frosting Ring */}
            <div className="absolute bottom-0 inset-x-0 h-3 bg-pink-400/20" />
          </div>

          {/* Cake Stand Plate */}
          <div className="w-64 h-3 bg-stone-300 rounded-full shadow-md border-b-2 border-stone-400" />
        </div>
      </div>

      {/* Guide text */}
      <div className="mt-6 text-center">
        <p className="font-handwritten text-xl text-rose-300 animate-pulse">
          {litCandles.some((c) => c)
            ? "✨ Click the candles to blow them out & make a wish... ✨"
            : "🎂 Your wish has been sent to the stars! 🎂"}
        </p>
      </div>
    </div>
  );
};
