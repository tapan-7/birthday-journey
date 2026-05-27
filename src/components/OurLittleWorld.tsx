import { useState } from "react";
import { BirthdayCake } from "./BirthdayCake";
import { Sparkles, Tent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OurLittleWorldProps {
  onCollectStar: (id: string) => void;
  collectedStars: string[];
}

export const OurLittleWorld = ({
  onCollectStar,
  collectedStars,
}: OurLittleWorldProps) => {
  const isCollected = collectedStars.includes("cake-candles");
  const [isBlown, setIsBlown] = useState(isCollected);

  const handleAllBlown = () => {
    setIsBlown(true);
    onCollectStar("cake-candles");
  };

  return (
    <div className="w-full relative h-[450px] bg-black/45 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div>
          <span className="font-handwritten text-teal-300 text-lg block">chapter 6</span>
          <h3 className="font-cinematic text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Tent className="h-4 w-4 text-teal-300" />
            Our Little World
          </h3>
        </div>
        <span className="text-xs font-sans text-stone-400">
          Blow out the candles
        </span>
      </div>

      {/* Interactive Birthday Cake Layer */}
      <div className="relative flex-grow flex items-center justify-center z-10 my-4">
        {/* Glow ambient background based on candle status */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 blur-[80px] pointer-events-none rounded-full ${
            isBlown
              ? "bg-amber-400/5 opacity-50"
              : "bg-rose-500/10 opacity-70"
          }`}
        />

        <AnimatePresence mode="wait">
          {!isBlown ? (
            <motion.div
              key="cake"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex justify-center"
            >
              <BirthdayCake candlesCount={3} onAllBlown={handleAllBlown} />
            </motion.div>
          ) : (
            <motion.div
              key="celebrate"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 max-w-xs"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto text-teal-300"
              >
                <Sparkles className="h-8 w-8 animate-pulse" />
              </motion.div>
              <h4 className="font-cinematic text-xl font-bold text-white">
                Happy Birthday! 🎂
              </h4>
              <p className="font-handwritten text-lg text-stone-300 leading-snug">
                "Our friendship is a little universe of its own — full of light, laughter, and stars."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guide Footer */}
      <div className="text-center text-[11px] font-sans text-stone-400 z-10 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5">
        <Sparkles className="h-3 w-3 text-teal-300" />
        <span>Blow out all the candles on the cake to unlock the final surprise star.</span>
      </div>
    </div>
  );
};
