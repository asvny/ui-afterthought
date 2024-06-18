import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { AddContactPresenter } from "./add_contact_presenter";
import { ContactStore } from "./store";
import { Contact, ContactService } from "./service";

class FakeService implements ContactService {
  contacts: Array<Contact> = [];

  async getContacts() {
    return this.contacts;
  }

  async addContact(contact: Contact) {
    this.contacts.push(contact);

    return contact;
  }
}

describe("Add contact presenter", () => {
  it("should add new contact", async () => {
    const store = new ContactStore();

    const service = new FakeService();
    const presenter = new AddContactPresenter(store, service);

    assert.strictEqual(store.contacts.length, 0);

    await presenter.addContact({
      name: "Node contact",
      phoneNumber: "546234",
    });

    assert.strictEqual(store.contacts.length, 1);
  });

  it("should add multiple new contacts", async () => {
    const store = new ContactStore();

    const service = new FakeService();
    const presenter = new AddContactPresenter(store, service);

    assert.strictEqual(store.contacts.length, 0);

    await Promise.all([
      presenter.addContact({
        name: "Node 14 contact",
        phoneNumber: "546234",
      }),
      presenter.addContact({
        name: "Node 16 contact",
        phoneNumber: "546234",
      }),
      presenter.addContact({
        name: "Node 18 contact",
        phoneNumber: "546234",
      }),
    ]);

    assert.strictEqual(store.contacts.length, 3);
  });
});
