import { Envelope } from "./Envelope";
import { birthdayData } from "@/config/birthdayData";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardLettersProps {
  onCollectStar: (id: string) => void;
  collectedStars: string[];
}

export const DashboardLetters = ({
  onCollectStar,
  collectedStars,
}: DashboardLettersProps) => {
  const isCollected = collectedStars.includes("letter-envelope");

  const handleOpenLetter = () => {
    if (!isCollected) onCollectStar("letter-envelope");
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Section label */}
      <div className="text-center mb-12">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl md:text-6xl font-bold text-white tracking-tight"
          style={{ textShadow: "0 0 40px rgba(251,191,36,0.2)" }}
        >
          Letters From Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3 flex items-center justify-center gap-2"
        >
          <Mail className="h-3.5 w-3.5 text-amber-400" />
          Tap the envelope seal to open your letter
        </motion.p>
      </div>

      {/* Envelope — centered, no box, just floating */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", damping: 20 }}
        onClick={handleOpenLetter}
        className="w-full flex justify-center"
      >
        <Envelope
          title="A Note For You"
          paragraphs={birthdayData.celebrationLetter.paragraphs}
        />
      </motion.div>

      {/* Decorative floating petals / letter lines */}
      <div className="mt-12 max-w-xl mx-auto text-center space-y-1 pointer-events-none">
        {["• • •", "✦", "• • •"].map((d, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="text-amber-500/30 text-xs tracking-widest"
          >
            {d}
          </motion.p>
        ))}
      </div>
    </div>
  );
};
