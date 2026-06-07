import { useEffect, useRef } from "react";
import { usePointerType } from "../../hooks/usePointerType";
import styles from "./CustomCursor.module.css";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const hoverRef = useRef(false);
  const { isCoarse } = usePointerType();

  useEffect(() => {
    if (isCoarse) {
      return undefined;
    }

    const cursor = cursorRef.current;
    if (!cursor) {
      return undefined;
    }

    const updateTransform = (x: number, y: number) => {
      const scale = hoverRef.current ? 1.48 : 1;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const handleMove = (event: PointerEvent) => {
      updateTransform(event.clientX, event.clientY);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      hoverRef.current = Boolean(target?.closest("button, a, [data-clickable='true']"));
      cursor.classList.toggle(styles.hovering, hoverRef.current);
    };

    const handleDown = () => {
      cursor.classList.add(styles.pulse);
      window.setTimeout(() => cursor.classList.remove(styles.pulse), 220);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver);
    window.addEventListener("pointerdown", handleDown);

    return () => {
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
