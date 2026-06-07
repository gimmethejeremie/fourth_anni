export type GiftRarity = "common" | "secret";

export type Gift = {
  id: string;
  title: string;
  description: string;
  rarity: GiftRarity;
  weight: number;
};

export const gifts: Gift[] = [
  {
    id: "evening",
    title: "Một buổi tối",
    description: "A small night kept warm under the tape static.",
    rarity: "common",
    weight: 16,
  },
  {
    id: "laughter",
    title: "Tiếng cười",
    description: "The kind that cuts through lag and stays after.",
    rarity: "common",
    weight: 16,
  },
  {
    id: "frame",
    title: "Một frame",
    description: "One still image from a memory that kept moving.",
    rarity: "common",
    weight: 14,
  },
  {
    id: "silence",
    title: "Khoảng lặng",
    description: "A pause soft enough to mean something.",
    rarity: "common",
    weight: 14,
  },
  {
    id: "unsaid",
    title: "Một câu chưa nói",
    description: "Folded once, saved for the right year.",
    rarity: "common",
    weight: 13,
  },
  {
    id: "color",
    title: "Màu của họ",
    description: "Rose, lavender, gold, and the space between.",
    rarity: "common",
    weight: 13,
  },
  {
    id: "unfinished-song",
    title: "The Unfinished Song",
    description: "It ends by leaving a door open.",
    rarity: "secret",
    weight: 2,
  },
  {
    id: "wrong-turn",
    title: "The Wrong Turn",
    description: "The path that looked mistaken until it found the view.",
    rarity: "secret",
    weight: 2,
  },
  {
    id: "year-zero",
    title: "Year Zero",
    description: "A secret prelude humming under the first episode.",
    rarity: "secret",
    weight: 1,
  },
];
