import { useState } from "react";
import { motion } from "framer-motion";
import { birthdayData, MemoryMoment } from "@/config/birthdayData";
import { Star, Sparkles } from "lucide-react";
import { useSound } from "./SoundController";

interface MemoryConstellationProps {
  onCardClick: (moment: MemoryMoment) => void;
  onCollectStar: (id: string) => void;
  collectedStars: string[];
}

export const MemoryConstellation = ({
  onCardClick,
  onCollectStar,
  collectedStars,
}: MemoryConstellationProps) => {
  const { playPaperFlip } = useSound();
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);

  // Position coordinates for stars in the box
  const starPositions = [
    { id: "moment-1", x: "20%", y: "40%", label: "Chapter 1: How It Started" },
    { id: "moment-2", x: "50%", y: "70%", label: "Chapter 2: Midnights" },
    { id: "moment-3", x: "80%", y: "30%", label: "Chapter 3: Adventures" },
  ];

  const handleStarClick = (momentId: string) => {
    playPaperFlip();
    onCollectStar(momentId);
    const moment = birthdayData.moments.find((m) => m.id === momentId);
    if (moment) {
      onCardClick(moment);
    }
  };

  return (
    <div className="w-full relative h-[450px] bg-black/45 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div>
          <span className="font-handwritten text-rose-300 text-lg block">chapter 1</span>
          <h3 className="font-cinematic text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-200" />
            Memory Constellation
          </h3>
        </div>
        <span className="text-xs font-sans text-stone-400">
          Click stars to reveal memories
        </span>
      </div>

      {/* SVG Connecting Lines backdrop */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Draw lines from Star 1 to 2, and 2 to 3 */}
        <motion.path
          d="M 20% 40% L 50% 70% L 80% 30%"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          strokeDasharray="6,6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Interactive Star Nodes */}
      <div className="absolute inset-0 z-10">
        {starPositions.map((pos) => {
          const isCollected = collectedStars.includes(pos.id);
          const isHovered = hoveredStar === pos.id;

          return (
            <div
              key={pos.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center group"
              style={{ left: pos.x, top: pos.y }}
              onMouseEnter={() => setHoveredStar(pos.id)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={() => handleStarClick(pos.id)}
            >
              {/* Star Core with Pulse rings */}
              <div className="relative">
                {/* Glowing ring */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`absolute -inset-2.5 rounded-full blur-[4px] opacity-60 ${
                    isCollected ? "bg-amber-400/40" : "bg-blue-400/40"
                  }`}
                />

                <motion.div
                  whileHover={{ scale: 1.25 }}
                  className={`h-9 w-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isCollected
                      ? "bg-amber-400/10 border-amber-400/30 text-amber-300"
                      : "bg-blue-400/10 border-blue-400/30 text-blue-300 hover:border-amber-400/50 hover:text-amber-200"
                  }`}
                >
                  <Star className={`h-4.5 w-4.5 ${isCollected ? "fill-amber-400 text-amber-400" : ""}`} />
                </motion.div>
              </div>

              {/* Label that fades in on hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered || isCollected ? 1 : 0.4, y: 0 }}
                className="mt-2.5 px-2 py-0.5 rounded bg-black/60 border border-white/10"
              >
                <span className="font-handwritten text-sm text-stone-200 block whitespace-nowrap">
                  {pos.label} {isCollected && "✔"}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Guide Footer */}
      <div className="text-center text-[11px] font-sans text-stone-400 z-10 pt-4 border-t border-white/5">
        Each star holds a fragment of a key memory. Tap to collect it.
      </div>
    </div>
  );
};
