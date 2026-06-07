import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export const useTypewriter = (text: string, charactersPerSecond = 20) => {
  const reducedMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(text.length);

  useEffect(() => {
    setVisibleCount(reducedMotion ? text.length : 0);
  }, [reducedMotion, text]);

  useEffect(() => {
    if (reducedMotion || visibleCount >= text.length) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setVisibleCount((count) => Math.min(text.length, count + 1));
    }, Math.max(16, 1000 / charactersPerSecond));

    return () => window.clearInterval(interval);
  }, [charactersPerSecond, reducedMotion, text.length, visibleCount]);

  const skip = useCallback(() => {
    setVisibleCount(text.length);
  }, [text.length]);

  return {
    text: text.slice(0, visibleCount),
    isComplete: visibleCount >= text.length,
    skip,
  };
};
