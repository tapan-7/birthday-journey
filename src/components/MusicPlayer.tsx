import { useSound } from "./SoundController";
import { Play, Pause, SkipForward, Music } from "lucide-react";
import { motion } from "framer-motion";

export const MusicPlayer = () => {
  const { isPlaying, togglePlay } = useSound();

  // Define numbers of visualizer bars
  const barCount = 6;

  return (
    <div className="flex items-center gap-4 bg-black/50 border border-white/10 rounded-full py-1.5 px-4 max-w-[280px] w-full shadow-lg backdrop-blur select-none">
      
      {/* Vinyl Icon / Album Cover */}
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="w-8 h-8 rounded-full bg-gradient-to-tr from-stone-800 to-stone-900 border border-white/20 flex items-center justify-center relative shrink-0"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/40" />
        <Music className="h-3.5 w-3.5 text-stone-400 absolute" />
      </motion.div>

      {/* Title & Artist */}
      <div className="flex-grow min-w-0">
        <h4 className="font-sans text-xs font-semibold text-stone-100 truncate leading-tight">
          Perfect
        </h4>
        <p className="font-sans text-[10px] text-stone-400 truncate leading-none mt-0.5">
          Ed Sheeran
        </p>
      </div>

      {/* Bouncing audio wave visualizer */}
      <div className="flex gap-0.5 items-end h-3 shrink-0 px-1">
        {Array(barCount)
          .fill(0)
          .map((_, i) => {
            // Random animation delay for wave organic feel
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
          onClick={togglePlay}
          className="p-1 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
          title={isPlaying ? "Pause Ambient" : "Play Ambient"}
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5 fill-current" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-current" />
          )}
        </button>
        <button
          onClick={togglePlay}
          className="p-1 rounded-full hover:bg-white/10 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          title="Toggle playback"
        >
          <SkipForward className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
