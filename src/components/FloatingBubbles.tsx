import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData, FunMemory } from "@/config/birthdayData";
import { Sparkles, X, ArrowRight } from "lucide-react";
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
  const [poppedBubbles, setPoppedBubbles] = useState<string[]>([]);

  // Generate 20 bubbles from the available funMemories
  const bubbleItems = useMemo(() => {
    const items = [];
    const memories = birthdayData.funMemories;
    if (!memories || memories.length === 0) return [];
    
    for (let i = 0; i < 20; i++) {
      const memory = memories[i % memories.length];
      const size = 60 + Math.random() * 50; // Random size between 60 and 110
      
      const hues = [
        "from-purple-500/20 to-blue-500/20",
        "from-pink-500/20 to-purple-500/20",
        "from-blue-500/20 to-cyan-500/20",
        "from-rose-500/20 to-pink-500/20"
      ];
      const glows = [
        "rgba(168,85,247,.4)",
        "rgba(236,72,153,.4)",
        "rgba(59,130,246,.4)",
        "rgba(244,63,94,.4)"
      ];
      
      const colorIndex = i % hues.length;

      items.push({
        id: `bubble-${i}-${memory.id}`,
        memoryId: memory.id,
        x: `${5 + Math.random() * 85}%`, // Random X position (5% to 90%)
        size,
        delay: Math.random() * 5, // Random initial delay
        hue: hues[colorIndex],
        glow: glows[colorIndex]
      });
    }
    return items;
  }, []);

  const handleBubbleClick = (bubbleId: string, memoryId: string) => {
    playPaperFlip();
    onCollectStar(memoryId);
    
    const fun = birthdayData.funMemories.find((f) => f.id === memoryId);
    if (fun) {
      setActiveMemory(fun);
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#c084fc", "#e879f9", "#38bdf8"],
      });
    }

    // Add to popped state
    setPoppedBubbles((prev) => [...prev, bubbleId]);

    // Respawn after 5 seconds
    setTimeout(() => {
      setPoppedBubbles((prev) => prev.filter((id) => id !== bubbleId));
    }, 5000);
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
          Floating Stories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3"
        >
          Pop a bubble to reveal a memory ✨
        </motion.p>
      </div>

      {/* Bubble play field */}
      <div className="relative w-full overflow-hidden" style={{ height: "450px" }}>
        {bubbleItems.map((item) => {
          const isPopped = poppedBubbles.includes(item.id);
          const memory = birthdayData.funMemories.find((f) => f.id === item.memoryId);

          return (
            <AnimatePresence key={item.id}>
              {!isPopped && (
                <motion.button
                  initial={{ y: 550, opacity: 0 }}
                  animate={{ y: [550, -100], x: [0, Math.sin(item.delay) * 20, 0], opacity: [0, 1, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 12 + item.delay * 2, // Float slowly upwards
                    delay: item.delay,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleBubbleClick(item.id, item.memoryId)}
                  style={{
                    position: "absolute",
                    left: item.x,
                    width: item.size,
                    height: item.size,
                    boxShadow: `0 0 20px ${item.glow}, inset 0 0 15px rgba(255,255,255,0.15)`,
                  }}
                  className={`rounded-full bg-gradient-to-tr ${item.hue} border border-white/20 flex flex-col items-center justify-center cursor-pointer select-none backdrop-blur-sm z-10`}
                >
                  <div className="absolute top-[15%] left-[20%] w-[30%] h-[25%] rounded-full bg-white/30 blur-[2px]" />
                  <Sparkles className="h-3 w-3 text-white/50 mb-0.5" />
                  <span className="font-sans text-[9px] font-bold text-white/70 text-center px-1 leading-tight truncate w-full max-w-[80%]">
                    {memory?.jokeTitle.split(" ").slice(0, 1).join(" ")}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          );
        })}

        {/* Ambient floating mini particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${(i * 9.7) % 100}%`,
              width: 3, height: 3,
              background: ["#c084fc","#f472b6","#60a5fa","#34d399"][i % 4],
              opacity: 0.2,
            }}
            animate={{ y: [0, -400], opacity: [0.2, 0] }}
            transition={{ repeat: Infinity, duration: 6 + i, delay: i * 0.8, ease: "linear" }}
          />
        ))}
      </div>

      {/* Popped memory overlay (Dubai Safari Style) */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xl"
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-sm w-full h-[550px] rounded-[32px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Image filling the card */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeMemory.image})` }}
              />
              
              {/* Top Gradient for text readability */}
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
              
              {/* Elegant floating title at top */}
              <div className="absolute top-8 inset-x-0 text-center">
                <h3 className="font-cinematic text-5xl text-white/90 font-light tracking-wide mix-blend-overlay">
                  Memory
                </h3>
              </div>

              {/* Bottom Glassmorphism Panel */}
              <div className="absolute inset-x-0 bottom-0 p-6 pt-12 pb-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[2px]">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-sans text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                      {activeMemory.jokeTitle}
                    </h4>
                    <p className="font-sans text-sm text-stone-200 leading-relaxed drop-shadow-md opacity-90 line-clamp-3">
                      {activeMemory.caption}
                    </p>
                  </div>
                  
                  {/* Arrow Button */}
                  <button 
                    onClick={() => setActiveMemory(null)}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 hover:bg-white/30 hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
