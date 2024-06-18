import { makeAutoObservable } from "mobx";

export class HeaderStore {
  searchText: string = "";

  constructor() {
    makeAutoObservable(this);
  }
}
