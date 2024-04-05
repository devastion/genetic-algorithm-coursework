import type { Village } from "../entities/Village";

export const useCounter = (village: Village) => {
  const allFamilies = village.getFamilies();
  const stats: { [key: string]: any } = {
    totalMales: 0,
    totalFemales: 0,
  };

  for (const family of allFamilies) {
    stats[family.getFamilyName()] = {};
    for (const member of family.getFamilyMembers()) {
      if (member.getGender() === "male")
        stats[family.getFamilyName()]["totalMales"] =
          (stats[family.getFamilyName()]["totalMales"] || 0) + 1;
      else
        stats[family.getFamilyName()]["totalFemales"] =
          (stats[family.getFamilyName()]["totalFemales"] || 0) + 1;
    }
    stats.totalMales += stats[family.getFamilyName()]["totalMales"] || 0;
    stats.totalFemales += stats[family.getFamilyName()]["totalFemales"] || 0;
  }

  return stats;
};
