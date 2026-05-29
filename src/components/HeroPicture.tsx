import { motion } from "framer-motion";

/**
 * HeroPicture — aesthetic floating portrait for the hero section.
 *
 * HOW TO SWAP THE PHOTO:
 *   1. Drop her photo into: /public/images/aalu.jpg  (or .png / .webp)
 *   2. Change the `src` prop below to "/images/aalu.jpg"
 *   3. Done — the glow, ring, and float animations apply automatically.
 */

interface HeroPictureProps {
  src?: string;
  name?: string;
}

export const HeroPicture = ({
  src = "/images/aalu.jpg",
  name = "Aalu",
}: HeroPictureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center"
      style={{ width: 260, height: 260 }}
    >
      {/* Outermost slow-spin ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(168,85,247,0), rgba(236,72,153,0.5), rgba(59,130,246,0.4), rgba(168,85,247,0))",
          padding: 2,
          borderRadius: "50%",
        }}
      />

      {/* Second counter-spin ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="absolute"
        style={{
          inset: 12,
          borderRadius: "50%",
          border: "1px dashed rgba(251,191,36,0.25)",
        }}
      />

      {/* Pulsing glow orb behind portrait */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(236,72,153,0.15) 50%, transparent 75%)",
          filter: "blur(16px)",
        }}
      />

      {/* Portrait circle — photo inside */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="relative z-10 rounded-full overflow-hidden"
        style={{
          width: 200,
          height: 200,
          boxShadow: [
            "0 0 0 3px rgba(168,85,247,0.4)",
            "0 0 0 6px rgba(168,85,247,0.12)",
            "0 0 50px rgba(168,85,247,0.4)",
            "0 0 100px rgba(236,72,153,0.2)",
            "0 30px 60px rgba(0,0,0,0.6)",
          ].join(", "),
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover object-top"
          style={{ filter: "brightness(1.05) saturate(1.1) contrast(1.02)" }}
          onError={(e) => {
            /* Fallback: show initials if photo not found */
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent && !parent.querySelector(".initials-fallback")) {
              const fb = document.createElement("div");
              fb.className = "initials-fallback";
              fb.style.cssText =
                "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#4c1d95,#831843);";
              fb.innerHTML = `<span style="font-size:64px;color:white;font-family:serif;">✿</span>`;
              parent.appendChild(fb);
            }
          }}
        />

        {/* Subtle inner vignette */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.07) 0%, transparent 60%), linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </motion.div>

      {/* Floating sparkle dots around the portrait */}
      {[
        { angle:  15, dist: 115, size: 5, delay: 0,   color: "#f0abfc" },
        { angle:  80, dist: 118, size: 4, delay: 1.2, color: "#fbbf24" },
        { angle: 145, dist: 112, size: 6, delay: 0.5, color: "#7dd3fc" },
        { angle: 220, dist: 116, size: 4, delay: 1.8, color: "#f472b6" },
        { angle: 290, dist: 114, size: 5, delay: 0.9, color: "#a5f3fc" },
        { angle: 340, dist: 117, size: 3, delay: 2.3, color: "#c4b5fd" },
      ].map((dot, i) => {
        const rad = (dot.angle * Math.PI) / 180;
        const x   = 130 + dot.dist * Math.cos(rad) - dot.size / 2;
        const y   = 130 + dot.dist * Math.sin(rad) - dot.size / 2;
        return (
          <motion.div
            key={i}
            animate={{
              scale:   [0.8, 1.4, 0.8],
              opacity: [0.4, 1,   0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5 + i * 0.4,
              delay: dot.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left:      x,
              top:       y,
              width:     dot.size,
              height:    dot.size,
              background: dot.color,
              boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
            }}
          />
        );
      })}

      {/* Name badge floating below */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: "easeInOut" }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
      >
        <div
          className="px-4 py-1.5 rounded-full text-sm font-handwritten text-white tracking-wide"
          style={{
            background: "rgba(88,28,135,0.6)",
            border: "1px solid rgba(216,180,254,0.3)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 20px rgba(168,85,247,0.3)",
          }}
        >
          ✦ {name} ✦
        </div>
      </motion.div>
    </motion.div>
  );
};
