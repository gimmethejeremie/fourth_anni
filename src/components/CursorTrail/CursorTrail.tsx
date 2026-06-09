import { useEffect, useRef } from "react";
import { usePointerType } from "../../hooks/usePointerType";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./CursorTrail.module.css";

type Particle = {
  x: number;
  y: number;
  createdAt: number;
  size: number;
};

const TRAIL_DURATION_MS = 500;

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPushRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const { isCoarse } = usePointerType();

  useEffect(() => {
    if (reducedMotion || isCoarse) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return undefined;
    }

    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const scheduleRender = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastPushRef.current < 24) {
        return;
      }

      lastPushRef.current = now;
      particlesRef.current.push({
        x: event.clientX,
        y: event.clientY,
        createdAt: now,
        size: 2 + Math.random() * 2.8,
      });
      scheduleRender();
    };

    const render = () => {
      frame = 0;
      const now = performance.now();
      context.clearRect(0, 0, width, height);
      particlesRef.current = particlesRef.current.filter((particle) => now - particle.createdAt < TRAIL_DURATION_MS);

      for (const particle of particlesRef.current) {
        const age = (now - particle.createdAt) / TRAIL_DURATION_MS;
        const alpha = Math.max(0, 1 - age);
        context.beginPath();
        context.fillStyle = `rgba(241, 231, 216, ${alpha * 0.32})`;
        context.shadowColor = `rgba(216, 180, 92, ${alpha * 0.45})`;
        context.shadowBlur = 10 * alpha;
        context.arc(particle.x, particle.y, particle.size * (1 + age), 0, Math.PI * 2);
        context.fill();
      }

      if (particlesRef.current.length > 0) {
        scheduleRender();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isCoarse, reducedMotion]);

  if (reducedMotion || isCoarse) {
    return null;
  }

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};
