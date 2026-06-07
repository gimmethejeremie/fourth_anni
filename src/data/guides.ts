export type GuideCharacter = {
  id: string;
  name: string;
  role: string;
  color: string;
  align: "left" | "right" | "center";
  artSrc?: string;
  placeholderLabel: string;
  quirk?: string;
};

export const guides = {
  kagura: {
    id: "kagura",
    name: "Kagura",
    role: "Leader",
    color: "#D8B45C",
    align: "left",
    placeholderLabel: "KAGURA",
    quirk: "short, calm, authority",
  },
  imed: {
    id: "imed",
    name: "Imed",
    role: "Coder / Sound / Writer",
    color: "#22314D",
    align: "left",
    placeholderLabel: "IMED",
    quirk: "writes, deletes, rewrites",
  },
  lilWayne: {
    id: "lil-wayne",
    name: "Lil' Wayne",
    role: "Coder / Writer",
    color: "#7C8798",
    align: "right",
    placeholderLabel: "LIL' WAYNE",
    quirk: "fast, casual, sometimes no punctuation",
  },
  kuro: {
    id: "kuro",
    name: "Kuro",
    role: "Content / Event",
    color: "#9DB7A5",
    align: "right",
    placeholderLabel: "KURO",
    quirk: "slow, observant, long pauses",
  },
  nova: {
    id: "nova",
    name: "Nova",
    role: "Evaluator",
    color: "#E58D7A",
    align: "right",
    placeholderLabel: "NOVA",
    quirk: "deadpan analytical dry humor",
  },
  stone: {
    id: "stone",
    name: "Stone",
    role: "Animator",
    color: "#A892D6",
    align: "left",
    placeholderLabel: "STONE",
    quirk: "few words, deep feeling",
  },
} satisfies Record<string, GuideCharacter>;

export const guideList = Object.values(guides);
