import { useEffect, useState, createContext, useContext } from "react";
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

let ambientBg: Howl | null = null;
let vinylCrackle: Howl | null = null;
let paperFlip: Howl | null = null;
let cameraShutter: Howl | null = null;
let keyboardType: Howl | null = null;

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      // 1. Ambient Background Music (looped, low volume)
      ambientBg = new Howl({
        src: [birthdayData.bgMusicUrl],
        html5: true, // Use HTML5 audio for long tracks
        loop: true,
        volume: 0.25,
      });

      // 2. Vinyl Crackle (looped, extremely low volume for warmth)
      vinylCrackle = new Howl({
        src: [birthdayData.vinylCrackleUrl],
        html5: true,
        loop: true,
        volume: 0.12,
      });

      // 3. Sound Effects (short clips, preloaded)
      paperFlip = new Howl({
        src: [birthdayData.paperFlipUrl],
        volume: 0.4,
      });

      cameraShutter = new Howl({
        src: [birthdayData.cameraShutterUrl],
        volume: 0.5,
      });

      keyboardType = new Howl({
        src: [birthdayData.typingUrl],
        volume: 0.15,
      });
    }

    return () => {
      // Cleanup on unmount
      if (ambientBg) ambientBg.unload();
      if (vinylCrackle) vinylCrackle.unload();
      if (paperFlip) paperFlip.unload();
      if (cameraShutter) cameraShutter.unload();
      if (keyboardType) keyboardType.unload();
    };
  }, []);

  const togglePlay = () => {
    if (!ambientBg || !vinylCrackle) return;

    if (isPlaying) {
      ambientBg.fade(ambientBg.volume(), 0, 1000);
      vinylCrackle.fade(vinylCrackle.volume(), 0, 1000);
      setTimeout(() => {
        ambientBg?.pause();
        vinylCrackle?.pause();
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
    if (paperFlip && isPlaying) {
      paperFlip.play();
    }
  };

  const playCameraShutter = () => {
    if (cameraShutter && isPlaying) {
      cameraShutter.play();
    }
  };

  const playKeyboardType = () => {
    if (keyboardType && isPlaying) {
      keyboardType.play();
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

      {/* Floating Audio Control Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full glass-panel hover:bg-white/10 transition-all duration-300 group shadow-lg"
        title={isPlaying ? "Mute soundtrack" : "Unmute soundtrack"}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-white/90 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="h-5 w-5 text-white/50 group-hover:scale-110 transition-transform" />
        )}
      </button>
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
