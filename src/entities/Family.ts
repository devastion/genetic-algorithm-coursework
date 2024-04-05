import { Member } from "./Member";
import { useGenes } from "../helpers/useGenes";
import { FAMILY_SIZE } from "../constants";

type FamilyMembers = {
  males: Member[];
  females: Member[];
};

export class Family {
  #name: string;
  #members: FamilyMembers = { males: [], females: [] };

  constructor(name: string) {
    this.#name = name;
    this.#init();
  }

  get name() {
    return this.#name;
  }

  get members() {
    return this.#members;
  }
  set member(member: Member) {
    if (member.gender === "male") {
      this.members["males"].push(member);
    }

    if (member.gender === "female") {
      this.members["females"].push(member);
    }
  }

  #init = () => {
    for (let i = 0; i < FAMILY_SIZE; i++) {
      const member = new Member(useGenes(10), ["God", "God"], this.name);

      this.member = member;
    }
  };
}
