import { useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "./SoundController";
import { Star } from "lucide-react";

interface PhotoItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  story: string;
  xOffset: number;
  yOffset: number;
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

  const photos: PhotoItem[] = [
    {
      id: "photo-1",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
      title: "How It All Started",
      caption: "We started as strangers...",
      story: "It's funny how a random introduction turned into something so irreplaceable. From awkward handshakes to sharing our deepest secrets, we found comfort in the chaos of each other's lives.",
      xOffset: 10,
      yOffset: 20,
      rot: -5,
    },
    {
      id: "photo-2",
      image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&auto=format&fit=crop&q=80",
      title: "The Midnight Conversations",
      caption: "...and somehow became close.",
      story: "Remember the 3 AM chats? Discussing the universe, relationship drama, and plans to take over the world. You became the person I could text without thinking twice.",
      xOffset: 38,
      yOffset: 10,
      rot: 6,
    },
    {
      id: "photo-3",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
      title: "Unplanned Adventures",
      caption: "Getting lost in the right places.",
      story: "We always ended up in the most random coffee shops, walking down streets we didn't know, laughing at things that made absolutely no sense to anyone else.",
      xOffset: 62,
      yOffset: 25,
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
    onPhotoClick({ image: item.image, title: item.title, caption: item.caption, story: item.story });
  };

  return (
    <div className="relative w-full flex flex-col">
      {/* Section label */}
      <div className="text-center mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-handwritten text-cyan-300 text-2xl mb-2"
          style={{ textShadow: "0 0 20px rgba(34,211,238,0.5)" }}
        >
          drift portal
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl md:text-6xl font-bold text-white tracking-tight"
          style={{ textShadow: "0 0 40px rgba(34,211,238,0.2)" }}
        >
          Polaroid Drift Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3"
        >
          Drag, stack & click photos to relive the memories
        </motion.p>
      </div>

      {/* Scattered Polaroid field — no container box */}
      <div className="relative w-full select-none" style={{ height: 460 }}>
        {photos.map((item) => {
          const isCollected = collectedStars.includes(`polaroid-${item.id}`);
          const currentZ   = activeZIndex[item.id] || 2;

          return (
            <motion.div
              key={item.id}
              drag
              dragConstraints={{ left: -60, right: 200, top: -30, bottom: 120 }}
              onDragStart={() => handleDragStart(item.id)}
              onClick={() => handleCardClick(item)}
              style={{
                position: "absolute",
                left: `${item.xOffset}%`,
                top:  `${item.yOffset}%`,
                zIndex: currentZ,
                cursor: "grab",
              }}
              whileDrag={{ scale: 1.07, cursor: "grabbing", zIndex: topZ + 1 }}
              animate={{ rotate: item.rot }}
              whileHover={{ rotate: 0, y: -6, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-44 select-none group"
            >
              {/* Polaroid frame — white border, real polaroid style */}
              <div
                className="bg-white p-2.5 pb-8 rounded-sm shadow-2xl"
                style={{ boxShadow: "0 15px 50px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)" }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable="false"
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  {isCollected && (
                    <div className="absolute top-1.5 right-1.5 bg-amber-400 rounded-full p-0.5 shadow">
                      <Star className="h-3 w-3 fill-amber-900 text-amber-900" />
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="pt-2 text-center">
                  <span className="font-handwritten text-stone-800 text-xs font-semibold block truncate">
                    {item.title.split(" ").slice(0, 3).join(" ")}
                  </span>
                  <span className="text-[8px] text-stone-400 block mt-0.5 tracking-widest font-semibold uppercase">
                    drag me
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-[11px] font-sans text-stone-600 mt-2 tracking-widest uppercase">
        Tactile drag-and-drop · cards preserve stacking order
      </p>
    </div>
  );
};
