import { birthdayData } from "@/config/birthdayData";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSound } from "@/components/SoundController";
import { Sparkles, MessageCircle } from "lucide-react";

export const ChaosSection = () => {
  const { playPaperFlip } = useSound();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleCardClick = (id: string) => {
    playPaperFlip();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative py-28 px-6 bg-[#0e0c10] text-white overflow-hidden min-h-screen select-none flex flex-col justify-center">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08)_0%,transparent_50%)]" />

      <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 15 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold uppercase tracking-widest text-purple-300"
          >
            <Sparkles className="h-3 w-3 animate-spin duration-3000" />
            <span>Chaos & Inside Jokes</span>
          </motion.div>
          
          <h2 className="font-cinematic text-4xl md:text-5xl font-extrabold tracking-tight text-stone-100">
            The Dumbest Moments
          </h2>
          
          <p className="font-sans text-stone-400 text-sm md:text-base font-light">
            Tap a card to flip it and reveal the embarrassing story behind the screenshot.
          </p>
        </div>

        {/* Scattered interactive card collage */}
        {/* Desktop floating absolute container */}
        <div className="relative h-[600px] w-full hidden md:block mt-12">
          {birthdayData.funMemories.map((fun) => {
            const isFlipped = flippedCards[fun.id] || false;

            return (
              <motion.div
                key={fun.id}
                style={{
                  position: "absolute",
                  left: `${fun.position.x}%`,
                  top: `${fun.position.y}%`,
                  width: "240px",
                  height: "300px",
                  perspective: 1000,
                }}
                whileHover={{ scale: 1.08, zIndex: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="cursor-pointer"
                onClick={() => handleCardClick(fun.id)}
              >
                <motion.div
                  className="relative w-full h-full duration-700 transform-style-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* Front Side: Polaroid Image */}
                  <div className="absolute inset-0 w-full h-full backface-hidden polaroid-frame bg-[#fcfbfa] text-[#2d2424] flex flex-col p-3 shadow-xl">
                    <div className="relative aspect-square w-full overflow-hidden bg-stone-200 border border-stone-300/40 rounded">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={fun.image}
                        alt={fun.jokeTitle}
                        className="h-full w-full object-cover filter blur-[2px] hover:blur-0 transition-[filter] duration-300"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-cinematic font-bold text-sm text-stone-800">
                        {fun.jokeTitle}
                      </span>
                      <MessageCircle className="h-3.5 w-3.5 text-stone-400 animate-pulse" />
                    </div>
                    <div className="mt-2 border-t border-stone-200/50 pt-2 text-center">
                      <span className="font-handwritten text-xs text-stone-400">click to read roast</span>
                    </div>
                  </div>

                  {/* Back Side: Inside joke caption / handwritten note */}
                  <div className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden paper-texture rounded p-6 shadow-xl flex flex-col items-center justify-center text-center text-stone-800 border-2 border-dashed border-rose-300/60">
                    <span className="font-handwritten text-rose-500 text-xl block mb-2">— Roast time —</span>
                    <h4 className="font-cinematic text-lg font-bold mb-3">{fun.jokeTitle}</h4>
                    <p className="font-handwritten text-xl leading-snug text-stone-700">
                      {fun.caption}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/Tablet fallback responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:hidden mt-8">
          {birthdayData.funMemories.map((fun) => {
            const isFlipped = flippedCards[fun.id] || false;

            return (
              <div
                key={fun.id}
                className="h-[320px] w-full max-w-[260px] mx-auto cursor-pointer"
                style={{ perspective: 1000 }}
                onClick={() => handleCardClick(fun.id)}
              >
                <motion.div
                  className="relative w-full h-full duration-700 transform-style-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full backface-hidden polaroid-frame bg-[#fcfbfa] text-[#2d2424] flex flex-col p-3 shadow-md">
                    <div className="relative aspect-square w-full overflow-hidden bg-stone-200 border border-stone-300/40 rounded">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={fun.image}
                        alt={fun.jokeTitle}
                        className="h-full w-full object-cover filter blur-[3px]"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-cinematic font-bold text-sm text-stone-800">
                        {fun.jokeTitle}
                      </span>
                      <MessageCircle className="h-3.5 w-3.5 text-stone-400" />
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden paper-texture rounded p-4 shadow-md flex flex-col items-center justify-center text-center text-stone-800">
                    <h4 className="font-cinematic text-base font-bold mb-2">{fun.jokeTitle}</h4>
                    <p className="font-handwritten text-lg text-stone-700">
                      {fun.caption}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
