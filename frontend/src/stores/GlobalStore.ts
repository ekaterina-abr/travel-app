import { makeAutoObservable } from "mobx";
import { DestinationId } from "../types";

export class GlobalStore {
  selectedDestinations: Set<DestinationId> = new Set();

  constructor() {
    makeAutoObservable(this);
  }

  addDestination(dest: DestinationId) {
    this.selectedDestinations.add(dest);
  }

  removeDestination(dest: DestinationId) {
    this.selectedDestinations.delete(dest);
  }
}
