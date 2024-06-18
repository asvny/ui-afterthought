import { makeAutoObservable } from "mobx";
import { Contact } from "./service";

export class ContactStore {
  contacts: Array<Contact> = [];

  status: "loading" | "success" | "error" = "loading";

  constructor() {
    makeAutoObservable(this);
  }
}
