import { Village } from "./entities/Village";
import { Member } from "./entities/Member";
import { useGenes } from "./helpers/useGenes";
import {
  useTotalGenderCalculation,
  useVillageStatistics,
  useTotalGenderCalc,
} from "./helpers/useVillageStatistics";

const village = new Village();

console.log(
  "INITIAL STATISTICS: ",
  useVillageStatistics(village),
  useTotalGenderCalculation(useVillageStatistics(village))
);

const presentData = {
  0: {
    families: {
      ...useVillageStatistics(village),
    },
    totalGenders: {
      ...useTotalGenderCalc(useVillageStatistics(village)),
    },
  },
};

for (let i = 1; i < 6; i++) {
  village.produceOffspring();

  const statistics = useVillageStatistics(village);
  const totalGenders = useTotalGenderCalc(statistics);

  presentData[i] = {};
  presentData[i]["families"] = { ...statistics };
  presentData[i]["totalGenders"] = { ...totalGenders };

  console.log(
    `AFTER ${i} OFFSPRING: `,
    statistics,
    useTotalGenderCalculation(statistics)
  );
}

console.log("PRESENT DATA: ", JSON.stringify(presentData, null, " "));

sessionStorage.setItem("data", JSON.stringify(presentData));
