import type { Villager } from "../entities/Villager";

export const useCrossOver = (p1: Villager, p2: Villager) => {
  const g1 = p1.getGenes();
  const g2 = p2.getGenes();
  const rand = Math.floor(
    (Math.random() * g1.length) / 2 + (Math.random() * g2.length) / 2
  );

  const genes1 = [...g1.slice(0, rand), ...g2.slice(rand)];
  const genes2 = [...g2.slice(0, rand), ...g1.slice(rand)];

  return { genes1, genes2 };
};
