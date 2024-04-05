import { Family } from "./Family";
import { useMutation } from "../helpers/useMutation";
import { Villager } from "./Villager";
import { faker } from "@faker-js/faker";
import { useSelectParents } from "../helpers/useSelectParents";
import { useCrossOver } from "../helpers/useCrossover";
export class Village {
  private _families = [
    new Family(),
    new Family(),
    // new Family(),
    // new Family(),
    // new Family(),
    // new Family(),
    // new Family(),
    // new Family(),
    // new Family(),
    // new Family(),
  ];

  getFamilies() {
    return this._families;
  }

  produceOffspring() {
    const allFamilies = [...this.getFamilies()];
    const getFamily = () => {
      const rand = Math.floor(Math.random() * allFamilies.length);
      const family = allFamilies[rand];
      allFamilies.splice(rand, 1);
      return { family, rand };
    };
    while (allFamilies.length !== 0) {
      const { family: f1, rand: idx1 } = getFamily();
      const { family: f2, rand: idx2 } = getFamily();

      const { p1, p2 } = useSelectParents(f1, f2);
      const { genes1, genes2 } = useCrossOver(p1, p2);
      useMutation([genes1, genes2]);
      this._families[idx1].addFamilyMember(
        new Villager(p1.getId(), genes1, p1, p2, p1.getFamily())
      );
      this._families[idx1].removeFamilyMember(p1);

      this._families[idx2].addFamilyMember(
        new Villager(p2.getId(), genes2, p1, p2, p2.getFamily())
      );
      this._families[idx2].removeFamilyMember(p2);
    }
  }
}
