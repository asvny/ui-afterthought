import * as React from "react";

import { observer } from "mobx-react-lite";
import { Text } from "react-native";
import { ContactService } from "./service";
import { ContactStore } from "./store";
import { ContactPresenter } from "./presenter";
import { HeaderStore } from "../header/store";
import { ContactList } from "./list";

export function createContacts(
  contactService: ContactService,
  headerStore: HeaderStore
) {
  const store = new ContactStore();
  const presenter = new ContactPresenter(store, contactService, headerStore);

  const ContactsImpl = observer(() => {
    React.useEffect(() => {
      presenter.fetchContacts();
    }, []);

    switch (store.status) {
      case "success": {
        if (presenter.filteredContacts.length === 0)
          return <Text>No results.</Text>;

        return <ContactList contacts={presenter.filteredContacts} />;
      }

      case "error": {
        return <Text>Error</Text>;
      }

      default: {
        return <Text>Loading...</Text>;
      }
    }
  });

  return {
    Contacts: ContactsImpl,
    contactStore: store,
  };
}
