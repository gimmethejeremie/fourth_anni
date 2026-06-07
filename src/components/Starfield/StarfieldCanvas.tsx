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
    let width = 0;
    let height = 0;
    let dpr = 1;
    const pointer = { x: -9999, y: -9999 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const meteors = [
      { delay: 0, duration: 1100, cycle: 9200, startX: 0.1, startY: 0.18, travelX: 0.34, travelY: 0.2 },
      { delay: 4800, duration: 900, cycle: 11800, startX: 0.56, startY: 0.12, travelX: 0.28, travelY: 0.18 },
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getStarPosition = (star: StarPoint) => ({
      x: (star.x / 100) * width,
      y: ((100 - star.y) / 100) * height,
    });

    const drawAmbientSky = (now: number) => {
      if (!showMoon) {
        return;
      }

      const drift = reduceMotion ? 0 : Math.sin(now * 0.00018) * width * 0.025;
      const upperGlow = context.createRadialGradient(width * 0.5, height * 0.03, 0, width * 0.5, height * 0.03, Math.max(width, height) * 0.72);
      upperGlow.addColorStop(0, bright ? "rgba(241, 231, 216, 0.14)" : "rgba(241, 231, 216, 0.1)");
      upperGlow.addColorStop(0.34, "rgba(168, 146, 214, 0.055)");
      upperGlow.addColorStop(1, "rgba(8, 10, 18, 0)");

      const starRiver = context.createLinearGradient(width * 0.12 + drift, height * 0.02, width * 0.86 + drift, height * 0.74);
      starRiver.addColorStop(0, "rgba(146, 214, 255, 0)");
      starRiver.addColorStop(0.42, "rgba(241, 231, 216, 0.045)");
      starRiver.addColorStop(0.58, "rgba(216, 180, 92, 0.036)");
      starRiver.addColorStop(1, "rgba(168, 146, 214, 0)");

      context.save();
      context.globalCompositeOperation = "screen";
      context.fillStyle = upperGlow;
      context.fillRect(0, 0, width, height);
      context.fillStyle = starRiver;
      context.beginPath();
      context.ellipse(width * 0.5 + drift, height * 0.35, width * 0.68, height * 0.16, 0.48, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawMoon = (now: number) => {
      if (!showMoon || width <= 0 || height <= 0) {
        return;
      }

      const radius = Math.min(78, Math.max(38, width * 0.052));
      const x = width * 0.5;
      const y = Math.max(radius * 0.95, height * 0.095);
      const breath = reduceMotion ? 0 : Math.sin(now * 0.0011) * 0.035;
      const glowRadius = radius * (4.1 + breath);
      const glow = context.createRadialGradient(x, y, radius * 0.25, x, y, glowRadius);
      glow.addColorStop(0, bright ? "rgba(255, 246, 216, 0.34)" : "rgba(255, 246, 216, 0.24)");
      glow.addColorStop(0.34, "rgba(216, 180, 92, 0.1)");
      glow.addColorStop(1, "rgba(216, 180, 92, 0)");

      const disc = context.createRadialGradient(x - radius * 0.32, y - radius * 0.35, radius * 0.1, x, y, radius);
      disc.addColorStop(0, "rgba(255, 250, 224, 0.98)");
      disc.addColorStop(0.58, "rgba(232, 220, 194, 0.9)");
      disc.addColorStop(1, "rgba(173, 160, 142, 0.8)");

      context.save();
      context.globalCompositeOperation = "screen";
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, glowRadius, 0, Math.PI * 2);
      context.fill();

      context.globalCompositeOperation = "source-over";
      context.shadowColor = "rgba(255, 244, 206, 0.55)";
      context.shadowBlur = 24;
      context.fillStyle = disc;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();

      const shade = context.createRadialGradient(x + radius * 0.38, y - radius * 0.12, radius * 0.08, x + radius * 0.38, y - radius * 0.12, radius * 1.12);
      shade.addColorStop(0, "rgba(13, 17, 32, 0.08)");
      shade.addColorStop(0.56, "rgba(13, 17, 32, 0.24)");
      shade.addColorStop(1, "rgba(13, 17, 32, 0.5)");
      context.fillStyle = shade;
      context.beginPath();
      context.arc(x + radius * 0.18, y, radius * 0.98, 0, Math.PI * 2);
      context.fill();

      context.shadowBlur = 0;
      context.globalAlpha = 0.2;
      context.fillStyle = "rgba(91, 86, 82, 0.7)";
      [
        { dx: -0.28, dy: -0.12, r: 0.09 },
        { dx: 0.05, dy: 0.22, r: 0.07 },
        { dx: 0.24, dy: -0.26, r: 0.055 },
      ].forEach((crater) => {
        context.beginPath();
        context.arc(x + radius * crater.dx, y + radius * crater.dy, radius * crater.r, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();
    };

    const drawStar = (star: StarPoint, index: number, now: number) => {
      const { x, y } = getStarPosition(star);
      const distance = Math.hypot(pointer.x - x, pointer.y - y);
      const isNear = distance < 45;
      const isUnlocked = unlockedRef.current.includes(star.id);
      const isInteractive = Boolean(clickRef.current);
      const isSummer = star.kind === "summer";
      const isKey = star.kind === "key";
      const isMeaningful = isSummer || isKey || star.kind === "major";
      const pulse = Math.sin(now * 0.002 + index) * (isInteractive ? 0.3 : 0.45);
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
        // Super twinkly effect for ~10% of background stars
        const isSuperTwinkly = index % 10 === 0;
        const flashCycle = 7200 + ((index * 997) % 8200);
        const flashPhase = (now + ((index * 1543) % flashCycle)) % flashCycle;
        const flashDuration = 520 + ((index * 137) % 260);
        const flashProgress = flashPhase < flashDuration ? Math.sin((flashPhase / flashDuration) * Math.PI) : 0;
        const flashStrength = index % 29 === 0 ? flashProgress : 0;

        if (isSuperTwinkly) {
          const fastPulse = Math.sin(now * 0.003 + index * 100);
          finalAlpha = Math.max(0, 0.3 + fastPulse * 0.7); // 0 to 1
          extraRadius = fastPulse > 0.7 ? fastPulse * 0.8 : 0;
          blurBoost = 1.5;
        } else {
          const slowPulse = Math.sin(now * 0.001 + index * 50);
          finalAlpha = Math.max(0.1, 0.3 + slowPulse * 0.4);
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

      context.save();
      context.beginPath();
      context.shadowColor = star.color;
      context.shadowBlur = (isNear || isUnlocked ? 14 : isInteractive ? 7 : 8) * kindBoost * blurBoost;
      context.globalAlpha = finalAlpha;
      context.fillStyle = finalColor;
      context.arc(x + (isNear ? (pointer.x - x) * 0.025 : 0), y + (isNear ? (pointer.y - y) * 0.025 : 0), radius, 0, Math.PI * 2);
      context.fill();

      if (flareStrength > 0.05) {
        const flareX = x + (isNear ? (pointer.x - x) * 0.025 : 0);
        const flareY = y + (isNear ? (pointer.y - y) * 0.025 : 0);
        const longArm = radius + 16 + flareStrength * 22;
        const shortArm = radius + 7 + flareStrength * 12;
        const horizontal = context.createLinearGradient(flareX - longArm, flareY, flareX + longArm, flareY);
        horizontal.addColorStop(0, "rgba(255, 248, 218, 0)");
        horizontal.addColorStop(0.48, `rgba(255, 248, 218, ${0.58 * flareStrength})`);
        horizontal.addColorStop(0.5, `rgba(255, 255, 255, ${0.94 * flareStrength})`);
        horizontal.addColorStop(0.52, `rgba(255, 248, 218, ${0.58 * flareStrength})`);
        horizontal.addColorStop(1, "rgba(255, 248, 218, 0)");

        const vertical = context.createLinearGradient(flareX, flareY - longArm, flareX, flareY + longArm);
        vertical.addColorStop(0, "rgba(255, 248, 218, 0)");
        vertical.addColorStop(0.48, `rgba(255, 248, 218, ${0.58 * flareStrength})`);
        vertical.addColorStop(0.5, `rgba(255, 255, 255, ${0.94 * flareStrength})`);
        vertical.addColorStop(0.52, `rgba(255, 248, 218, ${0.58 * flareStrength})`);
        vertical.addColorStop(1, "rgba(255, 248, 218, 0)");

        context.save();
        context.globalCompositeOperation = "screen";
        context.shadowColor = "rgba(255, 248, 218, 0.9)";
        context.shadowBlur = 12 + flareStrength * 18;
        context.lineCap = "round";
        context.lineWidth = 1.35 + flareStrength * 1.7;
        context.strokeStyle = horizontal;
        context.beginPath();
        context.moveTo(flareX - longArm, flareY);
        context.lineTo(flareX + longArm, flareY);
        context.stroke();
        context.strokeStyle = vertical;
        context.beginPath();
        context.moveTo(flareX, flareY - shortArm);
        context.lineTo(flareX, flareY + shortArm);
        context.stroke();
        context.lineWidth = 0.65 + flareStrength;
        context.strokeStyle = "rgba(255, 255, 255, 0.68)";
        context.beginPath();
        context.moveTo(flareX - shortArm * 0.55, flareY);
        context.lineTo(flareX + shortArm * 0.55, flareY);
        context.moveTo(flareX, flareY - shortArm * 0.55);
        context.lineTo(flareX, flareY + shortArm * 0.55);
        context.stroke();
        context.restore();
      }

      if (isUnlocked || (isInteractive && isNear)) {
        context.beginPath();
        context.globalAlpha = isUnlocked ? 0.7 : 0.24;
        context.strokeStyle = isKey
          ? "rgba(232, 169, 200, 0.58)"
          : isUnlocked
            ? "rgba(241, 231, 216, 0.52)"
            : "rgba(241, 231, 216, 0.42)";
        context.lineWidth = 1;
        context.arc(x, y, radius + 8, 0, Math.PI * 2);
        context.stroke();
      }

      if (isMeaningful && isUnlocked) {
        context.globalAlpha = 0.78;
        context.fillStyle = isKey ? "rgba(232, 169, 200, 0.88)" : "rgba(241, 231, 216, 0.86)";
        context.font = "11px monospace";
        const offsetX = star.labelOffsetX ?? (radius + 10);
        const offsetY = star.labelOffsetY ?? (-radius - 7);
        context.fillText(star.label, x + offsetX, y + offsetY);
      }

      context.restore();
    };

    const drawConstellationLines = () => {
      const summer = stars.filter((star) => star.kind === "summer");
      const unlockedSummer = summer.filter((star) => unlockedRef.current.includes(star.id));
      const isInteractive = Boolean(clickRef.current);

      if (isInteractive && unlockedSummer.length < 2) {
        return;
      }

      const lineStars = isInteractive ? unlockedSummer : summer;
      context.save();
      context.strokeStyle = isInteractive ? "rgba(216, 180, 92, 0.18)" : "rgba(216, 180, 92, 0.16)";
      context.lineWidth = 1;
      context.beginPath();
      lineStars.forEach((star, index) => {
        const { x, y } = getStarPosition(star);
        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });
      if (lineStars.length >= 3) {
        context.closePath();
      }
      context.stroke();
      context.restore();
    };

    const drawPointerScan = () => {
      const isInteractive = Boolean(clickRef.current);
      if (!isInteractive || pointer.x < 0 || pointer.y < 0) {
        return;
      }

      const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 64);
      gradient.addColorStop(0, "rgba(216, 180, 92, 0.11)");
      gradient.addColorStop(0.34, "rgba(216, 180, 92, 0.04)");
      gradient.addColorStop(1, "rgba(216, 180, 92, 0)");

      context.save();
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(pointer.x, pointer.y, 64, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "rgba(216, 180, 92, 0.12)";
      context.lineWidth = 1;
      context.beginPath();
      context.arc(pointer.x, pointer.y, 28 + Math.sin(performance.now() * 0.003) * 3, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    };

    const drawShootingStars = (now: number) => {
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

        context.save();
        context.globalAlpha = alpha;
        context.strokeStyle = "rgba(241, 231, 216, 0.86)";
        context.shadowColor = "rgba(216, 180, 92, 0.72)";
        context.shadowBlur = 16;
        context.lineWidth = 1.2;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - tailX, y - tailY);
        context.stroke();
        context.fillStyle = "rgba(255, 244, 206, 0.95)";
        context.beginPath();
        context.arc(x, y, 1.7, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
    };

    const render = () => {
      const now = performance.now();
      context.clearRect(0, 0, width, height);

      drawAmbientSky(now);
      drawPointerScan();
      drawConstellationLines();
      stars.forEach((star, index) => drawStar(star, index, now));
      drawMoon(now);
      drawShootingStars(now);
      frame = window.requestAnimationFrame(render);
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
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      let nearest: StarPoint | null = null;
      let nearestDistance = Infinity;

      for (const star of stars) {
        const { x, y } = getStarPosition(star);
        const distance = Math.hypot(clickX - x, clickY - y);
        const hitRadius = 45; // Match the hover radius exactly
        if (distance < hitRadius && distance < nearestDistance) {
          nearest = star;
          nearestDistance = distance;
        }
      }

      if (nearest) {
        clickRef.current?.(nearest);
      }
    };

    resize();
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
    };
  }, [bright, showMoon, stars]);

  return <canvas ref={canvasRef} className={`${styles.canvas} ${className}`} data-clickable="true" />;
};
