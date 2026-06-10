import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { getAchievement } from "../lib/achievements";
import { audioManager } from "../lib/audioManager";
import { AppState } from "../lib/storage";

type ToastState = {
  id: string;
  title: string;
} | null;

export const useAchievement = (
  state: AppState,
  setState: Dispatch<SetStateAction<AppState>>,
) => {
  const [toast, setToast] = useState<ToastState>(null);

  const unlock = useCallback(
    (id: string) => {
      if (state.achievements.includes(id)) {
        return;
      }

      setState((previous) => {
        if (previous.achievements.includes(id)) {
          return previous;
        }

        return {
          ...previous,
          achievements: [...previous.achievements, id],
        };
      });

      const achievement = getAchievement(id);
      if (achievement) {
        setToast({ id, title: achievement.title });
        void audioManager.start().then(() => audioManager.playAchievementCue(achievement.tier));
      }
    },
    [setState, state.achievements],
  );

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  return { unlock, toast };
};
