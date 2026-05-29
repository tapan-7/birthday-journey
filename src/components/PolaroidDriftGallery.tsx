import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
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

export const ALL_PHOTOS: PhotoItem[] = [
  {
    id: "p0",
    image: "/Alien/20230108100218_IMG_9779.JPG",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p1",
    image: "/Alien/20230108143952_IMG_0089.JPG",
    title: "Good Times",
    caption: "Never forget this",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p2",
    image: "/Alien/20230108143955_IMG_0091.JPG",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p3",
    image: "/Alien/20230108171057_IMG_0318.JPG",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "One for the history books.",
  },
  {
    id: "p7",
    image: "/Alien/DDO07689.JPG",
    title: "Vibes",
    caption: "Epic times",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p8",
    image: "/Alien/DDO07691.JPG",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "One for the history books.",
  },
  {
    id: "p9",
    image: "/Alien/DDO07699.JPG",
    title: "Good Times",
    caption: "Never forget this",
    story: "I would relive this day anytime.",
  },
  {
    id: "p10",
    image: "/Alien/DDO07700.JPG",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p11",
    image: "/Alien/IMG-20171111-WA0012.jpg",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p12",
    image: "/Alien/IMG-20220529-WA0012.jpg",
    title: "Smiles",
    caption: "Forever",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p13",
    image: "/Alien/IMG-20220529-WA0014.jpg",
    title: "Random Click",
    caption: "Priceless",
    story: "One for the history books.",
  },
  {
    id: "p14",
    image: "/Alien/IMG-20220530-WA0017.jpg",
    title: "Besties",
    caption: "Pure joy",
    story: "I would relive this day anytime.",
  },
  {
    id: "p15",
    image: "/Alien/IMG-20230222-WA0014.jpg",
    title: "Vibes",
    caption: "Epic times",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p16",
    image: "/Alien/IMG-20230620-WA0001.jpg",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p17",
    image: "/Alien/IMG-20230814-WA0000.jpg",
    title: "Good Times",
    caption: "Never forget this",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p18",
    image: "/Alien/IMG-20230827-WA0003.jpg",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "One for the history books.",
  },
  {
    id: "p19",
    image: "/Alien/IMG-20230830-WA0010.jpg",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "I would relive this day anytime.",
  },
  {
    id: "p20",
    image: "/Alien/IMG-20240131-WA0000.jpg",
    title: "Smiles",
    caption: "Forever",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p21",
    image: "/Alien/IMG-20240314-WA0003.jpg",
    title: "Random Click",
    caption: "Priceless",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p22",
    image: "/Alien/IMG-20240314-WA0008.jpg",
    title: "Besties",
    caption: "Pure joy",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p23",
    image: "/Alien/IMG-20240714-WA0010.jpg",
    title: "Vibes",
    caption: "Epic times",
    story: "One for the history books.",
  },
  {
    id: "p24",
    image: "/Alien/IMG-20240714-WA0040.jpg",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "I would relive this day anytime.",
  },
  {
    id: "p25",
    image: "/Alien/IMG-20240714-WA0063.jpg",
    title: "Good Times",
    caption: "Never forget this",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p26",
    image: "/Alien/IMG-20240815-WA0006.jpg",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p27",
    image: "/Alien/IMG-20241023-WA0004.jpg",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p28",
    image: "/Alien/IMG-20250127-WA0002.jpg",
    title: "Smiles",
    caption: "Forever",
    story: "One for the history books.",
  },
  {
    id: "p29",
    image: "/Alien/IMG-20250127-WA0142.jpg",
    title: "Random Click",
    caption: "Priceless",
    story: "I would relive this day anytime.",
  },
  {
    id: "p30",
    image: "/Alien/IMG-20250130-WA0029.jpg",
    title: "Besties",
    caption: "Pure joy",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p31",
    image: "/Alien/IMG-20250317-WA0001.jpg",
    title: "Vibes",
    caption: "Epic times",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p32",
    image: "/Alien/IMG-20250317-WA0004.jpg",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p33",
    image: "/Alien/IMG-20250317-WA0005.jpg",
    title: "Good Times",
    caption: "Never forget this",
    story: "One for the history books.",
  },
  {
    id: "p34",
    image: "/Alien/IMG20231111132633.jpg",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "I would relive this day anytime.",
  },
  {
    id: "p35",
    image: "/Alien/IMG_20230129_220452.jpg",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p36",
    image: "/Alien/IMG_20230717_211049_974.jpg",
    title: "Smiles",
    caption: "Forever",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p37",
    image: "/Alien/IMG_20241208_134908757.jpg",
    title: "Random Click",
    caption: "Priceless",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p38",
    image: "/Alien/IMG_20241208_134947612.jpg",
    title: "Besties",
    caption: "Pure joy",
    story: "One for the history books.",
  },
  {
    id: "p39",
    image: "/Alien/IMG_20241208_183723852.jpg",
    title: "Vibes",
    caption: "Epic times",
    story: "I would relive this day anytime.",
  },
  {
    id: "p40",
    image: "/Alien/IMG_20241208_183835542.jpg",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p41",
    image: "/Alien/IMG_20250124_192628844.jpg",
    title: "Good Times",
    caption: "Never forget this",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p42",
    image: "/Alien/IMG_20250124_193654221.jpg",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p43",
    image: "/Alien/IMG_20250125_063327823.jpg",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "One for the history books.",
  },
  {
    id: "p44",
    image: "/Alien/IMG_20250125_124514.jpg",
    title: "Smiles",
    caption: "Forever",
    story: "I would relive this day anytime.",
  },
  {
    id: "p45",
    image: "/Alien/IMG_20250125_155217829.jpg",
    title: "Random Click",
    caption: "Priceless",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p46",
    image: "/Alien/IMG_20250125_155520747.jpg",
    title: "Besties",
    caption: "Pure joy",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p47",
    image: "/Alien/IMG_20250125_155954975.jpg",
    title: "Vibes",
    caption: "Epic times",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p48",
    image: "/Alien/IMG_20250125_162709 (1).jpg",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "One for the history books.",
  },
  {
    id: "p49",
    image: "/Alien/IMG_20250125_162931 (1).jpg",
    title: "Good Times",
    caption: "Never forget this",
    story: "I would relive this day anytime.",
  },
  {
    id: "p50",
    image: "/Alien/IMG_20250125_164800137.jpg",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p51",
    image: "/Alien/IMG_20250125_233813758.jpg",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p52",
    image: "/Alien/IMG_20250126_060417037_MP.jpg",
    title: "Smiles",
    caption: "Forever",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p53",
    image: "/Alien/IMG_20250126_061614267.jpg",
    title: "Random Click",
    caption: "Priceless",
    story: "One for the history books.",
  },
  {
    id: "p54",
    image: "/Alien/IMG_20250126_061620991.jpg",
    title: "Besties",
    caption: "Pure joy",
    story: "I would relive this day anytime.",
  },
  {
    id: "p55",
    image: "/Alien/IMG_20250126_061626301.jpg",
    title: "Vibes",
    caption: "Epic times",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p56",
    image: "/Alien/IMG_20250126_061813154.jpg",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p57",
    image: "/Alien/IMG_20250126_065014989.jpg",
    title: "Good Times",
    caption: "Never forget this",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p58",
    image: "/Alien/IMG_20250126_065033682.jpg",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "One for the history books.",
  },
  {
    id: "p59",
    image: "/Alien/IMG_20250126_065037636.jpg",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "I would relive this day anytime.",
  },
  {
    id: "p60",
    image: "/Alien/IMG_20250126_065041407.jpg",
    title: "Smiles",
    caption: "Forever",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p61",
    image: "/Alien/IMG_20250126_065058525.jpg",
    title: "Random Click",
    caption: "Priceless",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p62",
    image: "/Alien/IMG_20250126_065105235.jpg",
    title: "Besties",
    caption: "Pure joy",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p63",
    image: "/Alien/IMG_20250126_070417629.jpg",
    title: "Vibes",
    caption: "Epic times",
    story: "One for the history books.",
  },
  {
    id: "p64",
    image: "/Alien/IMG_20250126_070423648.jpg",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "I would relive this day anytime.",
  },
  {
    id: "p65",
    image: "/Alien/IMG_20250126_070455846.jpg",
    title: "Good Times",
    caption: "Never forget this",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p66",
    image: "/Alien/IMG_20250126_125044789.jpg",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p67",
    image: "/Alien/IMG_20250126_134051037.jpg",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p68",
    image: "/Alien/IMG_20250126_134338452.jpg",
    title: "Smiles",
    caption: "Forever",
    story: "One for the history books.",
  },
  {
    id: "p69",
    image: "/Alien/IMG_20250126_134341177.jpg",
    title: "Random Click",
    caption: "Priceless",
    story: "I would relive this day anytime.",
  },
  {
    id: "p70",
    image: "/Alien/IMG_20250126_134902112.jpg",
    title: "Besties",
    caption: "Pure joy",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p71",
    image: "/Alien/IMG_20250126_164006.jpg",
    title: "Vibes",
    caption: "Epic times",
    story: "Looking back at these moments makes me smile.",
  },
  {
    id: "p72",
    image: "/Alien/IMG_20250126_164106.jpg",
    title: "Beautiful Memory",
    caption: "Moments we cherish",
    story: "We were absolutely unhinged here.",
  },
  {
    id: "p73",
    image: "/Alien/IMG_20250126_185313172.jpg",
    title: "Good Times",
    caption: "Never forget this",
    story: "One for the history books.",
  },
  {
    id: "p74",
    image: "/Alien/IMG_8150.JPG",
    title: "Crazy Adventures",
    caption: "Just us",
    story: "I would relive this day anytime.",
  },
  {
    id: "p75",
    image: "/Alien/null-17.jpg",
    title: "Unforgettable",
    caption: "Too much fun",
    story: "Every picture tells a story of our crazy friendship.",
  },
  {
    id: "p76",
    image: "/Alien/null-6.jpg",
    title: "Smiles",
    caption: "Forever",
    story: "Looking back at these moments makes me smile.",
  },
];

