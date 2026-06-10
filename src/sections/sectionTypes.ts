import { Dispatch, SetStateAction } from "react";
import { GuideCharacter } from "../data/guides";
import { AppState, PartId } from "../lib/storage";

export type DialogueOverlayRequest = {
  speaker: GuideCharacter;
  lines: string[];
  align?: "left" | "right" | "center";
  mood?: "neutral" | "soft" | "serious" | "funny" | "mysterious" | "intimate";
  dimBackground?: boolean;
  skipLabel?: string;
  onComplete?: () => void;
};

export type SectionProps = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  unlock: (id: string) => void;
  completePart: (partId: PartId) => void;
  requestDialogue: (dialogue: DialogueOverlayRequest) => void;
  markDialogueSeen: (id: string) => void;
  hasSeenDialogue: (id: string) => boolean;
  isCompleted: boolean;
  isActive: boolean;
  openStarlog: () => void;
};
