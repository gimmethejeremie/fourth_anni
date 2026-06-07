import { Dispatch, SetStateAction, useEffect, useState } from "react";

const resolveValue = <T,>(value: T | (() => T)): T =>
  typeof value === "function" ? (value as () => T)() : value;

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T | (() => T),
  normalize?: (value: unknown) => T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const fallback = resolveValue(initialValue);

    if (typeof window === "undefined") {
      return fallback;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return fallback;
      }

      const parsed = JSON.parse(item);
      return normalize ? normalize(parsed) : (parsed as T);
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Storage can be blocked in private contexts; the app should still run.
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
