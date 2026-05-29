import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./SoundController";
import { Star, X } from "lucide-react";

interface PhotoItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  story: string;
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
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  // Generate 16 mockup photos to represent a larger collection
  const allPhotos: PhotoItem[] = useMemo(() => {
    const defaultPhotos = [
      {
        id: "p1", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
        title: "How It All Started", caption: "We started as strangers...", story: "The first memory we shared."
      },
      {
        id: "p2", image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&q=80",
        title: "Midnight Chats", caption: "...and somehow became close.", story: "Late nights discussing the universe."
      },
      {
        id: "p3", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
        title: "Unplanned Adventures", caption: "Getting lost in the right places.", story: "Always ending up somewhere random."
      },
      {
        id: "p4", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
        title: "Study Sessions", caption: "Or mostly just pretending to study.", story: "Coffee and chaos."
      },
      {
        id: "p5", image: "https://images.unsplash.com/photo-1533227260812-d278631ed96f?w=600&q=80",
        title: "Road Trips", caption: "Singing at the top of our lungs.", story: "The playlist was always fire."
      },
      {
        id: "p6", image: "https://images.unsplash.com/photo-1502307100811-6bef1d2ebcc4?w=600&q=80",
        title: "Birthday Surprises", caption: "You never saw it coming.", story: "The best reaction ever."
      },
      {
        id: "p7", image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&q=80",
        title: "Concerts", caption: "Losing our voices.", story: "Front row magic."
      },
      {
        id: "p8", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80",
        title: "Food Coma", caption: "Eating everything in sight.", story: "We ordered way too much."
      }
    ];
    // Duplicate to make 16 unique IDs for the two rows
    return [...defaultPhotos, ...defaultPhotos.map(p => ({ ...p, id: p.id + "-copy" }))];
  }, []);

  const row1 = allPhotos.slice(0, 8);
  const row2 = allPhotos.slice(8, 16);

  const handleCardClick = (item: PhotoItem) => {
    playPaperFlip();
    onCollectStar(`polaroid-${item.id}`);
    setActivePhoto(item);
  };

  return (
    <div className="relative w-full flex flex-col overflow-hidden py-10">
      {/* Section label */}
      <div className="text-center mb-10 z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          className="font-handwritten text-cyan-300 text-2xl mb-2"
          style={{ textShadow: "0 0 20px rgba(34,211,238,0.5)" }}
        >
          drift portal
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl md:text-6xl font-bold text-white tracking-tight"
          style={{ textShadow: "0 0 40px rgba(34,211,238,0.2)" }}
        >
          Polaroid Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3"
        >
          A continuous flow of our favorite moments. Click to view.
        </motion.p>
      </div>

      {/* Marquee Tracks */}
      <div className="relative w-full flex flex-col gap-10 marquee-container py-4">
        
        {/* ROW 1: Scrolling Left */}
        <div className="w-full overflow-hidden flex">
          <div className="flex w-max animate-marquee-left gap-8 pr-8">
            {[...row1, ...row1].map((item, i) => {
              const isCollected = collectedStars.includes(`polaroid-${item.id}`);
              // Slight organic rotation
              const rot = i % 2 === 0 ? -3 : 2;
              return (
                <div 
                  key={`${item.id}-${i}`}
                  onClick={() => handleCardClick(item)}
                  style={{ transform: `rotate(${rot}deg)` }}
                  className="w-48 shrink-0 bg-white p-3 pb-10 rounded-sm shadow-xl cursor-pointer hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:!rotate-0 transition-all duration-300 group"
                >
                  <div className="relative aspect-square overflow-hidden mb-3">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 transition-all" />
                    {isCollected && (
                      <div className="absolute top-1.5 right-1.5 bg-amber-400 rounded-full p-1 shadow">
                        <Star className="h-3 w-3 fill-amber-900 text-amber-900" />
                      </div>
                    )}
                  </div>
                  <div className="text-center px-1">
                    <span className="font-handwritten text-stone-800 text-sm font-bold block truncate">
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: Scrolling Right */}
        <div className="w-full overflow-hidden flex">
          <div className="flex w-max animate-marquee-right gap-8 pr-8" style={{ marginLeft: "-50%" }}>
            {[...row2, ...row2].map((item, i) => {
              const isCollected = collectedStars.includes(`polaroid-${item.id}`);
              const rot = i % 3 === 0 ? 4 : -2;
              return (
                <div 
                  key={`${item.id}-${i}`}
                  onClick={() => handleCardClick(item)}
                  style={{ transform: `rotate(${rot}deg)` }}
                  className="w-48 shrink-0 bg-white p-3 pb-10 rounded-sm shadow-xl cursor-pointer hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:!rotate-0 transition-all duration-300 group"
                >
                  <div className="relative aspect-square overflow-hidden mb-3">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 transition-all" />
                    {isCollected && (
                      <div className="absolute top-1.5 right-1.5 bg-amber-400 rounded-full p-1 shadow">
                        <Star className="h-3 w-3 fill-amber-900 text-amber-900" />
                      </div>
                    )}
                  </div>
                  <div className="text-center px-1">
                    <span className="font-handwritten text-stone-800 text-sm font-bold block truncate">
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fade gradients on edges for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#06040a] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#06040a] to-transparent pointer-events-none z-10" />
      </div>

      {/* Expanded Photo View */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-lg w-full bg-[#f8f5f2] p-4 md:p-6 pb-12 rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActivePhoto(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-stone-800 flex items-center justify-center shadow-lg hover:bg-stone-200 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 shadow-inner">
                <img src={activePhoto.image} alt={activePhoto.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="text-center px-4">
                <h3 className="font-handwritten text-stone-800 text-3xl mb-2">{activePhoto.title}</h3>
                <p className="font-sans font-semibold text-stone-500 text-sm mb-3 uppercase tracking-widest">{activePhoto.caption}</p>
                <p className="font-emotional italic text-stone-600 text-lg leading-relaxed">
                  "{activePhoto.story}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
