import type { Family } from "../entities/Family";

export const useSelectParents = (f1: Family, f2: Family) => {
  const members1 = f1.getFamilyMembers();
  const members2 = f2.getFamilyMembers();

  const p1 = members1[Math.floor(Math.random() * members1.length)];
  const p2 = members2[Math.floor(Math.random() * members2.length)];

  return {
    p1,
    p2,
  };
};
