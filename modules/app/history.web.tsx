import { Platform } from "react-native";
import { History } from "./history";

export class HistoryImpl implements History {
  getQueryParams(key: string) {
    if (globalThis.window == null) return "";

    const searchParams = new URLSearchParams(globalThis.window.location.search);

    return searchParams.get(key);
  }

  pushQueryParams(object: Record<string, string>) {
    const url = new URL(location.href);

    for (let [key, value] of Object.entries(object)) {
      url.searchParams.set(key, value);
    }

    history.replaceState(null, "", url);
  }
}
