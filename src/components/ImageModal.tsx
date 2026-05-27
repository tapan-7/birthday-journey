import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  caption: string;
  story?: string;
}

export const ImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  caption,
  story,
}: ImageModalProps) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-2xl bg-[#faf6ee] text-[#2d2424] rounded-lg p-6 shadow-2xl polaroid-frame cursor-default max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-black/5 bg-[#eae4d9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Typography */}
            <div className="mt-6 space-y-4">
              <h3 className="font-cinematic text-2xl md:text-3xl font-bold tracking-tight text-stone-800">
                {title}
              </h3>
              
              {story && (
                <p className="font-sans text-sm md:text-base leading-relaxed text-stone-600">
                  {story}
                </p>
              )}

              <div className="border-t border-stone-200/50 pt-4">
                <p className="font-handwritten text-2xl text-rose-700 md:text-3xl rotate-[-1deg] inline-block">
                  — {caption}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
