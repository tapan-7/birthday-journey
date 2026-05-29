import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "@/config/birthdayData";
import { SoundProvider, useSound } from "@/components/SoundController";
import { BioluminescentCanvas } from "@/components/BioluminescentCanvas";
import { FilmGrain } from "@/components/FilmGrain";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ImageModal } from "@/components/ImageModal";

// Sub-components
import { SecretChest } from "@/components/SecretChest";
import { PolaroidDriftGallery } from "@/components/PolaroidDriftGallery";
import { MemoryConstellation } from "@/components/MemoryConstellation";
import { FloatingBubbles } from "@/components/FloatingBubbles";
import { DeeperThanWords } from "@/components/DeeperThanWords";
import { DashboardLetters } from "@/components/DashboardLetters";
import { WishingWell } from "@/components/WishingWell";
import { OurLittleWorld } from "@/components/OurLittleWorld";

// Icons
import {
  Home as HomeIcon,
  MailOpen,
  Lock,
  Coins,
  Gift,
  Star,
  Heart,
  Compass,
  Volume2,
  VolumeX,
} from "lucide-react";
import { HeroPicture } from "@/components/HeroPicture";

export default function Home() {
  const [hasDivedIn, setHasDivedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("home-ocean");

  // Hold-to-dive mechanics
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Star Collection
  const [collectedStars, setCollectedStars] = useState<string[]>([]);
  const [starCount, setStarCount] = useState(0);

  // Photo Lightbox modal
  const [selectedMoment, setSelectedMoment] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Spawning custom Wish Stars in the background when the user makes a wish
  const [wishStars, setWishStars] = useState<
    { id: number; text: string; x: number; y: number }[]
  >([]);

  // Monitor keys for WASD simulation
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "arrowup",
          "arrowleft",
          "arrowdown",
          "arrowright",
        ].includes(key)
      ) {
        setActiveKeys((prev) => ({ ...prev, [key]: true }));
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setActiveKeys((prev) => ({ ...prev, [key]: false }));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isHolding) {
      holdIntervalRef.current = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(holdIntervalRef.current!);
            setHasDivedIn(true);
            return 100;
          }
          return prev + 6;
        });
      }, 50);
    } else {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      setHoldProgress(0);
    }
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, [isHolding]);

  useEffect(() => {
    if (!hasDivedIn) return;
    const sections = [
      "home-ocean",
      "moments-scrapbook",
      "chaos-zone",
      "letters-from-me",
      "secret-islands",
      "birthday-realm",
    ];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop: top, offsetHeight: height } = el;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDivedIn]);

  const handleCollectStar = (starId: string) => {
    if (!collectedStars.includes(starId)) {
      setCollectedStars((prev) => {
        const next = [...prev, starId];
        setStarCount(next.length);
        return next;
      });
      if (starId === "wishing-well") {
        setWishStars((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "My Wish for Aanya",
            x: Math.random() * 80 + 10,
            y: Math.random() * 50 + 20,
          },
        ]);
      }
    }
  };

  const handleOpenMoment = (moment: any) => {
    setSelectedMoment(moment);
    setIsModalOpen(true);
  };

  const handleCloseMoment = () => setIsModalOpen(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const totalStarsPossible = 10;
  const jarFillHeight = Math.min(100, (starCount / totalStarsPossible) * 100);

  const navItems = [
    {
      id: "home-ocean",
      icon: <HomeIcon className="h-[18px] w-[18px]" />,
      label: "Home Ocean",
    },
    {
      id: "moments-scrapbook",
      icon: <Star className="h-[18px] w-[18px]" />,
      label: "Memory Constellations",
    },
    {
      id: "chaos-zone",
      icon: <Compass className="h-[18px] w-[18px]" />,
      label: "Chaos Zone",
    },

    {
      id: "secret-islands",
      icon: <Lock className="h-[18px] w-[18px]" />,
      label: "Secret Islands",
    },
    {
      id: "birthday-realm",
      icon: <Gift className="h-[18px] w-[18px]" />,
      label: "Birthday Realm",
    },
  ];

  return (
    <SoundProvider>
      <Head>
        <title>{birthdayData.landingTitle}</title>
        <meta
          name="description"
          content="Happy Birthday Aalu — A bioluminescent universe of memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative min-h-screen bg-[#06040a] text-stone-100 overflow-x-hidden font-sans">
        {/* Particle Backdrop & Film Grain */}
        <BioluminescentCanvas />
        <FilmGrain />
        
        {/* Global Floating Bubbles Overlay */}
        <FloatingBubbles
          onCollectStar={handleCollectStar}
          collectedStars={collectedStars}
        />

        {/* Global floating Wish Stars */}
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {wishStars.map((ws) => (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.4, 1],
                scale: [0, 1.2, 1],
                y: [-10, -50],
              }}
              transition={{
                repeat: Infinity,
                duration: 8 + Math.random() * 4,
                ease: "easeInOut",
              }}
              className="absolute flex flex-col items-center"
              style={{ left: `${ws.x}%`, top: `${ws.y}%` }}
            >
              <Star className="h-4 w-4 fill-amber-300 text-amber-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
              <span className="font-handwritten text-[10px] text-amber-200 mt-1 whitespace-nowrap bg-black/60 px-1.5 py-0.5 rounded border border-amber-400/20">
                {ws.text}
              </span>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!hasDivedIn ? (
            /* ── LANDING GATE ─────────────────────────────────────── */
            <motion.div
              key="landing"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="relative z-50 min-h-screen flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden"
            >
              {/* Deep background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0612] via-[#06040c] to-[#030208] z-0" />

              {/* Ambient glowing orbs */}
              <div
                className="ambient-orb w-[500px] h-[500px] bg-purple-600"
                style={
                  {
                    top: "10%",
                    left: "5%",
                    "--duration": "14s",
                    "--opacity": "0.12",
                  } as React.CSSProperties
                }
              />
              <div
                className="ambient-orb w-[400px] h-[400px] bg-rose-500"
                style={
                  {
                    top: "20%",
                    right: "0%",
                    "--duration": "18s",
                    "--opacity": "0.08",
                  } as React.CSSProperties
                }
              />
              <div
                className="ambient-orb w-[350px] h-[350px] bg-blue-600"
                style={
                  {
                    bottom: "5%",
                    right: "20%",
                    "--duration": "11s",
                    "--opacity": "0.10",
                  } as React.CSSProperties
                }
              />
              <div
                className="ambient-orb w-[300px] h-[300px] bg-pink-500"
                style={
                  {
                    bottom: "15%",
                    left: "10%",
                    "--duration": "16s",
                    "--opacity": "0.09",
                  } as React.CSSProperties
                }
              />

              {/* Star particles (CSS decorative) */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    left: `${5 + ((i * 4.7) % 90)}%`,
                    top: `${5 + ((i * 7.3) % 85)}%`,
                    opacity: 0.2 + (i % 5) * 0.12,
                  }}
                  animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.4, 0.8] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2 + (i % 4),
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <div className="max-w-2xl w-full space-y-10 z-10 flex flex-col items-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="badge-pulse px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[11px] font-semibold uppercase tracking-widest"
                >
                  ✦ A Living Memory Universe ✦
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <p
                    className="font-handwritten text-rose-300 text-2xl tracking-wide"
                    style={{ textShadow: "0 0 20px rgba(244,114,182,0.6)" }}
                  >
                    Tonight is about you.
                  </p>
                  <h1 className="text-shimmer font-cinematic text-6xl md:text-8xl font-extrabold tracking-tight leading-none">
                    Happy Birthday,
                    <br />
                    Aalu ✨
                  </h1>
                  <p className="font-sans text-stone-400 text-sm font-light leading-relaxed max-w-md mx-auto">
                    "Some journeys begin unexpectedly."
                    <br />
                    <span className="text-stone-500 text-xs">
                      Welcome to a living memory universe made just for you.
                    </span>
                  </p>
                </motion.div>

                {/* Hold-to-Dive Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6,
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col items-center gap-4"
                >
                  {/* Outer decorative ring */}
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                      }}
                      className="absolute -inset-3 rounded-full border border-dashed border-purple-500/20"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                      }}
                      className="absolute -inset-6 rounded-full border border-dashed border-pink-500/10"
                    />

                    <button
                      onMouseDown={() => setIsHolding(true)}
                      onMouseUp={() => setIsHolding(false)}
                      onMouseLeave={() => setIsHolding(false)}
                      onTouchStart={() => setIsHolding(true)}
                      onTouchEnd={() => setIsHolding(false)}
                      className="hold-to-dive relative w-44 h-44 rounded-full border border-purple-500/40 flex items-center justify-center bg-purple-950/20 cursor-pointer overflow-hidden group select-none"
                    >
                      {/* Radial progress fill */}
                      <div
                        style={{
                          clipPath: `inset(${100 - holdProgress}% 0px 0px 0px)`,
                        }}
                        className="absolute inset-0 bg-gradient-to-t from-purple-600/40 via-pink-500/30 to-rose-500/20 transition-all duration-75"
                      />
                      {/* Inner glowing center */}
                      <div className="z-10 text-center space-y-2">
                        <motion.div
                          animate={{
                            scale: isHolding ? [1, 1.2, 1] : 1,
                            rotate: isHolding ? 360 : 0,
                          }}
                          transition={{
                            repeat: isHolding ? Infinity : 0,
                            duration: 1,
                          }}
                        >
                          <div className="h-7 w-7 text-purple-300 mx-auto" />
                        </motion.div>
                        <span className="font-sans text-[11px] uppercase font-bold tracking-widest text-stone-200 block">
                          {isHolding ? "Diving..." : "Hold to Dive"}
                        </span>
                        {isHolding && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: holdProgress / 100 }}
                            className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full origin-left"
                          />
                        )}
                      </div>
                    </button>
                  </div>

                  <span className="text-[10px] font-sans text-stone-600 uppercase tracking-widest">
                    Hold & descend into the universe
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* ── MAIN UNIVERSE ───────────────────────────────────── */
            <motion.div
              key="main-universe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              {/* Floating Sidebar Navigation */}
              <nav className="floating-sidebar hidden md:flex flex-col gap-2.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`floating-sidebar-icon ${activeSection === item.id ? "active" : ""}`}
                    title={item.label}
                  >
                    {item.icon}
                  </button>
                ))}
              </nav>

              {/* ── HERO: Memory Ocean ── */}
              <section id="home-ocean" className="chapter-section">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-600/8 rounded-full blur-[130px]" />
                  <div className="absolute top-1/3 right-1/4 w-[350px] h-[300px] bg-rose-600/5 rounded-full blur-[90px]" />
                </div>

                {/* Two-column: portrait left, title right */}
                <div className="w-full max-w-5xl mx-auto z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24">
                  {/* Portrait */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0"
                  >
                    <HeroPicture
                      src="/Alien/IMG-20250317-WA0001.jpg"
                      name="Aalu"
                    />
                  </motion.div>

                  {/* Title block */}
                  <div className="flex-1 flex flex-col items-start text-left space-y-6">
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="badge-pulse px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/25 text-purple-300 text-[10px] font-semibold uppercase tracking-wider"
                    >
                      ✦ A Living Memory Universe ✦
                    </motion.span>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.4,
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="space-y-3"
                    >
                      <p
                        className="font-handwritten text-rose-300 text-xl"
                        style={{ textShadow: "0 0 20px rgba(251,113,133,.5)" }}
                      >
                        Tonight is about you.
                      </p>
                      <h2
                        className="font-cinematic text-5xl md:text-6xl font-bold text-white leading-tight"
                        style={{ textShadow: "0 0 50px rgba(168,85,247,.3)" }}
                      >
                        Happy Birthday,
                        <br />
                        <span className="text-shimmer">Aalu ✨</span>
                      </h2>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="font-emotional italic text-stone-300 text-xl leading-relaxed"
                    >
                      "Because some bonds don&apos;t need a reason,
                      <br />
                      only a universe."
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="font-sans text-stone-500 text-xs leading-relaxed"
                    >
                      Scroll down to dive deeper, or use the compass navigator
                      on the left.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="flex items-center gap-2 text-stone-600 text-[11px] font-sans uppercase tracking-widest"
                    >
                      <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.6,
                          ease: "easeInOut",
                        }}
                        className="w-0.5 h-6 bg-gradient-to-b from-purple-500/60 to-transparent rounded-full"
                      />
                      Scroll to begin
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* ── CH1: Memory Constellation ── */}
              <section
                id="moments-scrapbook"
                className="chapter-section"
                style={{
                  background:
                    "linear-gradient(180deg,transparent,rgba(30,60,200,.04) 50%,transparent)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-blue-700/5 rounded-full blur-[100px]" />
                </div>
                <div className="w-full max-w-5xl mx-auto z-10">
                  <MemoryConstellation
                    onCardClick={handleOpenMoment}
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* ── DRIFT PORTAL: Polaroid Gallery ── */}
              <section
                id="chaos-zone"
                className="chapter-section"
                style={{
                  background:
                    "linear-gradient(180deg,transparent,rgba(34,211,238,.03) 50%,transparent)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-cyan-700/4 rounded-full blur-[90px]" />
                </div>
                <div className="w-full max-w-5xl mx-auto z-10">
                  <PolaroidDriftGallery
                    onPhotoClick={handleOpenMoment}
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* ── CH2: Deeper Than Words ── */}
              <section
                id="secret-islands"
                className="chapter-section"
                style={{
                  background:
                    "linear-gradient(180deg,transparent,rgba(236,72,153,.05) 50%,transparent)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-pink-700/5 rounded-full blur-[90px]" />
                </div>
                <div className="w-full max-w-5xl mx-auto z-10">
                  <DeeperThanWords
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* ── CH4: Letters From Me ── */}
              <section
                id="birthday-realm"
                className="chapter-section"
                style={{
                  background:
                    "linear-gradient(180deg,transparent,rgba(245,158,11,.04) 50%,transparent)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[300px] bg-amber-700/4 rounded-full blur-[90px]" />
                </div>
                <div className="w-full max-w-4xl mx-auto z-10">
                  <DashboardLetters
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* ── CH5: Wishing Well ── */}
              <section
                id="ch-wishing"
                className="chapter-section"
                style={{
                  background:
                    "linear-gradient(180deg,transparent,rgba(244,63,94,.05) 50%,transparent)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-rose-700/5 rounded-full blur-[100px]" />
                </div>
                <div className="w-full max-w-4xl mx-auto z-10">
                  <WishingWell
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* ── CH6: Secret Chest ── */}
              <section
                id="ch-chest"
                className="chapter-section"
                style={{
                  background:
                    "linear-gradient(180deg,transparent,rgba(20,184,166,.04) 50%,transparent)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-teal-700/4 rounded-full blur-[90px]" />
                </div>
                <div className="w-full max-w-4xl mx-auto z-10">
                  <SecretChest
                    starCount={starCount}
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* ── CH7: Our Little World (Finale) ── */}
              <section
                id="ch-finale"
                className="chapter-section"
                style={{
                  background:
                    "linear-gradient(180deg,transparent,rgba(139,92,246,.08))",
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-800/8 rounded-full blur-[130px]" />
                </div>
                <div className="w-full max-w-4xl mx-auto z-10">
                  <OurLittleWorld
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* ── FIXED FOOTER BAR ── */}
              <div className="fixed bottom-5 inset-x-5 z-40 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto">
                  <MusicPlayer />
                </div>

                <div
                  className="pointer-events-auto flex items-center gap-3 bg-black/70 border border-white/10 rounded-full py-2 px-4 shadow-2xl backdrop-blur-xl"
                  style={{
                    boxShadow:
                      starCount > 0
                        ? "0 0 20px rgba(251,191,36,.15)"
                        : undefined,
                  }}
                >
                  <div className="text-right">
                    <span className="font-handwritten text-amber-300 text-sm block leading-tight">
                      {starCount >= totalStarsPossible
                        ? "Universe Complete! 🌟"
                        : "Star Jar"}
                    </span>
                    <span className="font-sans text-[9px] text-stone-400 uppercase tracking-widest block">
                      {starCount} / {totalStarsPossible} Collected
                    </span>
                  </div>
                  <div
                    className="relative w-8 h-10 rounded-b-md rounded-t border border-stone-500/50 bg-black/50 flex items-end overflow-hidden"
                    style={{ boxShadow: "inset 0 0 8px rgba(0,0,0,.5)" }}
                  >
                    <div
                      style={{ height: `${jarFillHeight}%` }}
                      className="w-full glow-jar-fill"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Star
                        className={`h-3 w-3 ${starCount > 0 ? "text-yellow-300 fill-yellow-300 animate-pulse" : "text-stone-700"}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global image modal lightbox */}
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseMoment}
          imageSrc={selectedMoment?.image || ""}
          title={selectedMoment?.title || ""}
          caption={selectedMoment?.caption || ""}
          story={selectedMoment?.story || ""}
        />
      </div>
    </SoundProvider>
  );
}
