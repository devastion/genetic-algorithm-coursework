import { faker } from "@faker-js/faker";
import { useCalculateFitness } from "../helpers/useFitness";

export class Member {
  #genes: number[] = [];
  #fitness = 0;
  #gender: "male" | "female" = faker.person.sexType();
  #name = faker.person.firstName(this.#gender);
  #parents: (Member | "God")[] = [];
  #family: string;

  constructor(genes: number[], parents: (Member | "God")[], family: string) {
    this.#genes = genes;
    this.#parents = parents;
    this.#family = family;
    this.#fitness = useCalculateFitness(genes);
  }

  get genes() {
    return this.#genes;
  }
  set genes(val: number[]) {
    this.#genes.push(...val);
  }

  get fitness() {
    return this.#fitness;
  }
  set fitness(val) {
    this.#fitness = val;
  }

  get gender() {
    return this.#gender;
  }

  get name() {
    return this.#name;
  }

  get parents() {
    return this.#parents;
  }
  set parents(val: (Member | "God")[]) {
    this.#parents.push(...val);
  }

  get family() {
    return this.#family;
  }
  set family(val: string) {
    this.#family = val;
  }
}
