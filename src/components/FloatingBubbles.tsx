import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData, FunMemory } from "@/config/birthdayData";
import { Sparkles, X } from "lucide-react";
import { useSound } from "./SoundController";
import confetti from "canvas-confetti";

interface FloatingBubblesProps {
  onCollectStar: (id: string) => void;
  collectedStars: string[];
}

export const FloatingBubbles = ({
  onCollectStar,
  collectedStars,
}: FloatingBubblesProps) => {
  const { playPaperFlip } = useSound();
  const [activeMemory, setActiveMemory] = useState<FunMemory | null>(null);

  const bubbleItems = [
    { id: "fun-1", x: "12%",  size: 80, delay: 0,   hue: "from-purple-500/20 to-blue-500/20",    glow: "rgba(168,85,247,.4)" },
    { id: "fun-2", x: "35%",  size: 95, delay: 1.8, hue: "from-pink-500/20 to-purple-500/20",    glow: "rgba(236,72,153,.4)" },
    { id: "fun-3", x: "60%",  size: 72, delay: 0.9, hue: "from-blue-500/20 to-cyan-500/20",      glow: "rgba(59,130,246,.4)" },
    { id: "fun-4", x: "80%",  size: 88, delay: 2.5, hue: "from-rose-500/20 to-pink-500/20",      glow: "rgba(244,63,94,.4)"  },
  ];

  const handleBubbleClick = (funId: string) => {
    playPaperFlip();
    onCollectStar(funId);
    const fun = birthdayData.funMemories.find((f) => f.id === funId);
    if (fun) {
      setActiveMemory(fun);
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#c084fc", "#e879f9", "#38bdf8"],
      });
    }
  };

  return (
    <div className="relative w-full flex flex-col">
      {/* Section label */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-handwritten text-purple-300 text-2xl mb-2"
          style={{ textShadow: "0 0 20px rgba(168,85,247,0.5)" }}
        >
          chapter 2
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl md:text-6xl font-bold text-white tracking-tight"
          style={{ textShadow: "0 0 40px rgba(168,85,247,0.3)" }}
        >
          Floating Memories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3"
        >
          Pop a bubble to reveal a roast hiding inside ✨
        </motion.p>
      </div>

      {/* Bubble play field — no container, floats freely */}
      <div className="relative w-full" style={{ height: "420px" }}>
        {bubbleItems.map((item) => {
          const isPopped = collectedStars.includes(item.id);
          const memory   = birthdayData.funMemories.find((f) => f.id === item.id);

          return (
            <AnimatePresence key={item.id}>
              {!isPopped && (
                <motion.button
                  initial={{ y: 500, opacity: 0 }}
                  animate={{ y: [500, 0, 500], x: [0, 12, -8, 0], opacity: [0, 1, 1, 0.9] }}
                  transition={{
                    repeat: Infinity,
                    duration: 10 + item.delay * 0.8,
                    delay: item.delay,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleBubbleClick(item.id)}
                  style={{
                    position: "absolute",
                    left: item.x,
                    width: item.size,
                    height: item.size,
                    boxShadow: `0 0 30px ${item.glow}, inset 0 0 20px rgba(255,255,255,0.15)`,
                  }}
                  className={`rounded-full bg-gradient-to-tr ${item.hue} border border-white/25 flex flex-col items-center justify-center cursor-pointer select-none`}
                >
                  {/* Bubble highlight */}
                  <div className="absolute top-[15%] left-[20%] w-[30%] h-[25%] rounded-full bg-white/25 blur-[2px]" />
                  <Sparkles className="h-4 w-4 text-white/60 mb-0.5" />
                  <span className="font-handwritten text-xs font-bold text-white/80 text-center px-2 leading-tight">
                    {memory?.jokeTitle.split(" ").slice(0, 2).join(" ")}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          );
        })}

        {/* Ambient floating mini particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${(i * 12.7) % 90}%`,
              width: 4, height: 4,
              background: ["#c084fc","#f472b6","#60a5fa","#34d399"][i % 4],
              opacity: 0.3,
            }}
            animate={{ y: [0, -300], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 5 + i, delay: i * 1.2, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Popped memory overlay */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: "spring", damping: 22 }}
              className="relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Polaroid photo */}
              <div className="bg-white p-3 pb-10 rounded shadow-2xl rotate-[-1.5deg] mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeMemory.image}
                  alt={activeMemory.jokeTitle}
                  className="w-full aspect-video object-cover rounded-sm filter grayscale-[30%]"
                />
              </div>

              <div className="text-center space-y-3 px-4">
                <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200 font-sans text-xs uppercase tracking-wider">
                  {activeMemory.jokeTitle}
                </span>
                <p className="font-handwritten text-white text-xl leading-snug">
                  "{activeMemory.caption}"
                </p>
              </div>

              <button
                onClick={() => setActiveMemory(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
