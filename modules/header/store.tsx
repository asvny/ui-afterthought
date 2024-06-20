import { makeAutoObservable } from "mobx";

export class HeaderStore {
  searchText: string = "";

  constructor(searchText?: string) {
    makeAutoObservable(this);

    this.searchText = searchText ?? "";
  }
}
