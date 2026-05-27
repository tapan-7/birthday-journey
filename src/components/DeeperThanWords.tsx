import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData, EmotionalMoment } from "@/config/birthdayData";
import { Heart, Sparkles } from "lucide-react";
import { useSound } from "./SoundController";

interface DeeperThanWordsProps {
  onCollectStar: (id: string) => void;
  collectedStars: string[];
}

export const DeeperThanWords = ({
  onCollectStar,
  collectedStars,
}: DeeperThanWordsProps) => {
  const { playPaperFlip } = useSound();
  const [activeMoment, setActiveMoment] = useState<EmotionalMoment | null>(null);

  const handleCardClick = (momentId: string) => {
    playPaperFlip();
    onCollectStar(momentId);
    const moment = birthdayData.emotionalMemories.find((m) => m.id === momentId);
    if (moment) {
      setActiveMoment(moment);
    }
  };

  return (
    <div className="w-full relative h-[450px] bg-black/45 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div>
          <span className="font-handwritten text-pink-300 text-lg block">chapter 3</span>
          <h3 className="font-cinematic text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Heart className="h-4 w-4 text-pink-300" />
            Deeper Than Words
          </h3>
        </div>
        <span className="text-xs font-sans text-stone-400">
          Unlock core moments
        </span>
      </div>

      {/* Cards Display Grid */}
      <div className="relative flex-grow flex items-center justify-center gap-6 my-4 z-10">
        {birthdayData.emotionalMemories.map((em, idx) => {
          const isCollected = collectedStars.includes(em.id);
          return (
            <motion.div
              key={em.id}
              whileHover={{ scale: 1.05, y: -4 }}
              onClick={() => handleCardClick(em.id)}
              className={`w-36 h-48 bg-stone-900 border rounded-xl p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                isCollected
                  ? "border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                  : "border-white/10 hover:border-pink-500/20"
              }`}
            >
              <div className="relative aspect-square w-full rounded overflow-hidden bg-stone-850">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={em.image}
                  alt=""
                  className="w-full h-full object-cover filter brightness-[0.7] grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <Heart className={`h-4.5 w-4.5 absolute bottom-1.5 right-1.5 ${isCollected ? "text-pink-400 fill-pink-400" : "text-stone-400"}`} />
              </div>
              <div className="text-center pt-2">
                <span className="font-handwritten text-sm text-stone-300 block">
                  Moment {idx + 1}
                </span>
                <span className="text-[10px] text-stone-500 block uppercase tracking-widest mt-0.5">
                  {isCollected ? "unlocked" : "locked"}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Floating details overlay */}
        <AnimatePresence>
          {activeMoment && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-stone-900/90 backdrop-blur border border-pink-500/30 rounded-xl p-5 z-20 flex flex-col gap-3 shadow-2xl"
            >
              <div className="flex items-center gap-1.5 text-pink-400">
                <Heart className="h-4 w-4" />
                <span className="font-sans text-[10px] uppercase font-bold tracking-wider">
                  Core Memory Details
                </span>
              </div>
              <h4 className="font-emotional text-lg italic text-stone-100">
                “{activeMoment.quote}”
              </h4>
              <p className="font-sans text-xs text-stone-400 leading-relaxed font-light">
                {activeMoment.story}
              </p>
              <button
                onClick={() => setActiveMoment(null)}
                className="mt-2 self-end px-3 py-1 rounded bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 font-sans text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guide Footer */}
      <div className="text-center text-[11px] font-sans text-stone-400 z-10 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5">
        <Sparkles className="h-3 w-3 text-pink-300" />
        <span>Click memory boxes to read comfort words & stories.</span>
      </div>
    </div>
  );
};
