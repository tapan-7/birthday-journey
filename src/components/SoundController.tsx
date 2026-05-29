import { useEffect, useState, createContext, useContext, useRef } from "react";
import { Howl } from "howler";
import { birthdayData } from "@/config/birthdayData";
import { Volume2, VolumeX } from "lucide-react";

interface SoundContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  playPaperFlip: () => void;
  playCameraShutter: () => void;
  playKeyboardType: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ambientBgRef = useRef<Howl | null>(null);
  const vinylCrackleRef = useRef<Howl | null>(null);
  const paperFlipRef = useRef<Howl | null>(null);
  const cameraShutterRef = useRef<Howl | null>(null);
  const keyboardTypeRef = useRef<Howl | null>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      const ambientBg = ambientBgRef.current;
      const vinylCrackle = vinylCrackleRef.current;
      
      if (ambientBg && !ambientBg.playing()) {
        ambientBg.play();
        ambientBg.fade(0, 0.25, 2000);
      }
      if (vinylCrackle && !vinylCrackle.playing()) {
        vinylCrackle.play();
        vinylCrackle.fade(0, 0.12, 2000);
      }

      // Remove listeners once audio is triggered
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    // Only run on client-side
    if (typeof window !== "undefined") {
      // 1. Ambient Background Music (looped, low volume)
      ambientBgRef.current = new Howl({
        src: [birthdayData.bgMusicUrl],
        html5: true, // Use HTML5 audio for long tracks
        loop: true,
        volume: 0.25,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
      });

      // 2. Vinyl Crackle (looped, extremely low volume for warmth)
      vinylCrackleRef.current = new Howl({
        src: [birthdayData.vinylCrackleUrl],
        html5: true,
        loop: true,
        volume: 0.12,
      });

      // 3. Sound Effects (short clips, preloaded)
      paperFlipRef.current = new Howl({
        src: [birthdayData.paperFlipUrl],
        volume: 0.4,
      });

      cameraShutterRef.current = new Howl({
        src: [birthdayData.cameraShutterUrl],
        volume: 0.5,
      });

      keyboardTypeRef.current = new Howl({
        src: [birthdayData.typingUrl],
        volume: 0.15,
      });

      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);
      window.addEventListener('keydown', handleFirstInteraction);
    }

    return () => {
      // Cleanup on unmount
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      
      if (ambientBgRef.current) ambientBgRef.current.unload();
      if (vinylCrackleRef.current) vinylCrackleRef.current.unload();
      if (paperFlipRef.current) paperFlipRef.current.unload();
      if (cameraShutterRef.current) cameraShutterRef.current.unload();
      if (keyboardTypeRef.current) keyboardTypeRef.current.unload();
    };
  }, []);

  const togglePlay = () => {
    const ambientBg = ambientBgRef.current;
    const vinylCrackle = vinylCrackleRef.current;
    if (!ambientBg || !vinylCrackle) return;

    if (isPlaying) {
      ambientBg.fade(ambientBg.volume(), 0, 1000);
      vinylCrackle.fade(vinylCrackle.volume(), 0, 1000);
      setTimeout(() => {
        if (ambientBgRef.current) ambientBgRef.current.pause();
        if (vinylCrackleRef.current) vinylCrackleRef.current.pause();
      }, 1000);
    } else {
      ambientBg.play();
      vinylCrackle.play();
      ambientBg.fade(0, 0.25, 1000);
      vinylCrackle.fade(0, 0.12, 1000);
    }
    setIsPlaying(!isPlaying);
  };

  const playPaperFlip = () => {
    if (paperFlipRef.current && isPlaying) {
      paperFlipRef.current.play();
    }
  };

  const playCameraShutter = () => {
    if (cameraShutterRef.current && isPlaying) {
      cameraShutterRef.current.play();
    }
  };

  const playKeyboardType = () => {
    if (keyboardTypeRef.current && isPlaying) {
      keyboardTypeRef.current.play();
    }
  };

  return (
    <SoundContext.Provider
      value={{
        isPlaying,
        togglePlay,
        playPaperFlip,
        playCameraShutter,
        playKeyboardType,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
