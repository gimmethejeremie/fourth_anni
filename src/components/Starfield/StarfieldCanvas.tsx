import { useEffect, useRef } from "react";
import { constellationStars, StarPoint } from "../../data/constellation";
import styles from "./StarfieldCanvas.module.css";

type StarfieldCanvasProps = {
  stars?: StarPoint[];
  unlockedStars: string[];
  onStarClick?: (star: StarPoint) => void;
  bright?: boolean;
  showMoon?: boolean;
  className?: string;
};

type PositionedStar = {
  star: StarPoint;
  index: number;
  x: number;
  y: number;
  cached: boolean;
};

const BACKDROP_STAR_THRESHOLD = 80;
const BACKDROP_MAX_DPR = 1.35;
const INTERACTIVE_MAX_DPR = 2;
const BACKDROP_FRAME_MS = 1000 / 24;
const INTERACTIVE_FRAME_MS = 1000 / 42;

export const StarfieldCanvas = ({
  stars = constellationStars,
  unlockedStars,
  onStarClick,
  bright = false,
  showMoon = false,
  className = "",
}: StarfieldCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const unlockedRef = useRef(unlockedStars);
  const clickRef = useRef(onStarClick);

  useEffect(() => {
    unlockedRef.current = unlockedStars;
  }, [unlockedStars]);

  useEffect(() => {
    clickRef.current = onStarClick;
  }, [onStarClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return undefined;
    }

    let frame = 0;
    let resizeFrame = 0;
    let lastRenderAt = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let positionedStars: PositionedStar[] = [];
    let summerStars: PositionedStar[] = [];
    const pointer = { x: -9999, y: -9999 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const backdropOnly = !clickRef.current && stars.length >= BACKDROP_STAR_THRESHOLD;
    const targetFrameMs = backdropOnly ? BACKDROP_FRAME_MS : INTERACTIVE_FRAME_MS;
    const staticLayer = document.createElement("canvas");
    const staticContext = staticLayer.getContext("2d");
    const meteors = [
      { delay: 0, duration: 1100, cycle: 9200, startX: 0.1, startY: 0.18, travelX: 0.34, travelY: 0.2 },
      { delay: 4800, duration: 900, cycle: 11800, startX: 0.56, startY: 0.12, travelX: 0.28, travelY: 0.18 },
    ];

    const shouldCacheStar = (star: StarPoint, index: number) => {
      if (!backdropOnly || star.kind !== "minor") {
        return false;
      }

      return index % 10 !== 0 && index % 29 !== 0;
    };

    const prepareStars = () => {
      positionedStars = stars.map((star, index) => ({
        star,
        index,
        x: (star.x / 100) * width,
        y: ((100 - star.y) / 100) * height,
        cached: shouldCacheStar(star, index),
      }));
      summerStars = positionedStars.filter(({ star }) => star.kind === "summer");
    };

    const drawCachedStar = (ctx: CanvasRenderingContext2D, positioned: PositionedStar) => {
      const { star, index, x, y } = positioned;
      const baseAlpha = star.color.includes("0.84") ? 0.72 : 0.5;
      const seed = ((index * 9301 + 49297) % 233280) / 233280;
      const radius = Math.max(0.42, star.radius * (0.76 + seed * 0.22));

      ctx.globalAlpha = bright ? Math.min(0.82, baseAlpha + 0.16) : baseAlpha;
      ctx.shadowColor = star.color;
      ctx.shadowBlur = radius > 1 ? 2.6 : 1.4;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const renderStaticLayer = () => {
      if (!staticContext) {
        return;
      }

      staticLayer.width = Math.floor(width * dpr);
      staticLayer.height = Math.floor(height * dpr);
      staticContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      staticContext.clearRect(0, 0, width, height);
      staticContext.save();
      positionedStars.forEach((positioned) => {
        if (positioned.cached) {
          drawCachedStar(staticContext, positioned);
        }
      });
      staticContext.restore();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, backdropOnly ? BACKDROP_MAX_DPR : INTERACTIVE_MAX_DPR);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      prepareStars();
      renderStaticLayer();
      lastRenderAt = 0;
    };

    const drawAmbientSky = (ctx: CanvasRenderingContext2D, now: number) => {
      if (!showMoon) {
        return;
      }

      const drift = reduceMotion ? 0 : Math.sin(now * 0.00018) * width * 0.025;
      const upperGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.03,
        0,
        width * 0.5,
        height * 0.03,
        Math.max(width, height) * 0.72,
      );
      upperGlow.addColorStop(0, bright ? "rgba(241, 231, 216, 0.14)" : "rgba(241, 231, 216, 0.1)");
      upperGlow.addColorStop(0.34, "rgba(168, 146, 214, 0.055)");
      upperGlow.addColorStop(1, "rgba(8, 10, 18, 0)");

      const starRiver = ctx.createLinearGradient(width * 0.12 + drift, height * 0.02, width * 0.86 + drift, height * 0.74);
      starRiver.addColorStop(0, "rgba(146, 214, 255, 0)");
      starRiver.addColorStop(0.42, "rgba(241, 231, 216, 0.045)");
      starRiver.addColorStop(0.58, "rgba(216, 180, 92, 0.036)");
      starRiver.addColorStop(1, "rgba(168, 146, 214, 0)");

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = upperGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = starRiver;
      ctx.beginPath();
      ctx.ellipse(width * 0.5 + drift, height * 0.35, width * 0.68, height * 0.16, 0.48, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawMoon = (ctx: CanvasRenderingContext2D, now: number) => {
      if (!showMoon || width <= 0 || height <= 0) {
        return;
      }

      const radius = Math.min(78, Math.max(38, width * 0.052));
      const x = width * 0.5;
      const y = Math.max(radius * 0.95, height * 0.095);
      const breath = reduceMotion ? 0 : Math.sin(now * 0.0011) * 0.035;
      const glowRadius = radius * (4.1 + breath);
      const glow = ctx.createRadialGradient(x, y, radius * 0.25, x, y, glowRadius);
      glow.addColorStop(0, bright ? "rgba(255, 246, 216, 0.34)" : "rgba(255, 246, 216, 0.24)");
      glow.addColorStop(0.34, "rgba(216, 180, 92, 0.1)");
      glow.addColorStop(1, "rgba(216, 180, 92, 0)");

      const disc = ctx.createRadialGradient(x - radius * 0.32, y - radius * 0.35, radius * 0.1, x, y, radius);
      disc.addColorStop(0, "rgba(255, 250, 224, 0.98)");
      disc.addColorStop(0.58, "rgba(232, 220, 194, 0.9)");
      disc.addColorStop(1, "rgba(173, 160, 142, 0.8)");

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      ctx.shadowColor = "rgba(255, 244, 206, 0.55)";
      ctx.shadowBlur = 24;
      ctx.fillStyle = disc;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      const shade = ctx.createRadialGradient(x + radius * 0.38, y - radius * 0.12, radius * 0.08, x + radius * 0.38, y - radius * 0.12, radius * 1.12);
      shade.addColorStop(0, "rgba(13, 17, 32, 0.08)");
      shade.addColorStop(0.56, "rgba(13, 17, 32, 0.24)");
      shade.addColorStop(1, "rgba(13, 17, 32, 0.5)");
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(x + radius * 0.18, y, radius * 0.98, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "rgba(91, 86, 82, 0.7)";
      [
        { dx: -0.28, dy: -0.12, r: 0.09 },
        { dx: 0.05, dy: 0.22, r: 0.07 },
        { dx: 0.24, dy: -0.26, r: 0.055 },
      ].forEach((crater) => {
        ctx.beginPath();
        ctx.arc(x + radius * crater.dx, y + radius * crater.dy, radius * crater.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    };

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      positioned: PositionedStar,
      now: number,
      unlockedSet: Set<string>,
    ) => {
      const { star, index, x, y } = positioned;
      const isInteractive = Boolean(clickRef.current);
      const distance = isInteractive ? Math.hypot(pointer.x - x, pointer.y - y) : Infinity;
      const isNear = distance < 45;
      const isUnlocked = unlockedSet.has(star.id);
      const isSummer = star.kind === "summer";
      const isKey = star.kind === "key";
      const isMeaningful = isSummer || isKey || star.kind === "major";
      const pulse = reduceMotion ? 0 : Math.sin(now * 0.002 + index) * (isInteractive ? 0.3 : 0.45);
      const visualRadius =
        isInteractive && (isSummer || isKey) && !isUnlocked ? Math.min(star.radius, 3.75) : star.radius;
      const kindBoost =
        isSummer || isKey ? (isInteractive ? 1 : 1.35) : star.kind === "major" ? 0.92 : 0.68;

      const alpha = bright ? 0.95 : isInteractive ? 0.72 : 0.74;
      const hiddenSignalAlpha = (isSummer || isKey) && !isNear && !isUnlocked ? 0.9 : 1;

      let finalAlpha = alpha * hiddenSignalAlpha;
      let finalColor = star.color;
      let extraRadius = 0;
      let blurBoost = 1;
      let flareStrength = 0;

      if (star.kind === "minor") {
        const isSuperTwinkly = index % 10 === 0;
        const flashCycle = 7200 + ((index * 997) % 8200);
        const flashPhase = (now + ((index * 1543) % flashCycle)) % flashCycle;
        const flashDuration = 520 + ((index * 137) % 260);
        const flashProgress = !reduceMotion && flashPhase < flashDuration ? Math.sin((flashPhase / flashDuration) * Math.PI) : 0;
        const flashStrength = index % 29 === 0 ? flashProgress : 0;

        if (isSuperTwinkly) {
          const fastPulse = reduceMotion ? 0 : Math.sin(now * 0.003 + index * 100);
          finalAlpha = Math.max(0.08, 0.32 + fastPulse * 0.48);
          extraRadius = fastPulse > 0.7 ? fastPulse * 0.65 : 0;
          blurBoost = 1.35;
        } else {
          const slowPulse = reduceMotion ? 0 : Math.sin(now * 0.001 + index * 50);
          finalAlpha = Math.max(0.16, 0.34 + slowPulse * 0.28);
        }

        if (flashStrength > 0) {
          flareStrength = flashStrength;
          finalAlpha = Math.min(1, finalAlpha + flashStrength * 0.86);
          extraRadius += flashStrength * 2.2;
          blurBoost += flashStrength * 4.2;
          finalColor = "rgba(255, 248, 218, 1)";
        }
      }

      const radius = Math.max(
        0.45,
        (visualRadius + pulse + (isNear ? 1.05 : 0) + (isUnlocked ? 1.05 : 0)) * kindBoost + extraRadius,
      );
      const drawX = x + (isNear ? (pointer.x - x) * 0.025 : 0);
      const drawY = y + (isNear ? (pointer.y - y) * 0.025 : 0);

      ctx.save();
      ctx.beginPath();
      ctx.shadowColor = star.color;
      ctx.shadowBlur = (isNear || isUnlocked ? 14 : isInteractive ? 7 : 8) * kindBoost * blurBoost;
      ctx.globalAlpha = finalAlpha;
      ctx.fillStyle = finalColor;
      ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
      ctx.fill();

      if (flareStrength > 0.05) {
        const longArm = radius + 16 + flareStrength * 22;
        const shortArm = radius + 7 + flareStrength * 12;
        const horizontal = ctx.createLinearGradient(drawX - longArm, drawY, drawX + longArm, drawY);
        horizontal.addColorStop(0, "rgba(255, 248, 218, 0)");
        horizontal.addColorStop(0.48, `rgba(255, 248, 218, ${0.58 * flareStrength})`);
        horizontal.addColorStop(0.5, `rgba(255, 255, 255, ${0.94 * flareStrength})`);
        horizontal.addColorStop(0.52, `rgba(255, 248, 218, ${0.58 * flareStrength})`);
        horizontal.addColorStop(1, "rgba(255, 248, 218, 0)");

        const vertical = ctx.createLinearGradient(drawX, drawY - longArm, drawX, drawY + longArm);
        vertical.addColorStop(0, "rgba(255, 248, 218, 0)");
        vertical.addColorStop(0.48, `rgba(255, 248, 218, ${0.58 * flareStrength})`);
        vertical.addColorStop(0.5, `rgba(255, 255, 255, ${0.94 * flareStrength})`);
        vertical.addColorStop(0.52, `rgba(255, 248, 218, ${0.58 * flareStrength})`);
        vertical.addColorStop(1, "rgba(255, 248, 218, 0)");

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.shadowColor = "rgba(255, 248, 218, 0.9)";
        ctx.shadowBlur = 12 + flareStrength * 18;
        ctx.lineCap = "round";
        ctx.lineWidth = 1.35 + flareStrength * 1.7;
        ctx.strokeStyle = horizontal;
        ctx.beginPath();
        ctx.moveTo(drawX - longArm, drawY);
        ctx.lineTo(drawX + longArm, drawY);
        ctx.stroke();
        ctx.strokeStyle = vertical;
        ctx.beginPath();
        ctx.moveTo(drawX, drawY - shortArm);
        ctx.lineTo(drawX, drawY + shortArm);
        ctx.stroke();
        ctx.lineWidth = 0.65 + flareStrength;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.68)";
        ctx.beginPath();
        ctx.moveTo(drawX - shortArm * 0.55, drawY);
        ctx.lineTo(drawX + shortArm * 0.55, drawY);
        ctx.moveTo(drawX, drawY - shortArm * 0.55);
        ctx.lineTo(drawX, drawY + shortArm * 0.55);
        ctx.stroke();
        ctx.restore();
      }

      if (isUnlocked || (isInteractive && isNear)) {
        ctx.beginPath();
        ctx.globalAlpha = isUnlocked ? 0.7 : 0.24;
        ctx.strokeStyle = isKey
          ? "rgba(232, 169, 200, 0.58)"
          : isUnlocked
            ? "rgba(241, 231, 216, 0.52)"
            : "rgba(241, 231, 216, 0.42)";
        ctx.lineWidth = 1;
        ctx.arc(x, y, radius + 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (isMeaningful && isUnlocked) {
        ctx.globalAlpha = 0.78;
        ctx.fillStyle = isKey ? "rgba(232, 169, 200, 0.88)" : "rgba(241, 231, 216, 0.86)";
        ctx.font = "11px monospace";
        const offsetX = star.labelOffsetX ?? radius + 10;
        const offsetY = star.labelOffsetY ?? -radius - 7;
        ctx.fillText(star.label, x + offsetX, y + offsetY);
      }

      ctx.restore();
    };

    const drawConstellationLines = (ctx: CanvasRenderingContext2D, unlockedSet: Set<string>) => {
      if (summerStars.length === 0) {
        return;
      }

      const isInteractive = Boolean(clickRef.current);
      const lineStars = isInteractive ? summerStars.filter(({ star }) => unlockedSet.has(star.id)) : summerStars;

      if (isInteractive && lineStars.length < 2) {
        return;
      }

      ctx.save();
      ctx.strokeStyle = isInteractive ? "rgba(216, 180, 92, 0.18)" : "rgba(216, 180, 92, 0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      lineStars.forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      if (lineStars.length >= 3) {
        ctx.closePath();
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawPointerScan = (ctx: CanvasRenderingContext2D, now: number) => {
      if (!clickRef.current || pointer.x < 0 || pointer.y < 0) {
        return;
      }

      const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 64);
      gradient.addColorStop(0, "rgba(216, 180, 92, 0.11)");
      gradient.addColorStop(0.34, "rgba(216, 180, 92, 0.04)");
      gradient.addColorStop(1, "rgba(216, 180, 92, 0)");

      ctx.save();
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 64, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(216, 180, 92, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 28 + Math.sin(now * 0.003) * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const drawShootingStars = (ctx: CanvasRenderingContext2D, now: number) => {
      if (reduceMotion) {
        return;
      }

      meteors.forEach((meteor) => {
        const phase = (now + meteor.delay) % meteor.cycle;
        if (phase > meteor.duration) {
          return;
        }

        const progress = phase / meteor.duration;
        const ease = 1 - Math.pow(1 - progress, 3);
        const x = (meteor.startX + meteor.travelX * ease) * width;
        const y = (meteor.startY + meteor.travelY * ease) * height;
        const tailX = meteor.travelX * width * 0.22;
        const tailY = meteor.travelY * height * 0.22;
        const alpha = Math.sin(progress * Math.PI) * 0.8;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = "rgba(241, 231, 216, 0.86)";
        ctx.shadowColor = "rgba(216, 180, 92, 0.72)";
        ctx.shadowBlur = 16;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - tailX, y - tailY);
        ctx.stroke();
        ctx.fillStyle = "rgba(255, 244, 206, 0.95)";
        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const scheduleRender = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const render = (now: number) => {
      frame = 0;

      if (document.hidden) {
        return;
      }

      if (!reduceMotion && lastRenderAt && now - lastRenderAt < targetFrameMs) {
        scheduleRender();
        return;
      }

      lastRenderAt = now;
      context.clearRect(0, 0, width, height);

      const unlockedSet = new Set(unlockedRef.current);
      drawAmbientSky(context, now);
      if (backdropOnly && staticContext) {
        context.drawImage(staticLayer, 0, 0, width, height);
      }
      drawPointerScan(context, now);
      drawConstellationLines(context, unlockedSet);
      positionedStars.forEach((positioned) => {
        if (!positioned.cached) {
          drawStar(context, positioned, now, unlockedSet);
        }
      });
      drawMoon(context, now);
      drawShootingStars(context, now);

      if (!reduceMotion) {
        scheduleRender();
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const handleClick = (event: MouseEvent) => {
      if (!clickRef.current) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      let nearest: StarPoint | null = null;
      let nearestDistance = Infinity;

      for (const { star, x, y } of positionedStars) {
        const distance = Math.hypot(clickX - x, clickY - y);
        const hitRadius = 45;
        if (distance < hitRadius && distance < nearestDistance) {
          nearest = star;
          nearestDistance = distance;
        }
      }

      if (nearest) {
        clickRef.current(nearest);
      }
    };

    const handleResize = () => {
      if (resizeFrame !== 0) {
        return;
      }

      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
        scheduleRender();
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (frame !== 0) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }
        return;
      }

      lastRenderAt = 0;
      scheduleRender();
    };

    resize();
    if (clickRef.current) {
      canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
      canvas.addEventListener("pointerleave", handlePointerLeave);
    }
    canvas.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleRender();

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      if (resizeFrame !== 0) {
        window.cancelAnimationFrame(resizeFrame);
      }
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [bright, showMoon, stars, unlockedStars]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className}`}
      data-clickable={onStarClick ? "true" : undefined}
    />
  );
};
