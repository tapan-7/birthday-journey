import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "@/config/birthdayData";
import { ALL_PHOTOS, PhotoItem } from "./PolaroidDriftGallery";
import { X, ArrowRight } from "lucide-react";
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
  const [activeMemory, setActiveMemory] = useState<PhotoItem | null>(null);
  const [poppedBubbles, setPoppedBubbles] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate 20 bubbles from the available funMemories
  const bubbleItems = useMemo(() => {
    const items = [];
    const funnyNames = ["Gadhedo", "Aalo", "Alien", "Pagala", "Harami", "Haramkhor", "Kukur"];
    for (let i = 0; i < ALL_PHOTOS.length; i++) {
      const bubbleWord = funnyNames[i % funnyNames.length];
      const memory = ALL_PHOTOS[i];
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
        x: `${2 + Math.random() * 85}vw`, // Use vw to spread across full screen
        size,
        delay: Math.random() * 45, // Spread out massively to relax them
        hue: hues[colorIndex],
        glow: glows[colorIndex],
        bubbleWord
      });
    }
    return items;
  }, []);

  const handleBubbleClick = (bubbleId: string, memoryId: string) => {
    playPaperFlip();
    onCollectStar(memoryId);
    
    const fun = ALL_PHOTOS.find((f) => f.id === memoryId);
    if (fun) {
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#c084fc", "#e879f9", "#38bdf8"],
      });
    }

    // Add to popped state
    setPoppedBubbles((prev) => [...prev, bubbleId]);
    
    if (fun) {
      setTimeout(() => {
        setActiveMemory(fun);
      }, 400); // Delay so the bubble pops before opening the dialog
    }

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

      {/* Bubble play field - Full viewport width */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden" style={{ height: "650px" }}>
        {bubbleItems.map((item) => {
          const isPopped = poppedBubbles.includes(item.id);
          const memory = ALL_PHOTOS.find((f) => f.id === item.memoryId);
          const floatDuration = 18 + (item.delay % 10);

          return (
            <AnimatePresence key={item.id}>
              {!isPopped && (
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleBubbleClick(item.id, item.memoryId)}
                  style={{
                    position: "absolute",
                    left: item.x,
                    width: item.size,
                    height: item.size,
                    willChange: "transform, opacity",
                    boxShadow: `inset 0 0 15px rgba(255,255,255,0.15)`,
                    animation: `bubble-float ${floatDuration}s linear infinite`,
                    animationDelay: `-${item.delay}s`,
                  }}
                  className={`rounded-full bg-gradient-to-tr ${item.hue} border border-white/20 flex flex-col items-center justify-center cursor-pointer select-none z-10 hover:brightness-110`}
                >
                  <div className="absolute top-[15%] left-[20%] w-[30%] h-[25%] rounded-full bg-white/30" />
                  <span className="font-sans text-[11px] font-bold text-white/90 text-center px-1 leading-tight truncate w-full max-w-[80%] uppercase tracking-wider shadow-sm">
                    {item.bubbleWord}
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
      {mounted && createPortal(
        <AnimatePresence>
          {activeMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xl"
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
              {/* Blurred Background filling the empty space */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl scale-110"
                style={{ backgroundImage: `url('${activeMemory.image}')` }}
              />
              {/* Actual Image containing the whole photo */}
              <div 
                className="absolute inset-0 bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url('${activeMemory.image}')` }}
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
                      {activeMemory.title}
                    </h4>
                    <p className="font-sans text-sm text-stone-200 leading-relaxed drop-shadow-md opacity-90 line-clamp-3">
                      {activeMemory.caption}
                    </p>
                  </div>
                  
                  {/* Close Button */}
                  <button 
                    onClick={() => setActiveMemory(null)}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 hover:bg-white/30 hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
};
