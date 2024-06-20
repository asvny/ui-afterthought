import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ContactPresenter } from "./presenter";
import { ContactStore } from "./store";
import { Contact, ContactService, FakeContactServiceImpl } from "./service";
import { HeaderStore } from "../header/store";
import { runInAction } from "mobx";

class FakeService implements ContactService {
  async addContact(contact: Contact) {
    return contact;
  }

  async getContacts() {
    return [];
  }
}

describe("Contact presenter", () => {
  it("should have correct status", async () => {
    const headerStore = new HeaderStore();

    const store = new ContactStore();

    const service = new FakeService();
    const presenter = new ContactPresenter(store, service, headerStore);

    assert.strictEqual(store.status, "loading");

    await presenter.fetchContacts();

    assert.strictEqual(store.contacts.length, 0);
  });

  it("should load contacts correctly", async () => {
    const headerStore = new HeaderStore();

    const store = new ContactStore();
    const service = new FakeContactServiceImpl();

    const presenter = new ContactPresenter(store, service, headerStore);

    assert.strictEqual(store.status, "loading");

    await presenter.fetchContacts();

    assert.strictEqual(store.contacts.length, 13);
  });

  it("should have error status", async () => {
    const headerStore = new HeaderStore();

    const store = new ContactStore();
    class FakeService implements ContactService {
      async addContact(contact: Contact) {
        return contact;
      }

      async getContacts() {
        return Promise.reject("Server error");
      }
    }

    const service = new FakeService();

    const presenter = new ContactPresenter(store, service, headerStore);

    assert.strictEqual(store.status, "loading");

    await presenter.fetchContacts();

    assert.strictEqual(store.status, "error");
  });

  it("should return filtered contacts correctly", async () => {
    const headerStore = new HeaderStore();
    const store = new ContactStore();
    const service = new FakeContactServiceImpl();

    runInAction(() => {
      headerStore.searchText = "ann";
    });

    const presenter = new ContactPresenter(store, service, headerStore);

    assert.strictEqual(store.status, "loading");

    await presenter.fetchContacts();

    // Ann Benson and Shannon Cronin
    assert.strictEqual(store.contacts.length, 2);
  });
});
