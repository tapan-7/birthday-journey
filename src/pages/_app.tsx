import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Lenis from "lenis";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Lenis for smooth cinematic scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <Component {...pageProps} />;
}
