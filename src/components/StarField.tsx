import { useEffect, useRef } from "react";

export const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
      fadeSpeed: number;
      ascending: boolean;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const density = Math.floor((canvas.width * canvas.height) / 8000);
      const limit = Math.min(density, 150); // limit to 150 stars max for performance
      for (let i = 0; i < limit; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.2 + 0.05,
          alpha: Math.random(),
          fadeSpeed: Math.random() * 0.01 + 0.003,
          ascending: Math.random() > 0.5,
        });
      }
    };

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      stars.forEach((star) => {
        // Draw star
        ctx.fillStyle = `rgba(251, 247, 244, ${star.alpha})`;
        ctx.beginPath();
        // Shift star position slightly based on mouse
        const currentX = star.x + mouseX * star.speed;
        const currentY = star.y + mouseY * star.speed;
        ctx.arc(currentX, currentY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Animate size/twinkle
        if (star.ascending) {
          star.alpha += star.fadeSpeed;
          if (star.alpha >= 0.8) star.ascending = false;
        } else {
          star.alpha -= star.fadeSpeed;
          if (star.alpha <= 0.1) star.ascending = true;
        }

        // Float upwards slowly
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
