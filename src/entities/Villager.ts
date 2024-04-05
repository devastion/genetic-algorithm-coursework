import { faker } from "@faker-js/faker";
import { useCalculateFitness } from "../helpers/useCalculateFitness";

export class Villager {
  private _genes: number[] = new Array(10);
  private _fitness = 0;
  private _id: number;
  private _gender: "male" | "female" = faker.person.sexType();
  private _name: string;
  private _parents: (Villager | "God")[] = [];
  private _family: string;

  getGenes() {
    return this._genes;
  }

  getFitness() {
    return this._fitness;
  }

  getId() {
    return this._id;
  }

  setId(id: number) {
    this._id = id;
  }

  getGender() {
    return this._gender;
  }

  getName() {
    return this._name;
  }

  getParents() {
    return this._parents;
  }

  getFamily() {
    return this._family;
  }

  constructor(
    id: number,
    genes: number[],
    mother: Villager | "God",
    father: Villager | "God",
    family: string
  ) {
    this._id = id;
    this._genes = genes;
    this._fitness = useCalculateFitness(genes);
    this._parents.push(mother, father);
    this._name = faker.person.firstName(this._gender);
    this._family = family;
  }
}
