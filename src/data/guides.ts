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

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const guides = {
  kagura: {
    id: "kagura",
    name: "Nhiên Anh",
    role: "Leader",
    color: "#D8B45C",
    align: "left",
    artSrc: publicAsset("characters/nhien-anh.png"),
    placeholderLabel: "NHIEN ANH",
    quirk: "short, calm, authority",
  },
  imed: {
    id: "imed",
    name: "Demi",
    role: "Coder / Sound / Writer",
    color: "#22314D",
    align: "left",
    artSrc: publicAsset("characters/demi.png"),
    placeholderLabel: "DEMI",
    quirk: "writes, deletes, rewrites",
  },
  anChi: {
    id: "an-chi",
    name: "An Chi",
    role: "Narrative / Tarot",
    color: "#72C6C8",
    align: "center",
    artSrc: publicAsset("characters/an-chi.png"),
    placeholderLabel: "AN CHI",
    quirk: "quiet, lyrical, keeps the signal steady",
  },
  lilWayne: {
    id: "lil-wayne",
    name: "Lil' Wayne",
    role: "Coder / Writer",
    color: "#7C8798",
    align: "right",
    artSrc: publicAsset("characters/lil-wayne.png"),
    placeholderLabel: "LIL' WAYNE",
    quirk: "fast, casual, sometimes no punctuation",
  },
  kuro: {
    id: "kuro",
    name: "Mashiro",
    role: "Content / Event",
    color: "#9DB7A5",
    align: "right",
    artSrc: publicAsset("characters/mashiro.png"),
    placeholderLabel: "MASHIRO",
    quirk: "slow, observant, long pauses",
  },
  nova: {
    id: "nova",
    name: "Ren Phạm",
    role: "Evaluator",
    color: "#E58D7A",
    align: "right",
    artSrc: publicAsset("characters/ren-pham.png"),
    placeholderLabel: "REN PHAM",
    quirk: "deadpan analytical dry humor",
  },
  stone: {
    id: "stone",
    name: "Akatsuki Đập đá",
    role: "Animator",
    color: "#A892D6",
    align: "left",
    artSrc: publicAsset("characters/akatsuki.png"),
    placeholderLabel: "AKATSUKI",
    quirk: "few words, deep feeling",
  },
} satisfies Record<string, GuideCharacter>;

export const guideList: GuideCharacter[] = Object.values(guides);
