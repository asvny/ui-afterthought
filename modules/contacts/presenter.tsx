import { action, computed, makeAutoObservable, runInAction } from "mobx";
import { ContactStore } from "./store";
import { ContactService } from "./service";
import { HeaderStore } from "../header/store";

export class ContactPresenter {
  store: ContactStore;
  service: ContactService;
  headerStore: HeaderStore;

  constructor(
    store: ContactStore,
    service: ContactService,
    headerStore: HeaderStore
  ) {
    this.store = store;
    this.service = service;
    this.headerStore = headerStore;
  }

  @computed
  get filteredContacts() {
    if (this.headerStore.searchText.trim().length > 0) {
      return this.store.contacts
        .filter((contact) =>
          contact.name
            .toLocaleLowerCase()
            .includes(this.headerStore.searchText.toLocaleLowerCase())
        )
        .toSorted((a, b) => a.name.localeCompare(b.name));
    }

    return this.store.contacts.toSorted((a, b) => a.name.localeCompare(b.name));
  }

  @action
  async fetchContacts() {
    try {
      runInAction(() => {
        this.store.status = "loading";
      });

      let contacts = await this.service.getContacts();

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
}
