export interface History {
  getQueryParams: (key: string) => any;
  pushQueryParams: (object: Record<string, string>) => any;
}

export class HistoryImpl implements History {
  getQueryParams(key: string) {
    return "";
  }

  pushQueryParams(object: Record<string, string>) {}
}
