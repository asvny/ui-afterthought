import { action } from "mobx";
import { HeaderStore } from "./store";

export class HeaderPresenter {
  store: HeaderStore;

  constructor(store: HeaderStore) {
    this.store = store;
  }

  @action
  handleSearchInput(text: string) {
    this.store.searchText = text;
  }
}
