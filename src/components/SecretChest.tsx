import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Gift, Star } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import { useSound } from "./SoundController";
import confetti from "canvas-confetti";

interface SecretChestProps {
  starCount: number;
  onCollectStar: (id: string) => void;
  collectedStars: string[];
}

export const SecretChest = ({
  starCount,
  onCollectStar,
  collectedStars,
}: SecretChestProps) => {
  const { playPaperFlip } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [rattleTrigger, setRattleTrigger] = useState(false);

  const isCollected = collectedStars.includes("secret-chest");
  const isUnlocked  = starCount >= 5;

  const handleChestClick = () => {
    if (!isUnlocked) {
      setRattleTrigger(true);
      playPaperFlip();
      setTimeout(() => setRattleTrigger(false), 500);
      return;
    }
    if (!isOpen) {
      setIsOpen(true);
      playPaperFlip();
      onCollectStar("secret-chest");
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#fbbf24", "#a7f3d0", "#c084fc"],
      });
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Section label */}
      <div className="text-center mb-12">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl md:text-6xl font-bold text-white tracking-tight"
          style={{ textShadow: "0 0 40px rgba(20,184,166,0.25)" }}
        >
          Secret Islands
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3 flex items-center justify-center gap-2"
        >
          <Star className="h-3.5 w-3.5 text-teal-400" />
          Collect 5 stars across all chapters to break the lock
        </motion.p>
      </div>

      {/* Star progress — minimal pill indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 mb-10"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
              i < starCount ? "bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.6)]" : "bg-white/10"
            }`}
          />
        ))}
        <span className="font-sans text-[10px] text-stone-500 ml-2 self-center uppercase tracking-widest">
          {starCount}/5
        </span>
      </motion.div>

      {/* Chest — large, centered, no box */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={rattleTrigger ? { x: [-12, 12, -8, 8, 0], rotate: [-4, 4, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            onClick={handleChestClick}
            className="flex flex-col items-center cursor-pointer group"
          >
            {/* Chest graphic — bigger, bolder */}
            <motion.div
              whileHover={{ y: isUnlocked ? -6 : 0 }}
              className="relative"
              style={{ filter: isUnlocked ? "drop-shadow(0 0 30px rgba(251,191,36,0.3))" : undefined }}
            >
              {/* Chest body */}
              <div className="relative w-52 h-40 rounded-xl bg-gradient-to-b from-[#92400e] to-[#451a03] border-4 border-amber-800 flex items-center justify-center overflow-visible"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)" }}
              >
                {/* Gold bands */}
                <div className="absolute left-8 inset-y-0 w-4 bg-amber-500/70 rounded-sm" />
                <div className="absolute right-8 inset-y-0 w-4 bg-amber-500/70 rounded-sm" />
                <div className="absolute inset-x-0 top-1/2 h-2 bg-amber-900/80" />

                {/* Lock */}
                <motion.div
                  animate={isUnlocked ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-xl z-10 ${
                    isUnlocked
                      ? "bg-amber-400/20 border-amber-400/60 text-amber-300"
                      : "bg-stone-900/80 border-stone-700 text-stone-500"
                  }`}
                  style={{ boxShadow: isUnlocked ? "0 0 20px rgba(251,191,36,0.4)" : undefined }}
                >
                  {isUnlocked ? <Unlock className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                </motion.div>
              </div>
            </motion.div>

            {/* Status text */}
            <motion.div className="text-center mt-8 space-y-1">
              <p className="font-handwritten text-xl text-stone-300">
                {isUnlocked
                  ? "The lock clicks open... tap the chest."
                  : `Collect ${5 - starCount} more star${5 - starCount !== 1 ? "s" : ""} to unlock.`}
              </p>
              {isUnlocked && (
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="font-sans text-xs text-teal-400 uppercase tracking-widest"
                >
                  Click to open ✦
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* Opened content — expands freely */
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full max-w-xl text-center space-y-8"
          >
            <div className="flex items-center justify-center gap-2 text-teal-400">
              <Gift className="h-6 w-6" />
              <h3 className="font-cinematic text-2xl font-bold">Unveiled Secrets</h3>
            </div>

            <p className="font-handwritten text-teal-200 text-2xl leading-relaxed max-w-lg mx-auto">
              "{birthdayData.hiddenSecret.letterContent}"
            </p>

            <div className="space-y-4">
              <p className="font-sans text-[11px] text-stone-500 uppercase tracking-widest">
                friendship statistics & roasts:
              </p>
              <div className="flex flex-col gap-3">
                {birthdayData.hiddenSecret.bloopers.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="text-left"
                  >
                    <span className="font-sans text-xs text-teal-400 uppercase tracking-wider block mb-0.5">
                      {item.title}
                    </span>
                    <p className="font-handwritten text-lg text-stone-300">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
