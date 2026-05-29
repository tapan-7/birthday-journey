export interface MemoryMoment {
  id: string;
  image: string;
  title: string;
  caption: string;
  story: string;
  rotation?: number; // Tilt for scrapbook feel
}

export interface FunMemory {
  id: string;
  image: string;
  jokeTitle: string;
  caption: string;
  position: { x: number; y: number }; // Percentage offsets for floating cards
  rotation: number;
}

export interface EmotionalMoment {
  id: string;
  image: string;
  quote: string;
  story: string;
}
export interface Chapter {
  id: number;
  title: string;
  sub: string;
  description: string;
  glow: "purple" | "pink" | "blue" | "amber" | "rose" | "teal";
}

export interface BirthdayConfig {
  friendName: string;
  birthdayMonth: number; // 1-indexed (e.g., 5 for May)
  birthdayDay: number; // Day of month
  landingTitle: string;
  landingSubtitle: string;
  bypassUnlockText: string;

  // Audio tracks (can be local files in public/audio/ or CDNs)
  bgMusicUrl: string;
  vinylCrackleUrl: string;
  paperFlipUrl: string;
  cameraShutterUrl: string;
  typingUrl: string;

  // Sections
  chapters: Chapter[];
  moments: MemoryMoment[];
  funMemories: FunMemory[];
  emotionalQuotes: string[];
  emotionalMemories: EmotionalMoment[];
  celebrationLetter: {
    heading: string;
    paragraphs: string[];
    cakeCandlesCount: number;
  };
  hiddenSecret: {
    letterTitle: string;
    letterContent: string;
    bloopers: { title: string; text: string }[];
  };
  ending: {
    finalMessage: string;
    subText: string;
  };
}

