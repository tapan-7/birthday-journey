import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HelpCircle } from "lucide-react";
import { useSound } from "./SoundController";
import confetti from "canvas-confetti";

interface WishingWellProps {
  onCollectStar: (id: string) => void;
  collectedStars: string[];
}

export const WishingWell = ({
  onCollectStar,
  collectedStars,
}: WishingWellProps) => {
  const { playPaperFlip } = useSound();
  const [wishText, setWishText] = useState("");
  const [isThrew, setIsThrew] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isCollected = collectedStars.includes("wishing-well");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim() || isAnimating || isThrew || isCollected) return;

    playPaperFlip(); // Sound
    setIsAnimating(true);

    // After coin drop animation completes (1.5s)
    setTimeout(() => {
      setIsAnimating(false);
      setIsThrew(true);
      onCollectStar("wishing-well");

      // Starburst confetti from the well
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7, x: 0.5 },
        colors: ["#fbbf24", "#fda4af", "#a7f3d0"],
      });
    }, 1500);
  };

  return (
    <div className="w-full relative h-[450px] bg-black/45 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div>
          <span className="font-handwritten text-rose-300 text-lg block">chapter 5</span>
          <h3 className="font-cinematic text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-rose-300" />
            The Wishing Well
          </h3>
        </div>
        <span className="text-xs font-sans text-stone-400">
          Throw a coin, make a wish
        </span>
      </div>

      {/* Animation Area: Coin Dropping */}
      <div className="relative flex-grow flex flex-col items-center justify-center my-4 z-10">
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ y: -100, x: 0, rotate: 0, scale: 1.5 }}
              animate={{
                y: 130,
                rotate: 720,
                scale: [1.5, 1, 0.8],
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.55, 0, 1, 0.45] }}
              className="absolute z-20 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 border border-yellow-200 shadow-[0_0_15px_rgba(251,191,36,0.8)] flex items-center justify-center"
            >
              <span className="font-sans text-[10px] font-bold text-amber-950">W</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Well Circle */}
        <div className="relative w-36 h-36 rounded-full border-4 border-dashed border-stone-700/60 bg-black/25 flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-2 rounded-full border border-stone-800/40 bg-gradient-to-b from-stone-900/10 to-indigo-900/30 flex items-center justify-center">
            {isThrew || isCollected ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center p-2"
              >
                <Sparkles className="h-7 w-7 text-amber-300 mx-auto animate-pulse" />
                <span className="font-handwritten text-stone-300 text-xs block mt-1">Wish Cast</span>
              </motion.div>
            ) : (
              <HelpCircle className="h-6 w-6 text-stone-600 animate-pulse" />
            )}
          </div>

          {/* Ripple rings when coin lands */}
          {isAnimating && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.8, opacity: [0, 0.5, 0] }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
            />
          )}
        </div>
      </div>

      {/* Input / Message panel */}
      <div className="z-10 bg-white/5 border border-white/10 rounded-xl p-4">
        {isThrew || isCollected ? (
          <div className="text-center py-2 space-y-1">
            <span className="font-handwritten text-xl text-amber-300 block">
              "Your wish has been thrown into the deep sea of dreams."
            </span>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-widest">
              May the universe align to make it true
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              required
              disabled={isAnimating}
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="Type your secret wish here..."
              className="w-full px-3.5 py-2 rounded bg-black/60 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={isAnimating || !wishText.trim()}
              className="w-full py-2 rounded bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 font-sans font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Throw Wish</span>
              <Sparkles className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </div>

      {/* Guide Footer */}
      <div className="text-center text-[11px] font-sans text-stone-400 z-10 pt-4 border-t border-white/5">
        Write a secret wish. Your wish remains anonymous, cast into the deep.
      </div>
    </div>
  );
};
