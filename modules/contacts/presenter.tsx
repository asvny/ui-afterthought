import { action, computed, makeAutoObservable, runInAction } from "mobx";
import { ContactStore } from "./store";
import { ContactService } from "./service";
import { HeaderStore } from "../header/store";

export class ContactPresenter {
  store: ContactStore;
  service: ContactService;
  headerStore: HeaderStore;
  id?: NodeJS.Timeout;

  constructor(
    store: ContactStore,
    service: ContactService,
    headerStore: HeaderStore
  ) {
    this.store = store;
    this.service = service;
    this.headerStore = headerStore;
    this.id = undefined;
  }

  @action
  async fetchContacts() {
    try {
      runInAction(() => {
        this.store.status = "loading";
      });

      let contacts = await this.service.getContacts(
        this.headerStore.searchText
      );

      runInAction(() => {
        this.store.contacts = contacts;
        this.store.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.store.status = "error";
      });
    }
  }

  @action refetchContacts() {
    clearTimeout(this.id);

    this.id = setTimeout(() => {
      this.fetchContacts();
    }, 500);
  }
}
