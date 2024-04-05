import { Village } from "./entities/Village";
import { useCounter } from "./helpers/useCounter";

const village = new Village();

console.log("1: ", useCounter(village));
village.produceOffspring();
console.log("2: ", useCounter(village));
village.produceOffspring();
console.log("3: ", useCounter(village));
village.produceOffspring();
console.log("4: ", useCounter(village));
