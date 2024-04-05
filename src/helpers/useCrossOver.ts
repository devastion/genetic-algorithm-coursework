import type { Member } from "../entities/Member";

export const useCrossOver = (m: Member, f: Member) => {
  const rand = Math.floor(
    (Math.random() * m.genes.length) / 2 + (Math.random() * f.genes.length) / 2
  );

  const motherGenes = [...m.genes.slice(0, rand), ...f.genes.slice(rand)];
  const fatherGenes = [...f.genes.slice(0, rand), ...m.genes.slice(rand)];

  return { motherGenes, fatherGenes };
};
