import { faker } from "@faker-js/faker";
import { Villager } from "./Villager";
import { useGenes } from "../helpers/useGenes";

export class Family {
  private _familyName = faker.person.lastName();
  private _familyMembers = new Array<Villager>(3);

  getFamilyName() {
    return this._familyName;
  }

  getFamilyMembers() {
    return this._familyMembers;
  }

  addFamilyMember(villager: Villager) {
    this._familyMembers.push(villager);
    console.log(`Added member ${villager}`);

    this._familyMembers.sort((a, b) => b.getFitness() - a.getFitness());
  }

  removeFamilyMember(villager: Villager) {
    for (let i = 0; i < this._familyMembers.length; i++) {
      const member = this._familyMembers[i];
      if (member.getId() === villager.getId()) {
        this._familyMembers.splice(i, 1);
      }
    }
    this._familyMembers.sort((a, b) => b.getFitness() - a.getFitness());
  }

  private init = (() => {
    for (let i = 0; i < this._familyMembers.length; i++) {
      this._familyMembers[i] = new Villager(
        i,
        useGenes(),
        "God",
        "God",
        this._familyName
      );
    }

    this._familyMembers.sort((a, b) => b.getFitness() - a.getFitness());
  })();
}
