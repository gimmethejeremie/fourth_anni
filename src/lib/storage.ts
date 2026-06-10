import type { TarotTopic } from "../data/tarotDeck";

export type SectionId =
  | "who"
  | "vhs"
  | "constellation"
  | "moonphase"
  | "vtuberArt"
  | "scrapbook"
  | "tarot"
  | "gacha"
  | "cipher"
  | "wishes"
  | "letters"
  | "teamGallery"
  | "starlog"
  | "finale";

export type PartId =
  | "constellation"
  | "moonphase"
  | "vtuberArt"
  | "scrapbook"
  | "tarot"
  | "gacha"
  | "cipher"
  | "wishes"
  | "letters"
  | "teamGallery"
  | "finale";
export type JourneyPartStatus = "locked" | "active" | "completed";

export type ArrivalYear = "2022" | "2023" | "2024" | "2025_2026";
export type ZodiacElement = "fire" | "earth" | "air" | "water";

export type Profile = {
  arrivalYear: ArrivalYear;
  birthMonth: number;
  zodiac: string;
  element: ZodiacElement;
};

export type SavedTarotCard = {
  id: string;
  title: string;
  viName: string;
  position: "single" | "past" | "present" | "advice";
  positionLabel: string;
  orientation: "upright" | "reversed";
  orientationLabel: "Xuôi" | "Ngược";
  keywords: string[];
  meaning: string;
};

export type TarotReading = {
  cards: SavedTarotCard[];
  topic: TarotTopic;
  topicLabel: string;
  question: string;
  createdAt: string;
} | null;

export type AppState = {
  hasStarted: boolean;
  currentSection: SectionId;
  activePartId: PartId;
  completedParts: PartId[];
  profile: Profile | null;
  achievements: string[];
  unlockedStars: string[];
  constellationSpecialStars: string[];
  scrapbookChapterIndex: number;
  tarotReading: TarotReading;
  tarotHistory: NonNullable<TarotReading>[];
  pinnedCharm: SavedTarotCard | null;
  characterAffinity: Record<string, number>;
  gashaponInventory: string[];
  gashaponPulls: number;
  gashaponPity: number;
  visitCount: number;
  directorCommentary: string[];
  scrapbookUnlocked: boolean;
  usedQuizIds: string[];
  quizFails: number;
  gachaTickets: number; // Tạm giữ để tương thích, không còn dùng
  minigameRecords: Record<string, { plays: number; wins: number }>;
  hasSeenGuidedTour: boolean;
};

export const STORAGE_KEY = "four-years-two-stars:v4";

export const createInitialState = (): AppState => ({
  hasStarted: false,
  currentSection: "vhs",
  activePartId: "constellation",
  completedParts: [],
  profile: null,
  achievements: [],
  unlockedStars: [],
  constellationSpecialStars: [],
  scrapbookChapterIndex: 0,
  tarotReading: null,
  tarotHistory: [],
  pinnedCharm: null,
  characterAffinity: {},
  gashaponInventory: [],
  gashaponPulls: 0,
  gashaponPity: 0,
  visitCount: 0,
  directorCommentary: [],
  scrapbookUnlocked: false,
  usedQuizIds: [],
  quizFails: 0,
  gachaTickets: 0,
  minigameRecords: {
    signalTiming: { plays: 0, wins: 0 },
    memoryCatch: { plays: 0, wins: 0 },
    memoryFlip: { plays: 0, wins: 0 },
    signalRepairCoop: { plays: 0, wins: 0 },
    balanceCoop: { plays: 0, wins: 0 },
  },
  hasSeenGuidedTour: false,
});

