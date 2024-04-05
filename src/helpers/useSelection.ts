import type { Member } from "../entities/Member";

export function useSelection(
  male: Member,
  females: Exclude<Member, { gender: "male" }>[]
) {
  for (const [femaleIdx, female] of females.entries()) {
    if (male.family === female.family) continue;
    else if (
      male.parents.every(
        (el, idx) => el !== "God" && el === female.parents[idx]
      )
    )
      continue;
    else {
      const fertilityChance =
        Math.floor(Math.random() * 10) <
        Math.floor((male.fitness + female.fitness) / 2);

      return { female, femaleIdx, fertilityChance };
    }
  }
  return false;
}
