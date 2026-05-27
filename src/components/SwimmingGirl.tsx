import { motion } from "framer-motion";

export const SwimmingGirl = () => {
  return (
    <div className="relative w-72 h-48 flex items-center justify-center pointer-events-none select-none">
      {/* Glow shadow backdrop */}
      <motion.div
        animate={{
          scale: [0.9, 1.15, 0.9],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute w-56 h-28 rounded-full bg-cyan-500/20 blur-[50px] z-0"
      />

      {/* Trailing particles / sparkles */}
      <div className="absolute inset-0 flex items-center justify-start pl-8 opacity-75">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [-20 - i * 15, -60 - i * 20],
              y: [Math.sin(i) * 15, Math.sin(i) * 30 + (Math.random() - 0.5) * 15],
              scale: [1, 0],
              opacity: [0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + i * 0.3,
              ease: "easeOut",
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px] shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            style={{ left: `${25 + i * 8}%` }}
          />
        ))}
      </div>

      {/* SVG swimming figure */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 300 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
        animate={{
          y: [0, -10, 0],
          rotate: [-1, 2, -1],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="swimmerGlow" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.85" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Swimming Girl Silhouette Path */}
        <motion.path
          d="M 50,110 
             C 65,108 80,102 95,100 
             C 110,98 125,105 140,103 
             C 155,101 165,92 180,94 
             C 195,96 210,108 225,105 
             C 240,102 248,88 255,80 
             C 250,92 242,108 235,115
             C 220,122 205,118 190,116
             C 175,114 160,119 145,118
             C 130,117 115,110 100,112
             C 85,114 70,120 50,122 Z"
          fill="url(#swimmerGlow)"
          filter="url(#glow)"
          animate={{
            d: [
              "M 50,110 C 65,108 80,102 95,100 C 110,98 125,105 140,103 C 155,101 165,92 180,94 C 195,96 210,108 225,105 C 240,102 248,88 255,80 C 250,92 242,108 235,115 C 220,122 205,118 190,116 C 175,114 160,119 145,118 C 130,117 115,110 100,112 C 85,114 70,120 50,122 Z",
              "M 50,118 C 65,114 80,105 95,102 C 110,99 125,109 140,106 C 155,103 165,90 180,91 C 195,92 210,103 225,101 C 240,99 248,84 255,75 C 249,88 241,104 234,111 C 219,118 204,115 189,113 C 174,111 159,115 144,114 C 129,113 114,107 99,109 C 84,111 69,118 50,118 Z",
              "M 50,110 C 65,108 80,102 95,100 C 110,98 125,105 140,103 C 155,101 165,92 180,94 C 195,96 210,108 225,105 C 240,102 248,88 255,80 C 250,92 242,108 235,115 C 220,122 205,118 190,116 C 175,114 160,119 145,118 C 130,117 115,110 100,112 C 85,114 70,120 50,122 Z"
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }}
        />

        {/* Floating wavy hair trailing behind */}
        <path
          d="M 50,110 C 35,102 20,108 10,100 C 22,112 36,114 50,112"
          fill="#ec4899"
          opacity="0.6"
          filter="url(#glow)"
        />
        <path
          d="M 50,115 C 32,109 18,118 5,110 C 19,121 34,119 50,116"
          fill="#3b82f6"
          opacity="0.5"
          filter="url(#glow)"
        />
      </motion.svg>
    </div>
  );
};
