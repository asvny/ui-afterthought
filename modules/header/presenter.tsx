import { action } from "mobx";
import { HeaderStore } from "./store";
import { History } from "../app/history.web";

export class HeaderPresenter {
  store: HeaderStore;
  history: History;

  constructor(store: HeaderStore, history: History) {
    this.store = store;
    this.history = history;
  }

  @action
  handleSearchInput(text: string) {
    this.store.searchText = text;

    this.history.pushQueryParams({
      searchText: text,
    });
  }
}
