import type { Village } from "../entities/Village";

export const useVillageStatistics = (village: Village) => {
  const statistics: { [key: string]: any } = {};

  for (const [idx, family] of Object.entries(village.families)) {
    statistics[family.name] = {
      males: [],
      females: [],
    };
    const familyMales = family.members.males;
    const familyFemales = family.members.females;
    let malesFitness = 0;
    let femalesFitness = 0;

    if (familyMales) {
      for (const male of familyMales) {
        statistics[family.name]["totalMales"] =
          (statistics[family.name]["totalMales"] || 0) + 1;
        malesFitness += male.fitness;

        statistics[family.name]["males"].push(male.name);
      }
    }

    if (familyFemales) {
      for (const female of familyFemales) {
        statistics[family.name]["totalFemales"] =
          (statistics[family.name]["totalFemales"] || 0) + 1;
        femalesFitness += female.fitness;

        statistics[family.name]["females"].push(female.name);
      }
    }

    const maleAverageFitness = Math.round(
      malesFitness / statistics[family.name]["totalMales"]
    );
    const femaleAverageFitness = Math.round(
      femalesFitness / statistics[family.name]["totalFemales"]
    );
    statistics[family.name]["maleAverageFitness"] = maleAverageFitness;
    statistics[family.name]["femaleAverageFitness"] = femaleAverageFitness;
    statistics[family.name]["averageFitness"] =
      ((maleAverageFitness || 0) + (femaleAverageFitness || 0)) / 2;
  }

  return statistics;
};

export const useTotalGenderCalc = (statistics: { [key: string]: any }) => {
  let totalMales = 0;
  let totalFemales = 0;
  for (const [key, val] of Object.entries(statistics)) {
    totalMales += val.totalMales || 0;
    totalFemales += val.totalFemales || 0;
  }

  return { totalMales, totalFemales };
};

export const useTotalGenderCalculation = (statistics: {
  [key: string]: any;
}) => {
  const { totalMales, totalFemales } = useTotalGenderCalc(statistics);

  return `--- TOTAL MALES: ${totalMales}  --- TOTAL FEMALES: ${totalFemales} --- FAMILIES REMAINING: ${
    Object.keys(statistics).length
  }`;
};
