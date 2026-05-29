import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  angle: number;
  spin: number;
}

interface Jellyfish {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  color: string;
  glowColor: string;
  tentacleColor: string;
  pulseSpeed: number;
}

export const BioluminescentCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Initialize stars (reduced density for performance)
    const stars: Particle[] = [];
    for (let i = 0; i < 45; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: (Math.random() * 0.05 + 0.02) * -1,
        speedX: Math.random() * 0.06 - 0.03,
        opacity: Math.random() * 0.5 + 0.3,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.01 + 0.005,
      });
    }

    // Initialize rising bubbles (reduced density for performance)
    const bubbles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height + height, // Start below or spread out
        size: Math.random() * 6 + 2,
        speedY: (Math.random() * 0.3 + 0.1) * -1,
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
      });
    }

    // Initialize bioluminescent jellyfish with pre-computed colors to avoid string.replace in render loop
    const jellyfish: Jellyfish[] = [
      {
        x: width * 0.15,
        y: height * 0.3,
        size: 30,
        speedY: -0.15,
        speedX: 0.05,
        color: "rgba(147, 197, 253, 0.25)",
        glowColor: "rgba(147, 197, 253, 0.4)",
        tentacleColor: "rgba(147, 197, 253, 0.35)",
        pulseSpeed: 0.015,
      }, // blue
      {
        x: width * 0.8,
        y: height * 0.6,
        size: 25,
        speedY: -0.12,
        speedX: -0.06,
        color: "rgba(244, 143, 177, 0.22)",
        glowColor: "rgba(244, 143, 177, 0.4)",
        tentacleColor: "rgba(244, 143, 177, 0.35)",
        pulseSpeed: 0.012,
      }, // pink
      {
        x: width * 0.45,
        y: height * 0.8,
        size: 35,
        speedY: -0.18,
        speedX: 0.08,
        color: "rgba(216, 180, 254, 0.24)",
        glowColor: "rgba(216, 180, 254, 0.4)",
        tentacleColor: "rgba(216, 180, 254, 0.35)",
        pulseSpeed: 0.016,
      }, // purple
      {
        x: width * 0.85,
        y: height * 0.2,
        size: 20,
        speedY: -0.1,
        speedX: -0.04,
        color: "rgba(167, 243, 208, 0.2)",
        glowColor: "rgba(167, 243, 208, 0.4)",
        tentacleColor: "rgba(167, 243, 208, 0.35)",
        pulseSpeed: 0.01,
      }, // teal
    ];

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const parallaxX = (mouse.x - width / 2) * 0.02;
      const parallaxY = (mouse.y - height / 2) * 0.02;

      // 1. Draw & Update Stars
      stars.forEach((star) => {
        star.y += star.speedY;
        star.x += star.speedX;
        star.angle += star.spin;

        // Twinkle effect
        const opacity = star.opacity + Math.sin(star.angle) * 0.2;

        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, opacity))})`;
        ctx.beginPath();
        ctx.arc(star.x + parallaxX * 0.5, star.y + parallaxY * 0.5, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw & Update Bubbles
      bubbles.forEach((b) => {
        b.y += b.speedY;
        b.x += b.speedX + Math.sin(time * 0.2 + b.angle) * 0.15;

        if (b.y < -50) {
          b.y = height + Math.random() * 100;
          b.x = Math.random() * width;
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        // Inner bubble highlight
        ctx.arc(b.x + parallaxX, b.y + parallaxY, b.size, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.2})`;
        ctx.beginPath();
        ctx.arc(b.x - b.size * 0.3 + parallaxX, b.y - b.size * 0.3 + parallaxY, b.size * 0.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw & Update Jellyfish
      jellyfish.forEach((j) => {
        // Jellyfish pulse size scaling
        const pulse = 1 + Math.sin(time * j.pulseSpeed * 10) * 0.08;
        const currentSize = j.size * pulse;

        // Movement
        j.y += j.speedY * pulse;
        j.x += j.speedX + Math.sin(time * 0.05) * 0.1;

        if (j.y < -100) {
          j.y = height + 100;
          j.x = Math.random() * width;
        }

        const renderX = j.x + parallaxX * 1.5;
        const renderY = j.y + parallaxY * 1.5;

        // Draw Jellyfish Cap (glowing bell)
        ctx.fillStyle = j.color;
        ctx.beginPath();
        ctx.arc(renderX, renderY, currentSize, Math.PI, 0, false);
        // wavy base of cap
        ctx.bezierCurveTo(
          renderX + currentSize * 0.5,
          renderY + currentSize * 0.15,
          renderX - currentSize * 0.5,
          renderY + currentSize * 0.15,
          renderX - currentSize,
          renderY
        );
        ctx.closePath();
        ctx.fill();

        // Glow ring
        ctx.strokeStyle = j.glowColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(renderX, renderY, currentSize + 2, Math.PI, 0, false);
        ctx.stroke();

        // Draw Jellyfish Tentacles (wavy paths)
        ctx.strokeStyle = j.tentacleColor;
        ctx.lineWidth = 1;
        const tentacleCount = 5;

        for (let t = 0; t < tentacleCount; t++) {
          const offset = (t / (tentacleCount - 1) - 0.5) * currentSize * 1.5;
          ctx.beginPath();
          ctx.moveTo(renderX + offset, renderY + currentSize * 0.05);

          let lastX = renderX + offset;
          let lastY = renderY + currentSize * 0.05;

          // Segmented wavy lines (reduced segments for performance)
          for (let seg = 1; seg <= 4; seg++) {
            const segY = lastY + currentSize * 0.35;
            const segX = lastX + Math.sin(time * 0.2 + seg * 0.5 + t) * 2;
            ctx.lineTo(segX, segY);
            lastX = segX;
            lastY = segY;
          }
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};
