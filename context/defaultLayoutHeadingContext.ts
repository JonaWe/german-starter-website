import React, { Dispatch, SetStateAction, useContext } from 'react';

interface DefaultLayoutHeadingContext {
  setHeading: Dispatch<SetStateAction<string>>;
}

const initialState = {
  setHeading: () => undefined,
};

const Context = React.createContext<DefaultLayoutHeadingContext>(initialState);

const DefaultLayoutHeadingContextProvider = Context.Provider;

const useSetHeading = (element: string) => {
  const { setHeading } = useContext(Context);
  setHeading(element);
};

export { DefaultLayoutHeadingContextProvider, useSetHeading };
