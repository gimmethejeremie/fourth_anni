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
    name: "Nhiên Anh",
    role: "Leader",
    color: "#D8B45C",
    align: "left",
    placeholderLabel: "NHIEN ANH",
    quirk: "short, calm, authority",
  },
  imed: {
    id: "imed",
    name: "Demi",
    role: "Coder / Sound / Writer",
    color: "#22314D",
    align: "left",
    placeholderLabel: "DEMI",
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
    name: "Mashiro",
    role: "Content / Event",
    color: "#9DB7A5",
    align: "right",
    placeholderLabel: "MASHIRO",
    quirk: "slow, observant, long pauses",
  },
  nova: {
    id: "nova",
    name: "Ren Phạm",
    role: "Evaluator",
    color: "#E58D7A",
    align: "right",
    placeholderLabel: "REN PHAM",
    quirk: "deadpan analytical dry humor",
  },
  stone: {
    id: "stone",
    name: "Akatsuki Đập đá",
    role: "Animator",
    color: "#A892D6",
    align: "left",
    placeholderLabel: "AKATSUKI",
    quirk: "few words, deep feeling",
  },
} satisfies Record<string, GuideCharacter>;

export const guideList: GuideCharacter[] = Object.values(guides);
