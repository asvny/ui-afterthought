import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ContactPresenter } from "./presenter";
import { ContactStore } from "./store";
import { Contact, ContactService, FakeContactServiceImpl } from "./service";
import { HeaderStore } from "../header/store";
import { runInAction } from "mobx";

describe("Contact presenter", () => {
  it("should have correct status", async () => {
    const headerStore = new HeaderStore();

    const store = new ContactStore();
    class FakeService implements ContactService {
      async addContact(contact: Contact) {
        return contact;
      }

      async getContacts() {
        return [];
      }
    }

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
    class FakeService implements ContactService {
      async addContact(contact: Contact) {
        return contact;
      }

      async getContacts() {
        return [
          {
            name: "React 16",
            phoneNumber: "542324",
          },
          {
            name: "React 19 - Spicy suspense",
            phoneNumber: "542324",
          },
          {
            name: "Vue",
            phoneNumber: "643424",
          },
          {
            name: "Svelte",
            phoneNumber: "8451241",
          },
        ];
      }
    }

    const service = new FakeService();

    runInAction(() => {
      headerStore.searchText = "react";
    });

    const presenter = new ContactPresenter(store, service, headerStore);

    assert.strictEqual(store.status, "loading");

    await presenter.fetchContacts();

    assert.strictEqual(presenter.filteredContacts.length, 2);
  });
});
