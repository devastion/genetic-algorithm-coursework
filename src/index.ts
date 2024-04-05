import { Village } from "./entities/Village";
import { Member } from "./entities/Member";
import { useGenes } from "./helpers/useGenes";
import {
  useTotalGenderCalculation,
  useVillageStatistics,
  useTotalGenderCalc,
} from "./helpers/useVillageStatistics";
import { table } from "table";
import pc from "picocolors";
import confirm from "@inquirer/confirm";
import { log } from "console";

const village = new Village();

const dataTemplate = [
  [
    "FAMILY",
    "MALES",
    "FEMALES",
    "TOTAL MALES",
    "TOTAL FEMALES",
    "MALE AVERAGE FITNESS",
    "FEMALE AVERAGE FITNESS",
    "AVERAGE FITNESS",
  ],
];

let data = [
  [
    "FAMILY",
    "MALES",
    "FEMALES",
    "TOTAL MALES",
    "TOTAL FEMALES",
    "MALE AVERAGE FITNESS",
    "FEMALE AVERAGE FITNESS",
    "AVERAGE FITNESS",
  ],
];

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
}

const config = {
  columns: [
    { truncate: 30 },
    { truncate: 30 },
    { truncate: 30 },
    { truncate: 30 },
    { truncate: 30 },
    { truncate: 30 },
    { truncate: 30 },
    { truncate: 30 },
  ],
};

function* generate() {
  for (const [idx, vals] of Object.entries(presentData)) {
    data = [...dataTemplate];

    for (const key of Object.keys(vals["families"])) {
      const innerTable = [];
      innerTable.push(key);

      for (const [i, v] of Object.entries(vals["families"][key])) {
        if (Array.isArray(v)) innerTable.push(v.join(","));
        else innerTable.push(v);
      }

      data.push(innerTable);
    }

    console.log(pc.bold(pc.green(` GENERATION ${idx} `)));
    console.log(
      pc.bold(
        pc.green(
          ` --- TOTAL MALES ${vals["totalGenders"]["totalMales"]} --- TOTAL FEMALES ${vals["totalGenders"]["totalFemales"]} ---`
        )
      )
    );
    yield console.log(table(data, config));
  }
}

(async () => {
  const gen = generate();
  for (let i = 0; i < 6; i++) {
    const answer = await confirm({ message: "Next?", default: true });
    if (answer) {
      gen.next().value;
    } else {
      continue;
    }
  }
})();

// console.log("PRESENT DATA: ", JSON.stringify(presentData, null, " "));
