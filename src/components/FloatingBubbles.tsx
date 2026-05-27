import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData, FunMemory } from "@/config/birthdayData";
import { MessageCircle, Sparkles } from "lucide-react";
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

  // Position and drift offsets for bubbles
  const bubbleItems = [
    { id: "fun-1", x: "15%", y: "60%", size: 60, delay: 0 },
    { id: "fun-2", x: "40%", y: "45%", size: 65, delay: 1.5 },
    { id: "fun-3", x: "65%", y: "65%", size: 55, delay: 0.8 },
    { id: "fun-4", x: "85%", y: "50%", size: 70, delay: 2.2 },
  ];

  const handleBubbleClick = (funId: string) => {
    playPaperFlip(); // play sound
    onCollectStar(funId);
    
    const fun = birthdayData.funMemories.find((f) => f.id === funId);
    if (fun) {
      setActiveMemory(fun);
      // Small burst of bubbles confetti
      confetti({
        particleCount: 15,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#c084fc", "#e879f9", "#38bdf8"],
      });
    }
  };

  return (
    <div className="w-full relative h-[450px] bg-black/45 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div>
          <span className="font-handwritten text-purple-300 text-lg block">chapter 2</span>
          <h3 className="font-cinematic text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-purple-300" />
            Floating Memories
          </h3>
        </div>
        <span className="text-xs font-sans text-stone-400">
          Pop bubbles to read roasts
        </span>
      </div>

      {/* Bubble Play Field */}
      <div className="relative flex-grow w-full my-4 z-10">
        {bubbleItems.map((item) => {
          const isPopped = collectedStars.includes(item.id);
          const memory = birthdayData.funMemories.find((f) => f.id === item.id);

          return (
            <AnimatePresence key={item.id}>
              {!isPopped && (
                <motion.div
                  initial={{ y: 280, opacity: 0 }}
                  animate={{
                    y: [280, -20, 280],
                    x: [0, 10, -10, 0],
                    opacity: 1,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    delay: item.delay,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => handleBubbleClick(item.id)}
                  style={{
                    position: "absolute",
                    left: item.x,
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                  }}
                  className="rounded-full bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-blue-500/20 border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1),inset_0_0_10px_rgba(255,255,255,0.2)] flex items-center justify-center cursor-pointer select-none"
                >
                  {/* Glowing core */}
                  <div className="h-3.5 w-3.5 rounded-full bg-white/20 blur-[1px] absolute top-[20%] left-[20%]" />
                  <span className="font-handwritten text-xs font-bold text-purple-200 block drop-shadow">
                    {memory?.jokeTitle.split(" ")[0]}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}

        {/* Revealed memory card detail */}
        <AnimatePresence>
          {activeMemory && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-stone-900/90 backdrop-blur border border-purple-500/30 rounded-xl p-5 z-20 flex flex-col md:flex-row gap-4 items-center shadow-2xl"
            >
              {/* Polaroid Image */}
              <div className="w-24 h-24 shrink-0 rounded bg-white p-1 shadow-md rotate-[-2deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeMemory.image}
                  alt={activeMemory.jokeTitle}
                  className="w-full h-full object-cover rounded filter grayscale"
                />
              </div>

              {/* Detail Content */}
              <div className="flex-grow text-center md:text-left space-y-1.5">
                <span className="inline-block px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-sans text-[10px] uppercase font-semibold">
                  {activeMemory.jokeTitle}
                </span>
                <p className="font-handwritten text-stone-100 text-lg leading-snug">
                  "{activeMemory.caption}"
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveMemory(null)}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-stone-300 font-sans text-xs transition-colors shrink-0"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guide Footer */}
      <div className="text-center text-[11px] font-sans text-stone-400 z-10 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5">
        <Sparkles className="h-3 w-3 text-purple-300" />
        <span>Click the rising bubble spheres to unlock roasts & stories.</span>
      </div>
    </div>
  );
};
