import * as React from "react";

import { observer } from "mobx-react-lite";
import { ContactService } from "./service";
import { AddContact } from "./add_contact";
import { ContactStore } from "./store";
import { AddContactPresenter } from "./add_contact_presenter";

export function createAddContact(
  contactService: ContactService,
  contactStore: ContactStore
) {
  const presenter = new AddContactPresenter(contactStore, contactService);

  const AddContactImpl = observer(() => {
    return (
      <AddContact
        onSubmit={(contact) => {
          return presenter.addContact(contact);
        }}
      />
    );
  });

  return {
    AddContact: AddContactImpl,
  };
}
