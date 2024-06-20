import * as React from "react";
import { Header } from "./header";
import { HeaderStore } from "./store";
import { HeaderPresenter } from "./presenter";
import { observer } from "mobx-react-lite";
import { History } from "../app/history";

export function createHeader(history: History) {
  const store = new HeaderStore(history.getQueryParams("searchText"));
  const presenter = new HeaderPresenter(store, history);

  const HeaderImpl = observer((props: { Action: React.ElementType }) => {
    const { Action } = props;

    return (
      <Header
        value={store.searchText}
        onChange={(text) => presenter.handleSearchInput(text)}
        Action={Action}
      />
    );
  });

  return {
    Header: HeaderImpl,
    headerStore: store,
  };
}
