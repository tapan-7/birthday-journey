export const FilmGrain = () => {
  return (
    <>
      {/* Dynamic Animated Grain Overlay */}
      <div className="film-grain" />

      {/* Cinematic Ambient Light Leaks (optimized with CSS radial gradients instead of heavy filter blurs) */}
      <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.08)_0%,rgba(249,115,22,0)_70%)] pointer-events-none mix-blend-screen z-[2]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.04)_0%,rgba(244,63,94,0)_70%)] pointer-events-none mix-blend-screen z-[2]" />
      <div className="absolute top-[60%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.03)_0%,rgba(245,158,11,0)_70%)] pointer-events-none mix-blend-screen z-[1]" />
    </>
  );
};
