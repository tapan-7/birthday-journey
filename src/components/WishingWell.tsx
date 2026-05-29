import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";
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

    playPaperFlip();
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      setIsThrew(true);
      onCollectStar("wishing-well");
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6, x: 0.5 },
        colors: ["#fbbf24", "#fda4af", "#a7f3d0"],
      });
    }, 1600);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Section label */}
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-handwritten text-rose-300 text-2xl mb-2"
          style={{ textShadow: "0 0 20px rgba(244,63,94,0.5)" }}
        >
          chapter 5
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl md:text-6xl font-bold text-white tracking-tight"
          style={{ textShadow: "0 0 40px rgba(244,63,94,0.25)" }}
        >
          The Wishing Well
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3"
        >
          Throw a coin and make a wish into the deep ✨
        </motion.p>
      </div>

      {/* Well visual — free floating, large */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", damping: 20 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Coin drop animation */}
        <div className="relative flex items-center justify-center" style={{ height: 180 }}>
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ y: -120, x: 0, rotate: 0, scale: 1.4, opacity: 1 }}
                animate={{ y: 80, rotate: 720, scale: [1.4, 0.9, 0.6], opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.55, 0, 1, 0.45] }}
                className="absolute z-20 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border border-yellow-200 flex items-center justify-center"
                style={{ boxShadow: "0 0 20px rgba(251,191,36,0.9)" }}
              >
                <span className="font-sans text-xs font-black text-amber-950">W</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Well — just concentric rings, no box */}
          <div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: 180,
              height: 180,
              background: "radial-gradient(circle, rgba(30,10,60,0.9) 0%, rgba(10,5,20,0.7) 100%)",
              border: "3px dashed rgba(255,255,255,0.12)",
              boxShadow: "0 0 60px rgba(99,102,241,0.15), inset 0 0 40px rgba(0,0,0,0.8)",
            }}
          >
            {/* Inner ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 140,
                height: 140,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />

            {isThrew || isCollected ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >

                <span className="font-handwritten text-stone-300 text-sm block mt-2">Wish Cast ✦</span>
              </motion.div>
            ) : (
              <HelpCircle className="h-8 w-8 text-stone-600 animate-pulse" />
            )}

            {/* Ripple rings */}
            {isAnimating && (
              <>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: [0, 0.4, 0] }}
                  transition={{ delay: 1.3, duration: 0.9 }}
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 2.2, opacity: [0, 0.2, 0] }}
                  transition={{ delay: 1.5, duration: 0.9 }}
                  className="absolute inset-0 rounded-full border border-cyan-400/20"
                />
              </>
            )}
          </div>
        </div>

        {/* Input panel — minimal, just text + button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm"
        >
          {isThrew || isCollected ? (
            <div className="text-center space-y-2">
              <p className="font-handwritten text-2xl text-amber-300">
                "Your wish has been cast into the universe."
              </p>
              <p className="font-sans text-[11px] text-stone-500 uppercase tracking-widest">
                May it find its way to you ✦
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                disabled={isAnimating}
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Type your secret wish here..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-amber-500/40 focus:bg-white/8 transition-all placeholder-stone-600"
              />
              <button
                type="submit"
                disabled={isAnimating || !wishText.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 disabled:opacity-40 text-white font-sans font-semibold text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2"
                style={{ boxShadow: wishText.trim() ? "0 0 20px rgba(251,191,36,0.3)" : undefined }}
              >

                Throw Wish into the Deep
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
