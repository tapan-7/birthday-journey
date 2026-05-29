import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BirthdayCake } from "@/components/BirthdayCake";
import { Envelope } from "@/components/Envelope";
import { birthdayData } from "@/config/birthdayData";
import { Gift, Heart } from "lucide-react";
import { useSound } from "@/components/SoundController";

export const CelebrationSection = () => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const { playCameraShutter, playPaperFlip } = useSound();

  const handleCakeBlown = () => {
    setCandlesBlown(true);
  };

  const handleSecretClick = () => {
    playCameraShutter();
    setShowSecretModal(true);
  };

  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-[#09080a] via-[#120f18] to-[#09080a] text-white overflow-hidden min-h-screen flex flex-col justify-center select-none">
      
      {/* Background glow spots */}
      <div className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* Sparks floating upwards */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(253,164,175,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold uppercase tracking-widest text-rose-300"
          >

            <span>It's Celebration Time</span>
          </motion.div>
          
          <h2 className="font-cinematic text-4xl md:text-5xl font-extrabold tracking-tight text-stone-100">
            {birthdayData.celebrationLetter.heading}
          </h2>
        </div>

        {/* Layout containing Cake & Envelope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
          
          {/* Column 1: Birthday Cake */}
          <div className="flex flex-col items-center justify-center">
            <BirthdayCake
              candlesCount={birthdayData.celebrationLetter.cakeCandlesCount}
              onAllBlown={handleCakeBlown}
            />
          </div>

          {/* Column 2: Envelope Letter (revealed once candles are blown) */}
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              {!candlesBlown ? (
                <motion.div
                  key="lock"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center p-8 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center max-w-sm w-full mx-auto"
                >
                  <Gift className="h-10 w-10 text-stone-500 mb-3 animate-pulse" />
                  <p className="font-sans text-sm text-stone-400 font-light leading-relaxed">
                    A handwritten letter is waiting. Blow out the candles above to read it...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="envelope"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-full"
                >
                  <Envelope
                    title="A Note For You"
                    paragraphs={birthdayData.celebrationLetter.paragraphs}
                  />

                  {/* Secret Star Icon for Secret Section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center mt-6"
                  >
                    <button
                      onClick={handleSecretClick}
                      className="p-3 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-amber-300 hover:text-amber-200 transition-all flex items-center gap-2 text-xs font-semibold tracking-wider uppercase cursor-pointer"
                      title="Open hidden surprise"
                    >

                      <span>Found a secret star? Tap me</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Secret Pop-up Modal */}
      <AnimatePresence>
        {showSecretModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={() => setShowSecretModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#faf6ee] text-[#2d2424] p-8 rounded-lg shadow-2xl relative border-t-8 border-amber-400 max-h-[85vh] overflow-y-auto cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSecretModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                title="Close"
              >
                <span className="text-xl font-bold">×</span>
              </button>

              <div className="space-y-6 pt-2">
                <div className="flex items-center gap-2 text-amber-600">

                  <h4 className="font-cinematic text-2xl font-bold">
                    {birthdayData.hiddenSecret.letterTitle}
                  </h4>
                </div>

                <p className="font-handwritten text-2xl text-stone-800 leading-relaxed border-b border-stone-200 pb-4">
                  {birthdayData.hiddenSecret.letterContent}
                </p>

                {/* Bloopers / Fun roasts list */}
                <div className="space-y-4">
                  <h5 className="font-cinematic text-stone-800 text-sm font-semibold tracking-wider uppercase">
                    Our Friendship Stats:
                  </h5>
                  <div className="space-y-3">
                    {birthdayData.hiddenSecret.bloopers.map((b, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-stone-200/50 rounded border border-stone-300/30 flex items-start gap-3"
                      >
                        <Heart className="h-4 w-4 text-rose-500 mt-1 shrink-0" />
                        <div>
                          <strong className="font-sans text-xs text-stone-700 block mb-0.5">
                            {b.title}
                          </strong>
                          <p className="font-handwritten text-lg text-stone-800 leading-tight">
                            {b.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
