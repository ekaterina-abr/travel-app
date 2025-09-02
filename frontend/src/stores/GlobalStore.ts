import { makeAutoObservable } from "mobx";

export class GlobalStore {
  selectedDestinations: Set<string> = new Set();

  constructor() {
    makeAutoObservable(this);
  }

  addDestination(dest: string) {
    this.selectedDestinations.add(dest);
  }

  removeDestination(dest: string) {
    this.selectedDestinations.delete(dest);
  }
}
