import * as React from "react";
import { App } from "./app";
import { createHeader } from "../header/create";
import { createContacts } from "../contacts/create";
import {
  ContactServiceImpl,
  FakeContactServiceImpl,
} from "../contacts/service";
import { createAddContact } from "../contacts/add_contact_create";

export function createApp() {
  const contactService = process.env.EXPO_PUBLIC_FAKE_MODE
    ? new FakeContactServiceImpl()
    : new ContactServiceImpl();

  const { Header, headerStore } = createHeader();
  const { Contacts, contactStore } = createContacts(
    contactService,
    headerStore
  );
  const { AddContact } = createAddContact(contactService, contactStore);

  const HeaderImpl = () => {
    return <Header Action={AddContact} />;
  };

  const AppImpl = () => {
    return <App Header={HeaderImpl} Body={Contacts}></App>;
  };

  return {
    App: AppImpl,
  };
}
