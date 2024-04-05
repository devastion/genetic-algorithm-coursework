import { Village } from "./entities/Village";
import { Member } from "./entities/Member";
import { useGenes } from "./helpers/useGenes";
import { useVillageStatistics } from "./helpers/useVillageStatistics";

const village = new Village();
console.info(useVillageStatistics(village));

village.produceOffspring();
console.log(useVillageStatistics(village));
