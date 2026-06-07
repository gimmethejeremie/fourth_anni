import { achievements } from "../data/achievements";
import { AppState } from "./storage";

export const getAchievement = (id: string) => achievements.find((item) => item.id === id);

export const hasAchievement = (state: AppState, id: string) => state.achievements.includes(id);

export const canSeeHiddenStarlog = (state: AppState) =>
  hasAchievement(state, "tarot_reading") && hasAchievement(state, "gift_drawn");

export const getUnlockedAchievementCount = (state: AppState) =>
  achievements.filter((achievement) => state.achievements.includes(achievement.id)).length;
