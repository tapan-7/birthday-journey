import { birthdayData, MemoryMoment } from "@/config/birthdayData";
import { PolaroidCard } from "@/components/PolaroidCard";
import { motion } from "framer-motion";

interface BeginningSectionProps {
  onCardClick: (moment: MemoryMoment) => void;
}

export const BeginningSection = ({ onCardClick }: BeginningSectionProps) => {
  return (
    <section className="relative py-28 px-6 bg-[#fbf7f4] text-[#2d2424] overflow-hidden select-none min-h-screen">
      
      {/* Tape and scrapbook page textures */}
      <div className="absolute inset-0 paper-texture pointer-events-none opacity-90 z-0" />
      
      {/* Decorative background light leaks */}
      <div className="absolute top-[10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-rose-200/40 blur-[100px] pointer-events-none z-1" />
      <div className="absolute bottom-[10%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-orange-100/40 blur-[100px] pointer-events-none z-1" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-16">
        
        {/* Scrapbook Section Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <span className="font-handwritten text-3xl text-rose-600 block rotate-[-2deg] mb-1">
              nostalgia lane
            </span>
            <h2 className="font-cinematic text-4xl md:text-5xl font-extrabold tracking-tight text-stone-800">
              Moments We Never Forgot
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md mx-auto font-sans text-sm md:text-base text-stone-600 font-light"
          >
            Every snapshot tells a story of a day we laughed, got lost, or just stayed up talking.
          </motion.p>
        </div>

        {/* Polaroid Timeline Path */}
        <div className="relative mt-20">
          
          {/* Vertical Connecting SVG Dotted Line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-0.5 border-l-2 border-dashed border-stone-300/60 -translate-x-1/2 hidden md:block" />

          {/* Staggered Memory Cards */}
          <div className="space-y-24 md:space-y-16">
            {birthdayData.moments.map((moment, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={moment.id}
                  className={`flex flex-col md:flex-row items-center justify-between w-full md:gap-12 relative ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Polaroid Card Column */}
                  <div className="w-full md:w-1/2 flex justify-center z-10">
                    <PolaroidCard
                      imageSrc={moment.image}
                      title={moment.title}
                      caption={moment.caption}
                      rotation={moment.rotation}
                      onClick={() => onCardClick(moment)}
                    />
                  </div>

                  {/* Spacer Column with SVG path link (md screens) */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-400 border-4 border-white shadow-md hidden md:block z-20" />

                  {/* Story Text Column */}
                  <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0 px-4 md:px-8 space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ type: "spring", damping: 20, stiffness: 100 }}
                      className={`space-y-3 ${
                        isEven ? "md:text-left" : "md:text-right"
                      }`}
                    >
                      <span className="font-handwritten text-2xl text-rose-500 block">
                        Chapter {idx + 1}
                      </span>
                      <h3 className="font-cinematic text-2xl font-bold text-stone-800">
                        {moment.title}
                      </h3>
                      <p className="font-sans text-stone-600 text-sm md:text-base leading-relaxed max-w-sm md:max-w-none mx-auto md:mx-0">
                        {moment.story}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
