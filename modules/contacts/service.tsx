export interface Contact {
  name: string;
  phoneNumber: string;
  email?: string;
}

export interface ContactService {
  getContacts: (searchText?: string) => Promise<Array<Contact>>;
  addContact: (contact: Contact) => Promise<Contact>;
}

// TODO - fetch from real backend
export class ContactServiceImpl implements ContactService {
  async getContacts() {
    return [];
  }

  async addContact(contact: Contact) {
    return contact;
  }
}

export class FakeContactServiceImpl implements ContactService {
  contacts: Array<Contact> = [
    {
      name: "Tara Wunsch",
      phoneNumber: "1-564-410-3963",
      email: "Estefania72@hotmail.com",
    },
    {
      name: "Blanche Walker",
      phoneNumber: "893-483-0179 x5473",
    },
    {
      name: "Malcolm Braun",
      phoneNumber: "879.421.4845 x19120",
      email: "Tillman.Stamm@hotmail.com",
    },
    {
      name: "Shannon Cronin",
      phoneNumber: "585-931-7271 x0934",
    },
    {
      name: "Ruby Gleichner",
      phoneNumber: "432.648.4245 x21272",
    },
    {
      name: "Benny Schulist",
      phoneNumber: "1-413-224-1473 x042",
      email: "Madaline.Parker@yahoo.com",
    },
    {
      name: "Ann Benson",
      phoneNumber: "1-464-720-3973",
      email: "Estefania72@hotmail.com",
    },
    {
      name: "Edmund Bahringer DVM",
      phoneNumber: "998-769-0191 x8196",
      email: "Erich3@yahoo.com",
    },
    {
      name: "Peter Deckow",
      phoneNumber: "1-848-987-9079",
    },
    {
      name: "Tom McLaughlin",
      phoneNumber: "1-434-465-2692",
    },
    {
      name: "Santos Brekke",
      phoneNumber: "1-865-432-8520 x4227",
      email: "Erwin_Rowe@yahoo.com",
    },
    {
      name: "Tricia Wiza",
      phoneNumber: "(712) 469-9842 x6461",
    },
    {
      name: "Viola Gaylord",
      phoneNumber: "828-580-2104 x05817",
      email: "Mavis33@yahoo.com",
    },
  ];

  async getContacts(searchText?: string) {
    await sleep(2000);

    if (!searchText)
      return this.contacts.toSorted((a, b) => a.name.localeCompare(b.name));

    return this.contacts
      .filter((contact) =>
        contact.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
      )
      .toSorted((a, b) => a.name.localeCompare(b.name));
  }

  async addContact(contact: Contact) {
    await sleep(2000);

    this.contacts.push(contact);

    return contact;
  }
}

function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
