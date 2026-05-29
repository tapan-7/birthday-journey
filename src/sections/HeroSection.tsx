import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { birthdayData } from "@/config/birthdayData";
import { ArrowDown } from "lucide-react";
import { useSound } from "@/components/SoundController";

interface HeroSectionProps {
  onStartClick: () => void;
}

export const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  const { playKeyboardType } = useSound();

  // Typewriter container animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  // Letter animations
  const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const titleChars = Array.from(birthdayData.landingTitle);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09080a] text-white px-6 overflow-hidden select-none">
      {/* Background Image with blur, dark overlay, and slow zoom parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/Alien/IMG_20250125_155217829.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09080a] via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(251,247,244,0.08)_0%,transparent_50%)] pointer-events-none" />

      {/* Hero content */}
      <div className="z-10 max-w-3xl w-full text-center space-y-6 flex flex-col items-center">
        {/* Profile / Hero Picture */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            type: "spring",
            damping: 15,
            delay: 0.3,
          }}
          className="w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)] overflow-hidden bg-white/5 p-1 mb-2 relative"
        >
          <Image
            src="/Alien/DDO07689.JPG"
            alt="Best Friend"
            fill
            sizes="200px"
            className="object-cover rounded-full filter brightness-105"
            priority
          />
        </motion.div>

        {/* Animated sparkling badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2, damping: 15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-rose-300"
        >
          <span>A Best Friend's Gift</span>
        </motion.div>

        {/* Animated Typewriter Title */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationStart={playKeyboardType}
          className="font-cinematic text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-rose-200 to-amber-200 filter drop-shadow-md leading-tight"
        >
          {titleChars.map((char, index) => (
            <motion.span key={index} variants={childVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Slow cinematic subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
          className="max-w-xl mx-auto font-sans text-stone-300 text-base md:text-lg leading-relaxed font-light"
        >
          {birthdayData.landingSubtitle}
        </motion.p>

        {/* "Start the Journey" Action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2 }}
          className="pt-6"
        >
          <button
            onClick={onStartClick}
            className="px-8 py-3.5 rounded-full bg-white text-stone-900 hover:bg-[#faf7f4] font-sans font-semibold text-sm tracking-wider uppercase shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mx-auto"
          >
            <span>Start the Journey</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </motion.div>
      </div>

      {/* Ambient overlay details */}
      <div className="absolute bottom-10 left-10 hidden md:block z-10 pointer-events-none opacity-45">
        <p className="font-handwritten text-lg text-stone-400">
          scroll slowly to live the movie
        </p>
      </div>
    </div>
  );
};
