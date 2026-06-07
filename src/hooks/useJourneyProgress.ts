import { Dispatch, SetStateAction, useCallback } from "react";
import { getNextPartId, partAchievementMap } from "../data/journey";
import { AppState, JourneyPartStatus, PartId } from "../lib/storage";

export const useJourneyProgress = (
  state: AppState,
  setState: Dispatch<SetStateAction<AppState>>,
  unlock: (id: string) => void,
) => {
  const getPartStatus = useCallback(
    (partId: PartId): JourneyPartStatus => {
      if (state.completedParts.includes(partId)) {
        return "completed";
      }

      if (state.hasStarted && state.activePartId === partId) {
        return "active";
      }

      return "locked";
    },
    [state.activePartId, state.completedParts, state.hasStarted],
  );

  const isPartLocked = useCallback(
    (partId: PartId) => getPartStatus(partId) === "locked",
    [getPartStatus],
  );

  const completePart = useCallback(
    (partId: PartId) => {
      unlock(partAchievementMap[partId]);

      setState((previous) => {
        const completedParts = previous.completedParts.includes(partId)
          ? previous.completedParts
          : [...previous.completedParts, partId];
        const nextPart = getNextPartId(partId);

        return {
          ...previous,
          completedParts,
          activePartId: nextPart ?? partId,
          currentSection: nextPart ?? partId,
        };
      });
    },
    [setState, unlock],
  );

  return {
    activePartId: state.activePartId,
    completedParts: state.completedParts,
    completePart,
    getPartStatus,
    isPartLocked,
  };
};
