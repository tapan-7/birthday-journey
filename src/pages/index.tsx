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
import { SwimmingGirl } from "@/components/SwimmingGirl";
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
  Sparkles,
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
  const [wishStars, setWishStars] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  // Monitor keys for WASD simulation
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"].includes(key)) {
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

  // Update progress bar on Hold-to-dive button
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

  // Sync scroll section with navigation state
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
          const top = el.offsetTop;
          const height = el.offsetHeight;
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

      // Special check: if they collected from the wishing well, spawn a star
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

  const handleCloseMoment = () => {
    setIsModalOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalStarsPossible = 10;
  const jarFillHeight = Math.min(100, (starCount / totalStarsPossible) * 100);

  return (
    <SoundProvider>
      <Head>
        <title>{birthdayData.landingTitle}</title>
        <meta name="description" content="Happy Birthday Aanya - A bioluminescent universe of memories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative min-h-screen bg-[#060408] text-stone-100 overflow-x-hidden font-sans">
        
        {/* Particle Backdrop & Film Grain */}
        <BioluminescentCanvas />
        <FilmGrain />

        {/* Global floating Wish Stars */}
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {wishStars.map((ws) => (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.4, 1], scale: [0, 1.2, 1], y: [-10, -50] }}
              transition={{ repeat: Infinity, duration: 8 + Math.random() * 4, ease: "easeInOut" }}
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
            /* --- ENTRY GATE: THE MIDNIGHT OCEAN --- */
            <motion.div
              key="landing"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="relative z-50 min-h-screen flex flex-col items-center justify-center px-6 text-center select-none"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#09080a] via-[#050307] to-[#040206] z-0" />
              
              <div className="max-w-2xl w-full space-y-8 z-10 flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="space-y-4"
                >
                  <span className="font-handwritten text-purple-300 text-3xl block tracking-wide">
                    Tonight is about you.
                  </span>
                  <h1 className="font-cinematic text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-rose-200 to-amber-200 filter drop-shadow-md">
                    Happy Birthday, Aanya ✨
                  </h1>
                  <p className="font-sans text-stone-400 text-xs md:text-sm font-light leading-relaxed max-w-md mx-auto">
                    "Some journeys begin unexpectedly."
                    <br />
                    Welcome to a living memory universe made just for you.
                  </p>
                </motion.div>

                {/* Hold to Dive Deeper Button */}
                <div className="relative pt-6 flex flex-col items-center gap-3">
                  <button
                    onMouseDown={() => setIsHolding(true)}
                    onMouseUp={() => setIsHolding(false)}
                    onMouseLeave={() => setIsHolding(false)}
                    onTouchStart={() => setIsHolding(true)}
                    onTouchEnd={() => setIsHolding(false)}
                    className="hold-to-dive relative w-44 h-44 rounded-full border border-purple-500/30 flex items-center justify-center bg-purple-950/10 cursor-pointer overflow-hidden group select-none"
                  >
                    {/* Ring Progress Overlay */}
                    <div
                      style={{ clipPath: `inset(${100 - holdProgress}% 0px 0px 0px)` }}
                      className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-pink-500/30 transition-all duration-75"
                    />

                    <div className="z-10 text-center space-y-1">
                      <Sparkles className="h-6 w-6 text-purple-300 mx-auto animate-pulse" />
                      <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-stone-200 block">
                        {isHolding ? "Diving..." : "Hold to Dive"}
                      </span>
                    </div>
                  </button>
                  <span className="text-[10px] font-sans text-stone-500 uppercase tracking-widest">
                    Hold button down to descend
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- IMMERSIVE MEMORY CANVASES --- */
            <motion.div
              key="main-universe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Floating Sidebar Navigation */}
              <div className="floating-sidebar">
                <button
                  onClick={() => scrollToSection("home-ocean")}
                  className={`floating-sidebar-icon ${activeSection === "home-ocean" ? "active" : ""}`}
                  title="Home Ocean"
                >
                  <HomeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollToSection("moments-scrapbook")}
                  className={`floating-sidebar-icon ${activeSection === "moments-scrapbook" ? "active" : ""}`}
                  title="Memory Constellations"
                >
                  <Sparkles className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollToSection("chaos-zone")}
                  className={`floating-sidebar-icon ${activeSection === "chaos-zone" ? "active" : ""}`}
                  title="Chaos Zone"
                >
                  <Compass className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollToSection("letters-from-me")}
                  className={`floating-sidebar-icon ${activeSection === "letters-from-me" ? "active" : ""}`}
                  title="Letters From Me"
                >
                  <MailOpen className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollToSection("secret-islands")}
                  className={`floating-sidebar-icon ${activeSection === "secret-islands" ? "active" : ""}`}
                  title="Secret Islands"
                >
                  <Lock className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollToSection("birthday-realm")}
                  className={`floating-sidebar-icon ${activeSection === "birthday-realm" ? "active" : ""}`}
                  title="Birthday Realm"
                >
                  <Gift className="h-5 w-5" />
                </button>
              </div>

              {/* Viewport 1: The Memory Ocean (Hero Portal) */}
              <section id="home-ocean" className="realm-container">
                <div className="max-w-4xl w-full text-center space-y-6 flex flex-col items-center">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-semibold uppercase tracking-wider">
                    Memory Hub Portal
                  </span>
                  
                  {/* Floating girl silhouette */}
                  <SwimmingGirl />

                  <div className="space-y-2">
                    <h2 className="font-cinematic text-4xl md:text-5xl font-bold tracking-tight text-white glow-text-purple">
                      The Memory Ocean
                    </h2>
                    <p className="font-handwritten text-rose-300 text-2xl">
                      "Because some bonds don't need a reason, only a universe."
                    </p>
                    <p className="max-w-md mx-auto font-sans text-stone-400 text-xs leading-relaxed font-light">
                      Scroll down to dive deeper, or use the floating compass navigator on the left to glide between realms.
                    </p>
                  </div>

                  {/* WASD guide panel */}
                  <div className="glass-dashboard rounded-2xl p-4 border border-white/5 max-w-sm flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 items-center shrink-0">
                      <div className={`keycap ${activeKeys["w"] || activeKeys["arrowup"] ? "active" : ""}`}>W</div>
                      <div className="flex gap-1">
                        <div className={`keycap ${activeKeys["a"] || activeKeys["arrowleft"] ? "active" : ""}`}>A</div>
                        <div className={`keycap ${activeKeys["s"] || activeKeys["arrowdown"] ? "active" : ""}`}>S</div>
                        <div className={`keycap ${activeKeys["d"] || activeKeys["arrowright"] ? "active" : ""}`}>D</div>
                      </div>
                    </div>
                    <div className="text-left">
                      <h4 className="font-sans text-xs font-semibold text-stone-200">Interactive depth</h4>
                      <p className="font-sans text-[9px] text-stone-500 leading-tight">
                        Press WASD or arrows to simulate swimming ripples in the canvas.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Viewport 2: Moments Scrapbook (Constellation + Polaroid stack side-by-side) */}
              <section id="moments-scrapbook" className="realm-container bg-gradient-to-b from-transparent via-purple-950/15 to-transparent">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  <MemoryConstellation
                    onCardClick={handleOpenMoment}
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                  <PolaroidDriftGallery
                    onPhotoClick={handleOpenMoment}
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* Viewport 3: Funny Chaos Era (Floating bubbles popping game) */}
              <section id="chaos-zone" className="realm-container">
                <div className="max-w-3xl w-full">
                  <FloatingBubbles
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* Viewport 4: Letters From Me */}
              <section id="letters-from-me" className="realm-container bg-gradient-to-b from-transparent via-pink-950/10 to-transparent">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-8">
                    <DashboardLetters
                      onCollectStar={handleCollectStar}
                      collectedStars={collectedStars}
                    />
                  </div>
                  <div className="lg:col-span-4">
                    <DeeperThanWords
                      onCollectStar={handleCollectStar}
                      collectedStars={collectedStars}
                    />
                  </div>
                </div>
              </section>

              {/* Viewport 5: Secret Islands (Star-locked chest) */}
              <section id="secret-islands" className="realm-container">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-6">
                    <SecretChest
                      starCount={starCount}
                      onCollectStar={handleCollectStar}
                      collectedStars={collectedStars}
                    />
                  </div>
                  <div className="lg:col-span-6">
                    <WishingWell
                      onCollectStar={handleCollectStar}
                      collectedStars={collectedStars}
                    />
                  </div>
                </div>
              </section>

              {/* Viewport 6: Birthday Realm & Cozy Climax */}
              <section id="birthday-realm" className="realm-container bg-[#050306]">
                <div className="max-w-3xl w-full text-center">
                  <OurLittleWorld
                    onCollectStar={handleCollectStar}
                    collectedStars={collectedStars}
                  />
                </div>
              </section>

              {/* Fixed Footer Bar: Audio Player & Star Collector Jar */}
              <div className="fixed bottom-6 inset-x-6 z-40 flex items-center justify-between pointer-events-none">
                
                {/* Audio widget (needs pointer events enabled on itself) */}
                <div className="pointer-events-auto">
                  <MusicPlayer />
                </div>

                {/* Star Jar widget (pointer events enabled on itself) */}
                <div className="pointer-events-auto flex items-center gap-4 bg-black/60 border border-white/10 rounded-full py-1.5 px-4 shadow-lg backdrop-blur">
                  <div className="text-right">
                    <span className="font-handwritten text-amber-300 text-sm block leading-tight">
                      {starCount >= totalStarsPossible ? "Universe Complete!" : "Star Jar"}
                    </span>
                    <span className="font-sans text-[9px] text-stone-400 uppercase tracking-widest block">
                      {starCount} / {totalStarsPossible} Collected
                    </span>
                  </div>
                  
                  {/* Jar Visual */}
                  <div className="relative w-8 h-10 rounded-b-md rounded-t border border-stone-500/60 bg-black/40 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${jarFillHeight}%` }}
                      className="w-full glow-jar-fill"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Star className={`h-3 w-3 ${starCount > 0 ? "text-yellow-300 fill-yellow-300 animate-pulse" : "text-stone-700"}`} />
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
