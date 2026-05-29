import { birthdayData } from "@/config/birthdayData";
import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { useSound } from "@/components/SoundController";

interface EndingSectionProps {
  onReplayClick: () => void;
}

export const EndingSection = ({ onReplayClick }: EndingSectionProps) => {
  const { playCameraShutter } = useSound();

  const handleReplay = () => {
    playCameraShutter();
    onReplayClick();
  };

  // Coordinates and images for floating end memories
  const floatingEndMemories = [
    { image: "/Alien/IMG-20230620-WA0001.jpg", delay: 0, left: "10%", size: 100 },
    { image: "/Alien/IMG-20240314-WA0003.jpg", delay: 2, left: "75%", size: 120 },
    { image: "/Alien/IMG_20250125_233813758.jpg", delay: 4, left: "20%", size: 110 },
    { image: "/Alien/IMG_20250126_065058525.jpg", delay: 1, left: "85%", size: 90 },
    { image: "/Alien/IMG_20250126_134338452.jpg", delay: 3, left: "65%", size: 115 },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09080a] text-white px-6 overflow-hidden select-none z-10">
      
      {/* Dark sky glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,29,149,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating upward memories loop */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {floatingEndMemories.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ y: "110vh", opacity: 0, rotate: idx * 8 - 15 }}
            animate={{
              y: "-20vh",
              opacity: [0, 0.4, 0.4, 0],
              rotate: [idx * 8 - 15, idx * 8 - 5, idx * 8 - 25],
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              delay: m.delay,
              ease: "linear",
            }}
            className="absolute rounded-lg border border-white/10 shadow-lg p-2 bg-[#fcfbfa]"
            style={{
              left: m.left,
              width: `${m.size}px`,
              aspectRatio: "1",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.image}
              alt=""
              className="w-full h-full object-cover rounded filter grayscale sepia opacity-80"
            />
          </motion.div>
        ))}
      </div>

      <div className="z-10 max-w-2xl w-full text-center space-y-8">
        
        {/* Heart logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 15 }}
          className="flex justify-center"
        >
          <div className="h-14 w-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Heart className="h-6 w-6 animate-pulse" />
          </div>
        </motion.div>

        {/* Closing text */}
        <div className="space-y-4">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-emotional text-3xl md:text-5xl font-light italic leading-relaxed text-stone-100"
          >
            “{birthdayData.ending.finalMessage}”
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="font-handwritten text-2xl text-rose-300 md:text-3xl"
          >
            {birthdayData.ending.subText}
          </motion.p>
        </div>

        {/* Sparkle divider */}
        <div className="flex justify-center py-4">

        </div>

        {/* Replay journey button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-6"
        >
          <button
            onClick={handleReplay}
            className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white/40 text-stone-300 hover:text-white font-sans text-xs tracking-wider uppercase bg-transparent transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mx-auto"
          >
            <span>Replay the Journey</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </div>

      {/* Credit signature */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-30 text-[10px] uppercase tracking-widest text-stone-500 font-semibold font-sans">
        made with love for a best friend
      </div>
    </section>
  );
};
