import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSound } from "./SoundController";
import { MailOpen, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface EnvelopeProps {
  title: string;
  paragraphs: string[];
}

export const Envelope = ({ title, paragraphs }: EnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { playPaperFlip } = useSound();

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      playPaperFlip();
      // Wait for flap animation to complete before showing the full modal letter
      setTimeout(() => {
        setShowLetterModal(true);
      }, 800);
    }
  };

  const handleCloseModal = () => {
    setShowLetterModal(false);
    // Let envelope reset after a delay
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-10 w-full max-w-md mx-auto">
      {/* 3D Envelope container */}
      <motion.div
        className="relative w-72 h-48 bg-[#d8c2ab] rounded shadow-lg cursor-pointer flex items-center justify-center overflow-visible border border-[#c3ad96]"
        onClick={handleOpen}
        whileHover={{ scale: isOpen ? 1 : 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Envelope Top Flap */}
        <motion.div
          className="absolute top-0 left-0 w-0 h-0 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-t-[96px] border-t-[#cda989] z-[12]"
          style={{ originY: 0 }}
          animate={{
            rotateX: isOpen ? 180 : 0,
            y: isOpen ? -1 : 0,
            zIndex: isOpen ? 0 : 12,
          }}
          transition={{ duration: 0.6, delay: isOpen ? 0 : 0.4, ease: "easeInOut" }}
        />

        {/* Envelope Bottom/Side Flaps (Combined CSS visual) */}
        <div className="absolute inset-0 w-full h-full z-10 overflow-hidden rounded">
          {/* Left Flap */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[96px] border-t-transparent border-b-[96px] border-b-transparent border-l-[144px] border-l-[#d2baa1]" />
          {/* Right Flap */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[96px] border-t-transparent border-b-[96px] border-b-transparent border-r-[144px] border-r-[#d2baa1]" />
          {/* Bottom Flap */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-b-[96px] border-b-[#c7af96]" />
        </div>

        {/* Letter Peeking Out */}
        <motion.div
          className="absolute bottom-4 w-[260px] h-[140px] bg-[#fbfbf9] rounded shadow-inner z-[5] p-3 text-left overflow-hidden border border-stone-200"
          animate={{
            y: isOpen ? -80 : 0,
            scale: isOpen ? 1.02 : 0.95,
          }}
          transition={{ duration: 0.6, delay: isOpen ? 0.3 : 0, ease: "easeOut" }}
        >
          <h5 className="font-handwritten text-[#2d2424] text-xl font-bold border-b border-stone-200 pb-1 mb-1">
            {title}
          </h5>
          <p className="font-handwritten text-stone-500 text-sm line-clamp-3 leading-tight">
            {paragraphs[0]}
          </p>
        </motion.div>

        {/* Interactive Prompt Overlay */}
        {!isOpen && (
          <div className="absolute z-[15] inset-0 flex flex-col items-center justify-center bg-black/10 hover:bg-black/0 transition-colors rounded">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-1 text-stone-800"
            >
              <MailOpen className="h-8 w-8 filter drop-shadow" />
              <span className="font-handwritten text-lg font-bold">Tap to Open</span>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Full screen Letter Overlay Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {showLetterModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm cursor-pointer"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-xl bg-[#faf6ee] text-[#2d2424] p-8 rounded-lg shadow-2xl relative border-t-8 border-rose-400 max-h-[85vh] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                  title="Close letter"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Letter Design */}
                <div className="font-handwritten text-[#2d2424] space-y-6 pt-2">
                  <h4 className="text-3xl font-bold text-rose-700 tracking-wide border-b border-stone-300 pb-2">
                    {title}
                  </h4>

                  <div className="text-xl md:text-2xl space-y-4 leading-relaxed tracking-wide text-stone-800">
                    {paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-stone-200 text-right text-stone-600 text-2xl font-bold italic rotate-[-1deg]">
                    — Love, Your Best Friend
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
