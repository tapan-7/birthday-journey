import { useSound } from "./SoundController";
import { Play, Pause, SkipForward, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const MusicPlayer = () => {
  const { isPlaying, togglePlay } = useSound();
  const [isExpanded, setIsExpanded] = useState(false);

  // Define numbers of visualizer bars
  const barCount = 6;

  return (
    <motion.div 
      layout
      className="relative flex items-center bg-black/50 border border-white/10 rounded-full shadow-lg backdrop-blur select-none cursor-pointer overflow-hidden"
      onClick={() => !isExpanded && setIsExpanded(true)}
      style={{
        padding: isExpanded ? "6px 16px 6px 6px" : "6px",
        gap: isExpanded ? "16px" : "0px"
      }}
    >
      {/* Circular Button / Vinyl Icon */}
      <motion.div
        layout
        onClick={(e) => {
          if (isExpanded) {
            e.stopPropagation();
            setIsExpanded(false);
          }
        }}
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="w-10 h-10 rounded-full bg-gradient-to-tr from-stone-800 to-stone-900 border border-white/20 flex items-center justify-center relative shrink-0 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-3 h-3 rounded-full bg-black border border-white/40 z-10" />
        <Music className="h-4 w-4 text-stone-400 absolute" />
        
        {/* Glow effect when playing and collapsed */}
        {isPlaying && !isExpanded && (
          <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/30 -z-10" />
        )}
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 overflow-hidden whitespace-nowrap"
          >
            {/* Title & Artist */}
            <div className="flex flex-col justify-center min-w-[80px]">
              <h4 className="font-sans text-xs font-semibold text-stone-100 leading-tight">
                Perfect
              </h4>
              <p className="font-sans text-[10px] text-stone-400 leading-none mt-0.5">
                Ed Sheeran
              </p>
            </div>

            {/* Bouncing audio wave visualizer */}
            <div className="flex gap-0.5 items-end h-3 shrink-0 px-1">
              {Array(barCount)
                .fill(0)
                .map((_, i) => {
                  const delay = i * 0.15;
                  return (
                    <div
                      key={i}
                      style={{
                        animationDelay: `${delay}s`,
                        animationPlayState: isPlaying ? "running" : "paused",
                        height: "100%",
                      }}
                      className="visualizer-bar"
                    />
                  );
                })}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 border-l border-white/10 pl-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="p-1 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? "Pause Ambient" : "Play Ambient"}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="p-1 rounded-full hover:bg-white/10 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                title="Toggle playback"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
