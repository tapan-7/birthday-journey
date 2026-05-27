import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Gift, ShieldAlert, Heart, Star } from "lucide-react";
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
  const isUnlocked = starCount >= 5;

  const handleChestClick = () => {
    if (!isUnlocked) {
      // rattle the lock
      setRattleTrigger(true);
      playPaperFlip();
      setTimeout(() => setRattleTrigger(false), 500);
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      playPaperFlip();
      onCollectStar("secret-chest");

      // Throw a burst of golden star confetti
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#fbbf24", "#a7f3d0", "#c084fc"],
      });
    }
  };

  return (
    <div className="w-full relative h-[450px] bg-black/45 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
      
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div>
          <span className="font-handwritten text-teal-300 text-lg block">chapter 6</span>
          <h3 className="font-cinematic text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Lock className="h-4 w-4 text-teal-300" />
            Secret Islands
          </h3>
        </div>
        <span className="text-xs font-sans text-stone-400">
          Locked Treasure Chest
        </span>
      </div>

      {/* Main animation area */}
      <div className="relative flex-grow flex flex-col items-center justify-center my-4 z-10">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="locked"
              animate={rattleTrigger ? { x: [-10, 10, -10, 10, 0], rotate: [-3, 3, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}
              onClick={handleChestClick}
              className="flex flex-col items-center cursor-pointer group"
            >
              {/* Chest Graphic */}
              <div className="relative w-40 h-32 rounded-xl bg-gradient-to-b from-[#78350f] to-[#451a03] border-4 border-amber-900 shadow-2xl flex items-center justify-center">
                {/* Gold bands */}
                <div className="absolute left-6 inset-y-0 w-3 bg-amber-500/80" />
                <div className="absolute right-6 inset-y-0 w-3 bg-amber-500/80" />
                <div className="absolute inset-x-0 top-1/2 h-1.5 bg-amber-950" />

                {/* Padlock status icon */}
                <motion.div
                  animate={isUnlocked ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-lg ${
                    isUnlocked
                      ? "bg-amber-400/10 border-amber-400/40 text-amber-300 shadow-amber-400/10"
                      : "bg-stone-900 border-white/10 text-stone-500"
                  }`}
                >
                  {isUnlocked ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </motion.div>
              </div>

              {/* Requirement Text */}
              <div className="text-center mt-6 max-w-xs space-y-1">
                <span className="font-handwritten text-base text-stone-300 block">
                  {isUnlocked
                    ? "The ancient lock clicks! Tap the chest to open."
                    : `Collect 5 stars to break the lock.`}
                </span>
                <span className="text-[10px] font-sans text-stone-500 uppercase tracking-widest block">
                  ({starCount} / 5 Stars Collected)
                </span>
              </div>
            </motion.div>
          ) : (
            /* Open chest content */
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full max-h-[260px] overflow-y-auto bg-stone-900/60 border border-teal-500/20 rounded-xl p-4 space-y-4"
            >
              <div className="flex items-center gap-1.5 text-teal-400 border-b border-white/10 pb-2">
                <Gift className="h-4.5 w-4.5" />
                <h4 className="font-cinematic text-sm font-bold uppercase tracking-wider">
                  Unveiled Secrets
                </h4>
              </div>

              <div className="space-y-3 font-sans text-xs text-stone-300 leading-relaxed font-light">
                <p className="font-handwritten text-teal-200 text-lg leading-snug">
                  "{birthdayData.hiddenSecret.letterContent}"
                </p>

                <div className="pt-2 border-t border-white/5 space-y-2">
                  <span className="font-sans text-[10px] text-stone-500 uppercase font-semibold tracking-wider">
                    friendship statistics & roasts:
                  </span>
                  {birthdayData.hiddenSecret.bloopers.map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 rounded p-2">
                      <strong className="text-amber-300 font-bold block text-[11px]">
                        {item.title}
                      </strong>
                      <span className="text-stone-400 text-[10px]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guide Footer */}
      <div className="text-center text-[11px] font-sans text-stone-400 z-10 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5">
        <Star className="h-3 w-3 text-teal-300 fill-teal-300" />
        <span>Hidden portal keys are unlocked by actively exploring all realms.</span>
      </div>
    </div>
  );
};
