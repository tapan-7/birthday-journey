import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData, EmotionalMoment } from "@/config/birthdayData";
import { Heart, X } from "lucide-react";
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
    if (moment) setActiveMoment(moment);
  };

  return (
    <div className="relative w-full flex flex-col">
      {/* Section label */}
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-handwritten text-pink-300 text-2xl mb-2"
          style={{ textShadow: "0 0 20px rgba(236,72,153,0.5)" }}
        >
          chapter 3
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl md:text-6xl font-bold text-white tracking-tight"
          style={{ textShadow: "0 0 40px rgba(236,72,153,0.3)" }}
        >
          Deeper Than Words
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-emotional italic text-rose-300 text-xl mt-4 max-w-lg mx-auto"
        >
          "The moments that meant everything."
        </motion.p>
      </div>

      {/* Quote strip — full width */}
      <div className="w-full mb-12 overflow-hidden">
        <div className="flex gap-8 items-center justify-center flex-wrap px-4">
          {birthdayData.emotionalQuotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="max-w-xs text-center"
            >
              <p className="font-emotional italic text-stone-300 text-lg leading-relaxed">
                "{q}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Memory cards — large, free floating side by side */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full px-4">
        {birthdayData.emotionalMemories.map((em, idx) => {
          const isCollected = collectedStars.includes(em.id);

          return (
            <motion.div
              key={em.id}
              initial={{ opacity: 0, y: 40, rotate: idx % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: idx * 0.2, type: "spring", damping: 20 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleCardClick(em.id)}
              className="relative cursor-pointer group"
              style={{ maxWidth: 320 }}
            >
              {/* Full bleed image, no card border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]" style={{ width: 300 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={em.image}
                  alt=""
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isCollected ? "grayscale-0 brightness-90" : "grayscale brightness-75"
                  } group-hover:brightness-90 group-hover:grayscale-0`}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Heart icon */}
                <motion.div
                  animate={{ scale: isCollected ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-4 right-4"
                >
                  <Heart
                    className={`h-6 w-6 transition-all ${
                      isCollected ? "fill-pink-400 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" : "text-white/50"
                    }`}
                  />
                </motion.div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="font-handwritten text-pink-300 text-sm block mb-1">
                    Moment {idx + 1} {isCollected ? "✦ Unlocked" : "— Click to unlock"}
                  </span>
                  <p className="font-emotional italic text-white text-lg leading-snug line-clamp-2">
                    "{em.quote}"
                  </p>
                </div>

                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-2xl border border-pink-500/0 group-hover:border-pink-500/40 transition-all duration-500 shadow-[0_0_0_0_rgba(236,72,153,0)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Story overlay */}
      <AnimatePresence>
        {activeMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md"
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
              <div className="relative rounded-2xl overflow-hidden mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeMoment.image} alt="" className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="text-center space-y-4 px-2">
                <Heart className="h-6 w-6 fill-pink-400 text-pink-400 mx-auto" />
                <p className="font-emotional italic text-white text-2xl leading-relaxed">
                  "{activeMoment.quote}"
                </p>
                <p className="font-sans text-stone-300 text-sm leading-relaxed">
                  {activeMoment.story}
                </p>
              </div>

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
