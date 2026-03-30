"use client";

import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

export function RoutingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const pointsRef = useRef<{x: number, y: number, life: number}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const cw = width;
    const ch = height;

    canvas.width = cw;
    canvas.height = ch;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      
      // Grid configuration
      const gridSize = 40;
      
      // Add point near mouse but snapped to grid
      if (mouseRef.current.x > 0) {
        const snapX = Math.round(mouseRef.current.x / gridSize) * gridSize;
        const snapY = Math.round(mouseRef.current.y / gridSize) * gridSize;
        
        // Only add if it's far enough from the last point to create a new joint
        const last = pointsRef.current[pointsRef.current.length - 1];
        if (!last || Math.abs(last.x - snapX) > 0 || Math.abs(last.y - snapY) > 0) {
           pointsRef.current.push({ x: snapX, y: snapY, life: 1.0 });
        }
      }

      // Draw trails
      if (pointsRef.current.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < pointsRef.current.length - 1; i++) {
          const p1 = pointsRef.current[i];
          const p2 = pointsRef.current[i + 1];
          
          ctx.moveTo(p1.x, p1.y);
          // Draw Manhattan right-angle connection instead of direct diagonal
          ctx.lineTo(p2.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.strokeStyle = `rgba(217, 119, 69, 0.4)`; // Accent Primary
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Fade out old points
      pointsRef.current.forEach((p) => { p.life -= 0.02; });
      pointsRef.current = pointsRef.current.filter((p) => p.life > 0);

      // Draw base grid
      ctx.beginPath();
      for(let x=0; x<cw; x+=gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, ch); }
      for(let y=0; y<ch; y+=gridSize) { ctx.moveTo(0, y); ctx.lineTo(cw, y); }
      ctx.strokeStyle = "rgba(255,255,255, 0.02)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 mix-blend-screen"
    />
  );
}

export default RoutingBackground;
