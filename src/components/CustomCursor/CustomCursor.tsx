import { useEffect, useRef } from "react";
import { usePointerType } from "../../hooks/usePointerType";
import styles from "./CustomCursor.module.css";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const hoverRef = useRef(false);
  const frameRef = useRef(0);
  const positionRef = useRef({ x: 0, y: 0 });
  const pulseTimeoutRef = useRef(0);
  const { isCoarse } = usePointerType();

  useEffect(() => {
    if (isCoarse) {
      return undefined;
    }

    const cursor = cursorRef.current;
    if (!cursor) {
      return undefined;
    }

    const updateTransform = () => {
      frameRef.current = 0;
      const scale = hoverRef.current ? 1.48 : 1;
      const { x, y } = positionRef.current;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const scheduleUpdate = () => {
      if (frameRef.current === 0) {
        frameRef.current = window.requestAnimationFrame(updateTransform);
      }
    };

    const handleMove = (event: PointerEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
      scheduleUpdate();
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      hoverRef.current = Boolean(target?.closest("button, a, [data-clickable='true']"));
      cursor.classList.toggle(styles.hovering, hoverRef.current);
      scheduleUpdate();
    };

    const handleDown = () => {
      cursor.classList.add(styles.pulse);
      window.clearTimeout(pulseTimeoutRef.current);
      pulseTimeoutRef.current = window.setTimeout(() => cursor.classList.remove(styles.pulse), 220);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver);
    window.addEventListener("pointerdown", handleDown);

    return () => {
      if (frameRef.current !== 0) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.clearTimeout(pulseTimeoutRef.current);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", handleDown);
    };
  }, [isCoarse]);

  if (isCoarse) {
    return null;
  }

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      ✦
    </div>
  );
};
