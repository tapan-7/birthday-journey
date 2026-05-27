export const FilmGrain = () => {
  return (
    <>
      {/* Dynamic Animated Grain Overlay */}
      <div className="film-grain" />

      {/* Cinematic Ambient Light Leaks (absolute blur backdrops) */}
      <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none mix-blend-screen z-[2] animate-pulse duration-[8s]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-rose-500/5 blur-[100px] pointer-events-none mix-blend-screen z-[2] animate-pulse duration-[10s]" />
      <div className="absolute top-[60%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none mix-blend-screen z-[1]" />
    </>
  );
};
