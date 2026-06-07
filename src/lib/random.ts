export const pickRandom = <T,>(items: T[]) => {
  if (!items.length) {
    throw new Error("Cannot pick from an empty array.");
  }

  return items[Math.floor(Math.random() * items.length)];
};

export const weightedPick = <T extends { weight?: number }>(items: T[]) => {
  const total = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let cursor = Math.random() * total;

  for (const item of items) {
    cursor -= item.weight ?? 1;
    if (cursor <= 0) {
      return item;
    }
  }

  return items[items.length - 1];
};

export const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
