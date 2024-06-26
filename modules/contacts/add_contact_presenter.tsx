import { Contact, ContactService } from "./service";
import { ContactStore } from "./store";
import { action, runInAction } from "mobx";

export class AddContactPresenter {
  contactStore: ContactStore;
  contactService: ContactService;

  constructor(contactStore: ContactStore, contactService: ContactService) {
    this.contactStore = contactStore;
    this.contactService = contactService;
  }

  @action
  async addContact(contact: Contact) {
    try {
      await this.contactService.addContact(contact);

      const contacts = await this.contactService.getContacts();

      runInAction(() => {
        this.contactStore.contacts = contacts;
      });
    } catch (error) {
      // ignore
    }
  }
}