export const PolaroidDriftGallery = ({
  onPhotoClick,
  onCollectStar,
  collectedStars,
}: PolaroidDriftGalleryProps) => {
  const { playPaperFlip } = useSound();
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const row1 = ALL_PHOTOS.slice(0, 39);
  const row2 = ALL_PHOTOS.slice(39);

  const handleCardClick = (item: PhotoItem) => {
    playPaperFlip();
    onCollectStar(`polaroid-${item.id}`);
    setActivePhoto(item);
  };

  return (
    <div className="relative w-full flex flex-col py-10">
      {/* Section label */}
      <div className="text-center mb-10 z-10">
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
          Polaroid Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm mt-3"
        >
          A continuous flow of our favorite moments. Click to view.
        </motion.p>
      </div>

      {/* Marquee Tracks */}
      <div className="relative w-full flex flex-col gap-10 marquee-container py-4">
        {/* ROW 1: Scrolling Left */}
        <div
          className="w-full flex"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          <div className="flex w-max animate-marquee-left gap-8 pr-8">
            {[...row1, ...row1].map((item, i) => {
              const isCollected = collectedStars.includes(
                `polaroid-${item.id}`,
              );
              // Slight organic rotation
              const rot = i % 2 === 0 ? -3 : 2;
              return (
                <div
                  key={`${item.id}-${i}`}
                  onClick={() => handleCardClick(item)}
                  style={{ transform: `rotate(${rot}deg)` }}
                  className="w-48 shrink-0 bg-white p-3 pb-10 rounded-sm shadow-xl cursor-pointer hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:!rotate-0 transition-all duration-300 group"
                >
                  <div className="relative aspect-square overflow-hidden mb-3 bg-stone-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="200px"
                      className="object-contain filter brightness-95 group-hover:brightness-105 transition-all"
                    />
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
        <div
          className="w-full flex"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          <div
            className="flex w-max animate-marquee-right gap-8 pr-8"
            style={{ marginLeft: "-50%" }}
          >
            {[...row2, ...row2].map((item, i) => {
              const isCollected = collectedStars.includes(
                `polaroid-${item.id}`,
              );
              const rot = i % 3 === 0 ? 4 : -2;
              return (
                <div
                  key={`${item.id}-${i}`}
                  onClick={() => handleCardClick(item)}
                  style={{ transform: `rotate(${rot}deg)` }}
                  className="w-48 shrink-0 bg-white p-3 pb-10 rounded-sm shadow-xl cursor-pointer hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:!rotate-0 transition-all duration-300 group"
                >
                  <div className="relative aspect-square overflow-hidden mb-3 bg-stone-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="200px"
                      className="object-contain filter brightness-95 group-hover:brightness-105 transition-all"
                    />
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
      </div>

      {/* Expanded Photo View */}
      {mounted && createPortal(
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setActivePhoto(null)}
            >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
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

              <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 shadow-inner bg-stone-900">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="text-center px-4">
                <h3 className="font-handwritten text-stone-800 text-3xl mb-2">
                  {activePhoto.title}
                </h3>
                <p className="font-sans font-semibold text-stone-500 text-sm mb-3 uppercase tracking-widest">
                  {activePhoto.caption}
                </p>
                <p className="font-emotional italic text-stone-600 text-lg leading-relaxed">
                  "{activePhoto.story}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
};
