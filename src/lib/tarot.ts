import { tarotDeck, TarotCard, TarotTopic } from "../data/tarotDeck";

export type TarotOrientation = "upright" | "reversed";

export type DrawnTarotCard = {
  card: TarotCard;
  orientation: TarotOrientation;
  orientationLabel: "Xuôi" | "Ngược";
  keywords: string[];
  meaning: string;
};

export const pickRandom = <T,>(arr: T[]): T => {
  if (!arr.length) {
    throw new Error("Cannot pick from an empty array.");
  }

  return arr[Math.floor(Math.random() * arr.length)];
};

const drawOrientation = (): TarotOrientation => (Math.random() > 0.5 ? "upright" : "reversed");

const buildDrawnCard = (card: TarotCard, topic: TarotTopic): DrawnTarotCard => {
  const orientation = drawOrientation();
  const meaningGroup = card[orientation];

  return {
    card,
    orientation,
    orientationLabel: orientation === "upright" ? "Xuôi" : "Ngược",
    keywords: meaningGroup.keywords,
    meaning: pickRandom(meaningGroup[topic]),
  };
};

export const drawTarotCard = (topic: TarotTopic): DrawnTarotCard => buildDrawnCard(pickRandom(tarotDeck), topic);

export const drawTarotSpread = (count: 1 | 3, topic: TarotTopic): DrawnTarotCard[] => {
  const availableCards = [...tarotDeck];

  return Array.from({ length: count }, () => {
    const card = pickRandom(availableCards);
    const index = availableCards.findIndex((item) => item.id === card.id);
    availableCards.splice(index, 1);

    return buildDrawnCard(card, topic);
  });
};
