import { useCrossOver } from "../helpers/useCrossOver";
import { useMutation } from "../helpers/useMutation";
import { useSelection } from "../helpers/useSelection";
import { Family } from "./Family";
import { faker } from "@faker-js/faker";
import { Member } from "./Member";
import { VILLAGE_FAMILY_SIZE } from "../constants";

const familiesGenerator = () => {
  const families = [];
  for (let i = 0; i < VILLAGE_FAMILY_SIZE; i++) {
    const name = faker.person.lastName();
    families.push([name, new Family(name)]);
  }
  return families;
};

export class Village {
  #families: { [key: string]: Family } = Object.fromEntries(
    familiesGenerator()
  );

  get families() {
    return this.#families;
  }

  produceOffspring() {
    const males: Exclude<Member, { gender: "female" }>[] = [];
    const females: Exclude<Member, { gender: "male" }>[] = [];

    for (const [key, family] of Object.entries(this.families)) {
      males.push(...family.members.males);
      family.members.males = [];
      females.push(...family.members.females);
      family.members.females = [];
    }

    // Fittest first
    males.sort((a, b) => b.fitness - a.fitness);
    females.sort((a, b) => b.fitness - a.fitness);

    while (females.length > 0) {
      const male = males[0];

      const selection = useSelection(male, females);

      if (!selection) break;

      const { female, femaleIdx, fertilityChance } = selection;
      if (fertilityChance) {
        const { motherGenes, fatherGenes } = useCrossOver(male, female);
        const genes1 = useMutation(motherGenes);
        const genes2 = useMutation(fatherGenes);

        const child1 = new Member(genes1, [male, female], male.family);
        const child2 = new Member(genes2, [male, female], male.family);

        this.families[male.family].member = child1;
        this.families[male.family].member = child2;

        males.push(males.shift());
        females.splice(femaleIdx, 1);
      }
    }
  }
}
