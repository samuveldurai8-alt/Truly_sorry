import React, { useEffect, useRef, useState, useCallback } from 'react';
import { audioEngine } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  fadeSpeed: number;
  fadingIn: boolean;
  type: 'star' | 'circle' | 'heart';
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  // Spawn gentle heart on screen tap/click
  const handleGlobalClick = useCallback((e: MouseEvent | TouchEvent) => {
    // Avoid triggering on buttons or interactive elements
    const target = e.target as HTMLElement | null;
    if (target && (target.closest('button') || target.closest('a') || target.closest('input'))) {
      return;
    }

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (clientX === 0 && clientY === 0) return;

    // Play subtle soft heart note
    audioEngine.playHeartNote();

    const colors = ['#eec5d2', '#dfa2b4', '#e8d4f4', '#f5e4cc', '#ffffff'];
    const newHeart: ClickHeart = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      size: Math.random() * 8 + 16,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setClickHearts((prev) => [...prev.slice(-15), newHeart]);

    // Clean up heart after animation
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1800);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [handleGlobalClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette: soft cream, very light lavender, dusty pink, white, warm gold
    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(244, 219, 227, ', // dusty pink
      'rgba(235, 224, 246, ', // light lavender
      'rgba(247, 237, 225, ', // soft cream
      'rgba(235, 212, 175, ', // warm gold accent
    ];

    const particleCount = Math.min(width < 768 ? 40 : 75, 85);
    const particles: Particle[] = [];

    // Helper to draw a delicate five-pointed star
    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    // Helper to draw delicate heart
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      // bottom left curve
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
      // bottom right curve
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      // top right curve
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'star' | 'circle' | 'heart' =
        typeRand > 0.85 ? 'heart' : typeRand > 0.6 ? 'star' : 'circle';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'heart' ? Math.random() * 5 + 4 : type === 'star' ? Math.random() * 3.5 + 2 : Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -(Math.random() * 0.45 + 0.15), // drifting gently upwards
        opacity: Math.random() * 0.6 + 0.2,
        maxOpacity: Math.random() * 0.5 + 0.35,
        fadeSpeed: Math.random() * 0.008 + 0.003,
        fadingIn: Math.random() > 0.5,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Update opacity for gentle shimmering
        if (p.fadingIn) {
          p.opacity += p.fadeSpeed;
          if (p.opacity >= p.maxOpacity) p.fadingIn = false;
        } else {
          p.opacity -= p.fadeSpeed;
          if (p.opacity <= 0.08) p.fadingIn = true;
        }

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around borders
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.opacity))})`;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'heart') {
          drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
        } else if (p.type === 'star') {
          drawStar(ctx, 0, 0, 4, p.size, p.size * 0.38);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Soft animated gradient backdrops */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft radial aura 1: dusty rose top left */}
        <div className="absolute -top-[20%] -left-[15%] w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-[#fae5ec]/60 to-transparent blur-3xl" />
        {/* Soft radial aura 2: lavender top right */}
        <div className="absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-bl from-[#efe5f8]/50 to-transparent blur-3xl" />
        {/* Soft radial aura 3: warm honey cream bottom */}
        <div className="absolute -bottom-[15%] left-[20%] w-[70vw] h-[70vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-t from-[#f8eee4]/60 to-transparent blur-3xl" />
      </div>

      {/* Interactive & Ambient Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        aria-hidden="true"
      />

      {/* Floating hearts generated on user tap/click */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
        {clickHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute transition-transform select-none"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              animation: 'clickHeartFly 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            }}
          >
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 24 24"
              fill={heart.color}
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.75"
              className="drop-shadow-sm"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes clickHeartFly {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
          }
          40% {
            opacity: 0.95;
            transform: translate(-50%, -60px) scale(1.15) rotate(-6deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -140px) scale(0.9) rotate(12deg);
          }
        }
      `}</style>
    </>
  );
};
