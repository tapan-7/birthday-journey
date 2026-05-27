import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "@/config/birthdayData";
import { useSound } from "@/components/SoundController";
import { Lock, Sparkles } from "lucide-react";

interface MidnightUnlockProps {
  onUnlock: () => void;
}

export const MidnightUnlock = ({ onUnlock }: MidnightUnlockProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isBirthday: false });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [triggerFlash, setTriggerFlash] = useState(false);
  const { togglePlay, playCameraShutter } = useSound();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Target midnight of the birthday (May 28 or current year configured day)
      const targetDate = new Date(
        currentYear,
        birthdayData.birthdayMonth - 1,
        birthdayData.birthdayDay,
        0, 0, 0
      );

      // If the birthday has already passed this year, set target to next year
      if (now.getTime() > targetDate.getTime() + 24 * 60 * 60 * 1000) {
        targetDate.setFullYear(currentYear + 1);
      }

      const difference = targetDate.getTime() - now.getTime();

      // Check if it is the birthday (anytime during that day)
      const isBirthdayToday = 
        now.getMonth() === birthdayData.birthdayMonth - 1 &&
        now.getDate() === birthdayData.birthdayDay;

      if (difference <= 0 || isBirthdayToday) {
        return { hours: 0, minutes: 0, seconds: 0, isBirthday: true };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { hours, minutes, seconds, isBirthday: false };
    };

    // Initial check
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    playCameraShutter();
    // Start background music when entering
    togglePlay();
    // Trigger white camera flash overlay
    setTriggerFlash(true);
    setTimeout(() => {
      onUnlock();
    }, 850);
  };

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09080a] text-white px-6 overflow-hidden select-none">
      
      {/* Background stardust */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,30,50,0.4)_0%,transparent_70%)] z-0" />

      {/* Camera shutter flash effect */}
      <AnimatePresence>
        {triggerFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-[9999] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 max-w-md w-full text-center space-y-8 p-8 rounded-2xl glass-panel relative"
      >
        {/* Glow behind lock */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-rose-500/20 blur-xl pointer-events-none" />

        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-rose-300 shadow-inner"
          >
            <Lock className="h-7 w-7" />
          </motion.div>
        </div>

        <div className="space-y-3">
          <h2 className="font-cinematic text-3xl font-bold tracking-wide">
            A Secret Surprise...
          </h2>
          <p className="text-stone-400 font-sans text-sm tracking-wide">
            {timeLeft.isBirthday 
              ? "For a very special person on her special day."
              : "Made with love. Locked until midnight."}
          </p>
        </div>

        {/* Live Countdown Grid (only if not yet birthday) */}
        {!timeLeft.isBirthday && (
          <div className="grid grid-cols-3 gap-4 py-4 max-w-xs mx-auto border-y border-white/5">
            <div className="flex flex-col items-center">
              <span className="font-cinematic text-3xl font-extrabold tracking-widest text-rose-300">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold mt-1">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-cinematic text-3xl font-extrabold tracking-widest text-rose-300">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold mt-1">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-cinematic text-3xl font-extrabold tracking-widest text-rose-300">
                {formatNumber(timeLeft.seconds)}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold mt-1">Seconds</span>
            </div>
          </div>
        )}

        {/* Unlock Button */}
        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUnlock}
            disabled={isUnlocked}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 font-sans font-semibold text-sm tracking-wider uppercase text-white shadow-[0_0_24px_rgba(244,63,94,0.3)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <Sparkles className="h-4 w-4 text-amber-200 group-hover:animate-spin" />
            <span>{birthdayData.bypassUnlockText}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 font-handwritten text-lg text-stone-400"
      >
        “Time is measured in moments, not years...”
      </motion.p>
    </div>
  );
};
