import { Envelope } from "./Envelope";
import { birthdayData } from "@/config/birthdayData";
import { Mail, Sparkles } from "lucide-react";

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
    if (!isCollected) {
      onCollectStar("letter-envelope");
    }
  };

  return (
    <div className="w-full relative h-[450px] bg-black/45 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div>
          <span className="font-handwritten text-amber-300 text-lg block">chapter 4</span>
          <h3 className="font-cinematic text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Mail className="h-4 w-4 text-amber-300" />
            Letters From Me
          </h3>
        </div>
        <span className="text-xs font-sans text-stone-400">
          Tap the envelope seal
        </span>
      </div>

      {/* 3D Envelope container */}
      <div className="relative flex-grow flex items-center justify-center z-10" onClick={handleOpenLetter}>
        <Envelope
          title="A Note For You"
          paragraphs={birthdayData.celebrationLetter.paragraphs}
        />
      </div>

      {/* Guide Footer */}
      <div className="text-center text-[11px] font-sans text-stone-400 z-10 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5">
        <Sparkles className="h-3 w-3 text-amber-300" />
        <span>Open the envelope to read a handwritten letter from my heart.</span>
      </div>
    </div>
  );
};
