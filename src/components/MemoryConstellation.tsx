import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData, MemoryMoment } from "@/config/birthdayData";
import { Star, X } from "lucide-react";
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
  const [activeMoment, setActiveMoment] = useState<MemoryMoment | null>(null);

  const starPositions = [
    { id: "moment-1", x: "18%",  y: "38%", label: "How It Started",      size: "lg" },
    { id: "moment-2", x: "52%",  y: "62%", label: "Midnight Conversations", size: "md" },
    { id: "moment-3", x: "78%",  y: "28%", label: "Our Adventures",      size: "lg" },
  ];

  const handleStarClick = (momentId: string) => {
    playPaperFlip();
    onCollectStar(momentId);
    const moment = birthdayData.moments.find((m) => m.id === momentId);
    if (moment) {
      setActiveMoment(moment);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Section label */}
      <div className="text-center mb-12">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl md:text-6xl font-bold text-white tracking-tight"
          style={{ textShadow: "0 0 40px rgba(96,165,250,0.3)" }}
        >
          Memory Constellation
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3 max-w-md mx-auto"
        >
          Each star holds a memory. Click to illuminate it.
        </motion.p>
      </div>

      {/* Interactive star field — free floating, no box */}
      <div className="relative w-full" style={{ height: "420px" }}>
        {/* SVG constellation lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
          <defs>
            <linearGradient id="starLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.25" />
              <stop offset="50%"  stopColor="#ec4899" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 18% 38% L 52% 62% L 78% 28%"
            fill="none"
            stroke="url(#starLineGrad)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Stars */}
        {starPositions.map((pos, i) => {
          const isCollected = collectedStars.includes(pos.id);
          const isHovered   = hoveredStar === pos.id;
          const big = pos.size === "lg";

          return (
            <div
              key={pos.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center"
              style={{ left: pos.x, top: pos.y }}
              onMouseEnter={() => setHoveredStar(pos.id)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={() => handleStarClick(pos.id)}
            >
              {/* Outer pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.7 }}
                className={`absolute rounded-full ${isCollected ? "bg-amber-400/30" : "bg-blue-400/20"}`}
                style={{ width: big ? 90 : 70, height: big ? 90 : 70 }}
              />

              {/* Star icon */}
              <motion.div
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isCollected ? 360 : 0 }}
                transition={{ duration: 0.6 }}
                className={`relative rounded-full flex items-center justify-center border transition-all duration-400 ${
                  big ? "w-14 h-14" : "w-11 h-11"
                } ${
                  isCollected
                    ? "bg-amber-400/15 border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.5)]"
                    : "bg-blue-500/10 border-blue-400/30 hover:border-blue-300/60 hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]"
                }`}
              >
                <Star
                  className={`${big ? "h-6 w-6" : "h-5 w-5"} ${
                    isCollected ? "fill-amber-300 text-amber-300" : "text-blue-300"
                  }`}
                />
              </motion.div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered || isCollected ? 1 : 0.3 }}
                className="mt-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10"
              >
                <span className="font-handwritten text-sm text-stone-200 whitespace-nowrap">
                  {pos.label} {isCollected && "✦"}
                </span>
              </motion.div>
            </div>
          );
        })}

        {/* Decorative mini stars scattered */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`mini-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              left: `${10 + (i * 8.1) % 80}%`,
              top:  `${15 + (i * 11.3) % 70}%`,
            }}
            animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.8, 1.3, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 + (i % 3), delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Memory detail overlay — floats freely over the page */}
      <AnimatePresence>
        {activeMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            onClick={() => setActiveMoment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-video mb-4 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeMoment.image}
                  alt={activeMoment.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-cinematic text-2xl font-bold text-white">{activeMoment.title}</h3>
                  <p className="font-handwritten text-blue-200 text-lg mt-1">{activeMoment.caption}</p>
                </div>
              </div>
              <p className="font-sans text-stone-300 text-sm leading-relaxed text-center px-2">
                {activeMoment.story}
              </p>
              <button
                onClick={() => setActiveMoment(null)}
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
