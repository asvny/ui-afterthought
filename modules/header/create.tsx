import * as React from "react";
import { Header } from "./header";
import { HeaderStore } from "./store";
import { HeaderPresenter } from "./presenter";
import { observer } from "mobx-react-lite";

export function createHeader() {
  const store = new HeaderStore();
  const presenter = new HeaderPresenter(store);

  const HeaderImpl = observer((props: { Action: React.ElementType }) => {
    const { Action } = props;

    return (
      <Header
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