export const birthdayData: BirthdayConfig = {
  friendName: "Alien",
  birthdayMonth: 5, // May
  birthdayDay: 28, // 28th (tomorrow, to trigger countdown)

  landingTitle: "Happy Birthday, Aalu ✨",
  landingSubtitle:
    "A cinematic journey through our favorite memories, inside jokes, and everything in between.",
  bypassUnlockText: "Tap to Unlock the Magic ✨",

  chapters: [
    {
      id: 1,
      title: "1. THE BEGINNING",
      sub: "Memory Constellation",
      description:
        "Swim into where it all began... The first 'hi', the first laugh, the first memory.",
      glow: "blue",
    },
    {
      id: 2,
      title: "2. CHAOS ZONE",
      sub: "Floating Memories",
      description:
        "All the crazy, random, funny, stupid & unforgettable moments.",
      glow: "purple",
    },
    {
      id: 3,
      title: "3. DEEPER THAN WORDS",
      sub: "Memories & Whispers",
      description:
        "The moments that meant everything. The words we never said out loud.",
      glow: "pink",
    },
    {
      id: 4,
      title: "4. LETTERS FROM ME",
      sub: "Gold Envelope",
      description: "Open letters, voice notes and words from my heart.",
      glow: "amber",
    },
    {
      id: 5,
      title: "5. WISHING WELL",
      sub: "Throw a Wish",
      description: "A magical wishing well. Make a wish and watch it drop.",
      glow: "rose",
    },
    {
      id: 6,
      title: "6. OUR LITTLE WORLD",
      sub: "Hidden Surprise",
      description: "A cozy ambient room built on memories, chaos & love.",
      glow: "teal",
    },
  ],

  // Audio files hosted on public/audio/ or royalty free URL placeholders for easy running
  // We'll create these files or use lightweight online audio URLs if needed
  bgMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // beautiful ambient music
  vinylCrackleUrl:
    "https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav", // Vinyl crackle sample
  paperFlipUrl: "https://assets.mixkit.co/active_storage/sfx/1487/1487-84.wav", // paper flip/rustle
  cameraShutterUrl:
    "https://assets.mixkit.co/active_storage/sfx/1258/1258-84.wav", // camera shutter click
  typingUrl: "https://assets.mixkit.co/active_storage/sfx/1075/1075-84.wav", // typing sound

  // 1. Beginning - Moments We Never Forgot
  moments: [
    {
      id: "moment-1",
      image:
        "/Alien/IMG_8150.JPG",
      title: "How It All Started",
      caption: "We started as strangers...",
      story:
        "It's funny how a random introduction turned into something so irreplaceable. From awkward handshakes to sharing our deepest secrets, we found comfort in the chaos of each other's lives.",
      rotation: -3,
    },
    {
      id: "moment-2",
      image:
        "/Alien/IMG-20250127-WA0002.jpg",
      title: "The Midnight Conversations",
      caption: "...and somehow became part of each other's lives.",
      story:
        "Remember the 3 AM chats? Discussing the universe, relationship drama, and plans to take over the world. You became the person I could text without thinking twice.",
      rotation: 4,
    },
    {
      id: "moment-3",
      image:
        "/Alien/IMG-20250130-WA0029.jpg",
      title: "Our Unplanned Adventures",
      caption: "Getting lost in the right places.",
      story:
        "We always ended up in the most random coffee shops, walking down streets we didn't know, laughing at things that made absolutely no sense to anyone else.",
      rotation: -2,
    },
  ],

  // 2. Chaos - Funniest Memories & Inside Jokes
  funMemories: [
    {
      id: "fun-1",
      image:
        "/Alien/IMG_20250125_124514.jpg",
      jokeTitle: "The Cafe Incident",
      caption:
        "The time you tried to pay with your gym membership card and didn't realize for 5 full minutes.",
      position: { x: 10, y: 15 },
      rotation: -6,
    },
    {
      id: "fun-2",
      image:
        "/Alien/IMG_20250125_164800137.jpg",
      jokeTitle: "Uncontrollable Laughs",
      caption:
        "Laughing so hard that tea literally came out of your nose. Still the highlight of my year.",
      position: { x: 50, y: 5 },
      rotation: 8,
    },
    {
      id: "fun-3",
      image:
        "/Alien/IMG_20250126_060417037_MP.jpg",
      jokeTitle: "Sleeping Everywhere",
      caption:
        "You can sleep in a loud club, in a moving car, or standing up. It's honestly a superpower.",
      position: { x: 25, y: 50 },
      rotation: -4,
    },
    {
      id: "fun-4",
      image:
        "/Alien/IMG_20250126_065033682.jpg",
      jokeTitle: "Typo Queen",
      caption:
        "'I'm running late' autocorrected to 'I'm eating slate'. Now we say it every single time.",
      position: { x: 65, y: 55 },
      rotation: 5,
    },
  ],

  // 3. Emotional / Core Memories
  emotionalQuotes: [
    "You made difficult days feel a little bit easier.",
    "Some people become comfort without realizing it.",
    "Thank you for being the one person who always understands my silence.",
  ],

  emotionalMemories: [
    {
      id: "em-1",
      image:
        "/Alien/IMG_20250126_070417629.jpg",
      quote: "You probably don't realize how important you are to people.",
      story:
        "In a world where everyone is constantly busy, you showed up. You listened when I felt small, and you reminded me of who I was when I forgot. That is your magic.",
    },
    {
      id: "em-2",
      image:
        "/Alien/IMG_20250126_134902112.jpg",
      quote: "Ordinary days became less ordinary because of you.",
      story:
        "We don't need fancy parties or grand adventures. Just sitting in your room, listening to music, and talking about life makes me feel incredibly lucky to have you.",
    },
  ],

  // 4. Celebration
  celebrationLetter: {
    heading: "Today is about celebrating you 🎂",
    paragraphs: [
      "Happy Birthday to my favorite human in the universe! You deserve every ounce of happiness, laughter, and cake today.",
      "Thank you for being the voice of reason when I'm crazy, and the partner-in-crime when I need some adventure. You're not just my best friend; you are family.",
      "As you blow out these candles, know that you are loved, appreciated, and that I'm always cheering for you from the sidelines, no matter where life takes us.",
    ],
    cakeCandlesCount: 3,
  },

  // 5. Hidden Secret Section (Accessible via a small star icon)
  hiddenSecret: {
    letterTitle: "A Secret Note (Just For Your Eyes) 🤫",
    letterContent:
      "If you found this, it means you're nosey... but that's why we're friends! Seriously though, thank you for being you. Here's a little secret: I always count myself lucky to have met someone who shares my exact level of brain rot. Keep shining, you beautiful nerd.",
    bloopers: [
      {
        title: "Roast #1",
        text: "You still text in lowercase to look 'aesthetic' but type in all caps when you get excited.",
      },
      {
        title: "Roast #2",
        text: "Your Spotify Wrapped is 90% sad songs even when you're perfectly happy.",
      },
      {
        title: "Fact",
        text: "You are the strongest person I know, and I am so proud of you.",
      },
    ],
  },

  // 6. Final Ending
  ending: {
    finalMessage: "Some people become memories. You became a part of life.",
    subText:
      "Thank you for every laugh, every moment, and every memory. Happy Birthday once again ✨",
  },
};
