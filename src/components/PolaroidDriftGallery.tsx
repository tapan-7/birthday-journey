import { useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "./SoundController";
import { HelpCircle, Star } from "lucide-react";

interface PhotoItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  story: string;
  xOffset: number; // percentage width position
  yOffset: number; // percentage height position
  rot: number;
}

interface PolaroidDriftGalleryProps {
  onPhotoClick: (photo: any) => void;
  onCollectStar: (id: string) => void;
  collectedStars: string[];
}

export const PolaroidDriftGallery = ({
  onPhotoClick,
  onCollectStar,
  collectedStars,
}: PolaroidDriftGalleryProps) => {
  const { playPaperFlip } = useSound();
  const [activeZIndex, setActiveZIndex] = useState<Record<string, number>>({});
  const [topZ, setTopZ] = useState(10);

  // Pre-configured Polaroid items with spread coordinate distributions
  const photos: PhotoItem[] = [
    {
      id: "photo-1",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
      title: "How It All Started",
      caption: "We started as strangers...",
      story: "It's funny how a random introduction turned into something so irreplaceable. From awkward handshakes to sharing our deepest secrets, we found comfort in the chaos of each other's lives.",
      xOffset: 12,
      yOffset: 25,
      rot: -5,
    },
    {
      id: "photo-2",
      image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&auto=format&fit=crop&q=80",
      title: "The Midnight Conversations",
      caption: "...and somehow became close.",
      story: "Remember the 3 AM chats? Discussing the universe, relationship drama, and plans to take over the world. You became the person I could text without thinking twice.",
      xOffset: 48,
      yOffset: 15,
      rot: 6,
    },
    {
      id: "photo-3",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
      title: "Unplanned Adventures",
      caption: "Getting lost in the right places.",
      story: "We always ended up in the most random coffee shops, walking down streets we didn't know, laughing at things that made absolutely no sense to anyone else.",
      xOffset: 72,
      yOffset: 30,
      rot: -4,
    },
  ];

  const handleDragStart = (id: string) => {
    playPaperFlip();
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setActiveZIndex((prev) => ({ ...prev, [id]: nextZ }));
    onCollectStar(`polaroid-${id}`);
  };

  const handleCardClick = (item: PhotoItem) => {
    playPaperFlip();
    onPhotoClick({
      image: item.image,
      title: item.title,
      caption: item.caption,
      story: item.story,
    });
  };

  return (
    <div className="w-full relative h-[450px] bg-black/45 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col justify-between select-none">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div>
          <span className="font-handwritten text-blue-300 text-lg block">drift portal</span>
          <h3 className="font-cinematic text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-blue-300" />
            Polaroid Drift Gallery
          </h3>
        </div>
        <span className="text-xs font-sans text-stone-400">
          Drag, stack & click photos
        </span>
      </div>

      {/* Scattered Playfield Canvas */}
      <div className="relative flex-grow w-full h-full overflow-hidden">
        {photos.map((item) => {
          const isCollected = collectedStars.includes(`polaroid-${item.id}`);
          const currentZ = activeZIndex[item.id] || 2;

          return (
            <motion.div
              key={item.id}
              drag
              dragConstraints={{ left: 0, right: 350, top: 0, bottom: 180 }}
              onDragStart={() => handleDragStart(item.id)}
              onClick={() => handleCardClick(item)}
              style={{
                position: "absolute",
                left: `${item.xOffset}%`,
                top: `${item.yOffset}%`,
                zIndex: currentZ,
                cursor: "grab",
              }}
              whileDrag={{ scale: 1.05, cursor: "grabbing" }}
              animate={{ rotate: item.rot }}
              className="w-32 bg-white p-2 rounded shadow-2xl border border-stone-200/40 select-none group"
            >
              {/* Image Frame */}
              <div className="relative aspect-square w-full bg-stone-100 overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  draggable="false"
                  className="w-full h-full object-cover filter brightness-[0.95]"
                />
                
                {/* Star Collection Badge overlay */}
                {isCollected && (
                  <div className="absolute top-1 right-1 bg-amber-400/90 rounded-full p-0.5 shadow-md">
                    <Star className="h-3 w-3 fill-amber-950 text-amber-950" />
                  </div>
                )}
              </div>

              {/* Handwritten subtext */}
              <div className="pt-2 text-center">
                <span className="font-handwritten text-[#2d2424] text-xs font-bold leading-tight block truncate">
                  {item.title.split(" ").slice(0, 2).join(" ")}
                </span>
                <span className="text-[8px] text-stone-500 block mt-0.5 tracking-wider font-semibold">
                  DRAG ME
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Guide Footer */}
      <div className="text-center text-[11px] font-sans text-stone-400 z-10 pt-4 border-t border-white/5">
        Tactile drag-and-drop mode. Cards preserve stacking orders.
      </div>
    </div>
  );
};
