import { useState } from "react";
import { BirthdayCake } from "./BirthdayCake";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "@/config/birthdayData";

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
    <div className="relative w-full flex flex-col items-center">
      {/* Section label */}
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-handwritten text-purple-300 text-2xl mb-2"
          style={{ textShadow: "0 0 20px rgba(168,85,247,0.5)" }}
        >
          chapter 7
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl md:text-6xl font-bold text-white tracking-tight"
          style={{ textShadow: "0 0 40px rgba(168,85,247,0.25)" }}
        >
          Our Little World
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3 flex items-center justify-center gap-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          Blow out all the candles to unlock the final surprise
        </motion.p>
      </div>

      {/* Ambient glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-all duration-2000 ${
          isBlown ? "bg-purple-700/10" : "bg-rose-600/15"
        }`}
      />

      {/* Cake or celebration — floating freely */}
      <AnimatePresence mode="wait">
        {!isBlown ? (
          <motion.div
            key="cake"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ type: "spring", damping: 20 }}
            className="flex justify-center z-10"
          >
            <BirthdayCake candlesCount={birthdayData.celebrationLetter.cakeCandlesCount} onAllBlown={handleAllBlown} />
          </motion.div>
        ) : (
          <motion.div
            key="celebrate"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 18 }}
            className="text-center space-y-8 z-10 max-w-2xl mx-auto"
          >
            {/* Animated sparkle burst */}
            <div className="flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1), scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 3 + i * 0.5 }}
                  className="absolute"
                  style={{
                    width: 60 + i * 18,
                    height: 60 + i * 18,
                    border: `1px solid rgba(168,85,247,${0.15 - i * 0.025})`,
                    borderRadius: "50%",
                  }}
                />
              ))}
              <div className="relative w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center"
                style={{ boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}>
                <Sparkles className="h-10 w-10 text-purple-300 animate-pulse" />
              </div>
            </div>

            <h3 className="font-cinematic text-4xl md:text-5xl font-bold text-white" style={{ textShadow: "0 0 30px rgba(168,85,247,0.4)" }}>
              Happy Birthday, Aalu! 🎂
            </h3>

            <p className="font-emotional italic text-stone-300 text-2xl leading-relaxed max-w-xl mx-auto">
              "{birthdayData.ending.finalMessage}"
            </p>

            <p className="font-handwritten text-purple-300 text-xl">
              {birthdayData.ending.subText}
            </p>

            {/* Floating stars celebration */}
            <div className="flex items-center justify-center gap-4 mt-4">
              {["✦", "✨", "⭐", "✨", "✦"].map((s, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2 }}
                  className="text-amber-300 text-xl"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
