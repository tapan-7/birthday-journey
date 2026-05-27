import { birthdayData } from "@/config/birthdayData";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const EmotionalSection = () => {
  return (
    <div className="bg-[#09080a] text-white">
      {/* 1. Unexpected Emotional Intermission (Full-screen dark pause) */}
      <section className="relative h-screen w-full flex items-center justify-center px-6 overflow-hidden select-none z-10">
        
        {/* Soft centered amber glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-2xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.4, 0.4, 0] }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 4.5, times: [0, 0.2, 0.8, 1] }}
            className="flex justify-center"
          >
            <Heart className="h-6 w-6 text-rose-400/50 animate-pulse" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.7 }}
            transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
            className="font-emotional text-3xl md:text-5xl font-light italic leading-relaxed text-stone-100 tracking-wide"
          >
            “You probably don’t realize how important you are to people.”
          </motion.h3>
        </div>
      </section>

      {/* 2. Core Comfort Memories Cards */}
      <section className="relative py-28 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
        
        {/* Glowing lights in background */}
        <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-rose-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto w-full relative z-10 space-y-24">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-handwritten text-2xl text-stone-400 block"
            >
              comfort and quiet days
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cinematic text-3xl md:text-5xl font-extrabold tracking-tight"
            >
              Our Core Memories
            </motion.h2>
          </div>

          {/* Large wide memory cards */}
          <div className="space-y-32">
            {birthdayData.emotionalMemories.map((em, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={em.id}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Image wrapper with glass reflection & parallax scaling */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", damping: 25, stiffness: 80 }}
                    className="w-full lg:w-[55%] relative group"
                  >
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 rounded-xl z-10 pointer-events-none" />

                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <motion.img
                        src={em.image}
                        alt="Core memory"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.6 }}
                        className="h-full w-full object-cover filter brightness-[0.85]"
                      />
                    </div>
                  </motion.div>

                  {/* Text Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
                    className="w-full lg:w-[45%] space-y-5 text-left"
                  >
                    <span className="font-handwritten text-rose-300 text-2xl block">
                      — Memory {idx + 1}
                    </span>
                    <h3 className="font-emotional text-2xl md:text-3xl font-light italic leading-snug text-stone-100">
                      “{em.quote}”
                    </h3>
                    <p className="font-sans text-stone-400 text-sm md:text-base leading-relaxed font-light">
                      {em.story}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