export const normalizeStoredState = (value: Partial<AppState> | null): AppState => {
  const base = createInitialState();

  if (!value || typeof value !== "object") {
    return base;
  }

  const completedParts = Array.isArray(value.completedParts) ? value.completedParts : [];
  const shouldInsertMoonPhase =
    value.hasStarted &&
    value.activePartId === "scrapbook" &&
    completedParts.includes("constellation") &&
    !completedParts.includes("moonphase") &&
    !completedParts.includes("scrapbook");

  const shouldInsertVtuberArt =
    value.hasStarted &&
    completedParts.includes("moonphase") &&
    !completedParts.includes("vtuberArt") &&
    !completedParts.includes("scrapbook");
    
  const shouldInsertCipher =
    value.hasStarted &&
    completedParts.includes("gacha") &&
    !completedParts.includes("cipher");

  const shouldInsertWishes = 
    value.hasStarted && 
    completedParts.includes("cipher") && 
    !completedParts.includes("wishes");

  const shouldInsertLetters = 
    value.hasStarted && 
    completedParts.includes("wishes") && 
    !completedParts.includes("letters");

  const shouldInsertTeamGallery =
    value.hasStarted &&
    completedParts.includes("letters") &&
    !completedParts.includes("teamGallery") &&
    !completedParts.includes("finale");

  let activePartId = value.activePartId ?? "constellation";
  let currentSection = value.currentSection ?? (value.hasStarted ? "constellation" : "vhs");

  if (shouldInsertMoonPhase) {
    activePartId = "moonphase";
    currentSection = "moonphase";
  } else if (shouldInsertVtuberArt) {
    activePartId = "vtuberArt";
    currentSection = "vtuberArt";
  } else if (shouldInsertCipher) {
    activePartId = "cipher";
    currentSection = "cipher";
  } else if (shouldInsertWishes) {
    activePartId = "wishes";
    currentSection = "wishes";
  } else if (shouldInsertLetters) {
    activePartId = "letters";
    currentSection = "letters";
  } else if (shouldInsertTeamGallery) {
    activePartId = "teamGallery";
    currentSection = "teamGallery";
  }

  return {
    ...base,
    ...value,
    currentSection,
    activePartId,
    completedParts,
    achievements: Array.isArray(value.achievements) ? value.achievements : [],
    unlockedStars: Array.isArray(value.unlockedStars) ? value.unlockedStars : [],
    constellationSpecialStars: Array.isArray(value.constellationSpecialStars)
      ? value.constellationSpecialStars
      : [],
    scrapbookChapterIndex:
      typeof value.scrapbookChapterIndex === "number" ? value.scrapbookChapterIndex : 0,
    tarotHistory: Array.isArray(value.tarotHistory) ? value.tarotHistory : [],
    pinnedCharm: typeof value.pinnedCharm === "object" ? value.pinnedCharm : null,
    characterAffinity: typeof value.characterAffinity === "object" && value.characterAffinity !== null 
      ? (value.characterAffinity as Record<string, number>) 
      : {},
    gashaponInventory: Array.isArray(value.gashaponInventory) ? value.gashaponInventory : [],
    gashaponPulls: typeof value.gashaponPulls === "number" ? value.gashaponPulls : 0,
    gashaponPity: typeof value.gashaponPity === "number" ? value.gashaponPity : 0,
    directorCommentary: Array.isArray(value.directorCommentary) ? value.directorCommentary : [],
    scrapbookUnlocked: typeof value.scrapbookUnlocked === "boolean" ? value.scrapbookUnlocked : false,
    usedQuizIds: Array.isArray(value.usedQuizIds) ? value.usedQuizIds : [],
    quizFails: typeof value.quizFails === "number" ? value.quizFails : 0,
    gachaTickets: typeof value.gachaTickets === "number" ? value.gachaTickets : 0,
    minigameRecords: typeof value.minigameRecords === "object" && value.minigameRecords !== null
      ? (value.minigameRecords as Record<string, { plays: number; wins: number }>)
      : base.minigameRecords,
    hasSeenGuidedTour: typeof value.hasSeenGuidedTour === "boolean" ? value.hasSeenGuidedTour : false,
  };
};
