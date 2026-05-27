import { motion } from "framer-motion";
import { useState } from "react";
import { useSound } from "./SoundController";
import { ZoomIn } from "lucide-react";

interface PolaroidCardProps {
  imageSrc: string;
  title: string;
  caption: string;
  story?: string;
  rotation?: number;
  onClick?: () => void;
}

export const PolaroidCard = ({
  imageSrc,
  title,
  caption,
  story,
  rotation = 0,
  onClick,
}: PolaroidCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playPaperFlip } = useSound();

  const handleHoverStart = () => {
    setIsHovered(true);
    playPaperFlip();
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", damping: 20, stiffness: 80 }}
      style={{ rotate: rotation }}
      whileHover={{ 
        scale: 1.05, 
        rotate: rotation > 0 ? rotation + 2 : rotation - 2,
        z: 50 
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="relative polaroid-frame cursor-pointer w-full max-w-[280px] md:max-w-[320px] mx-auto select-none"
      onClick={onClick}
    >
      {/* Visual Tape Effect */}
      <div className="tape-top" />

      {/* Polaroid Image Area */}
      <div className="relative aspect-square overflow-hidden rounded border border-black/5 bg-[#eae4d9] group">
        {/* Memory Reveal Transition: Start blurry, sharpen on hover */}
        <motion.img
          src={imageSrc}
          alt={title}
          animate={{ filter: isHovered ? "blur(0px)" : "blur(8px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full w-full object-cover select-none"
        />

        {/* Hover magnifier icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-md">
            <ZoomIn className="h-5 w-5 text-stone-700" />
          </div>
        </div>
      </div>

      {/* Story unfolding caption */}
      <div className="mt-4 text-left overflow-hidden">
        <h4 className="font-cinematic text-lg font-bold text-stone-800 tracking-tight">
          {title}
        </h4>
        
        {/* Handwritten text that appears to slightly shift/unfold on hover */}
        <motion.div
          animate={{ 
            y: isHovered ? 0 : 4,
            opacity: isHovered ? 1 : 0.8 
          }}
          transition={{ duration: 0.3 }}
          className="mt-2 pt-2 border-t border-stone-200/50"
        >
          <p className="font-handwritten text-xl text-rose-700 md:text-2xl leading-none">
            {caption}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
